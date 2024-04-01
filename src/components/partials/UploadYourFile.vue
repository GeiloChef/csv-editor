<template>
  <div class="flex flex-col h-full w-full justify-center items-center gap-12">
    <div class="text-5xl text-center">
      CSV-Editor
    </div>
    <div>
      <FileUpload
        name="csvUpload"
        mode="basic"
        :choose-label="$t('import-file')"
        class="w-64"
        @uploader="onImportCsv($event)"
        :multiple="false"
        :auto="true"
        customUpload
        accept=".csv">
      </FileUpload>
    </div>
    <Dialog
      v-model:visible="isFileImportSettingsDialogOpen"
      modal
      :draggable="false"
      :header="$t('file-import-settings')">
      <div class="pt-8 pb-4 flex flex-col gap-12">
        <!--    Custom File Name    -->
        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-2 items-center">
            <div class="text-lg">
              {{ $t('custom-filename') }}
              <!--              <FontAwesomeIcon
                icon="question-circle"
                class="cursor-pointer" />-->
            </div>
            <InputSwitch v-model="fileImportSettings.useCustomFileName" />
          </div>
          <InputText
            v-model="fileImportSettings.customFileName"
            :disabled="!fileImportSettings.useCustomFileName"
            size="small"
            type="text" />
        </div>

        <!--    Cell Delimiter    -->
        <div class="flex flex-col gap-2">
          <div class="text-lg">
            {{ $t('cell-delimiter') }}
            <!--              <FontAwesomeIcon
              icon="question-circle"
              class="cursor-pointer" />-->
          </div>
          <div class="flex flex-row gap-2">
            <SelectButton
              v-model="fileImportSettings.cellDelimiter"
              :options="cellDelimiterOptions"
              optionLabel="name"
              option-value="value">
            </SelectButton>
            <InputText
              v-model="fileImportSettings.customDelimiter"
              :placeholder="$t('custom-delimiter')"
              :disabled="fileImportSettings.cellDelimiter !== CellDelimiter.Custom"
              class="w-40"
              :invalid="!isDelimiterValid"
              size="small"
              type="text" />
          </div>
        </div>
      </div>
      <template #footer>
        <Button
          :disabled="!isImportSettingsFormValid"
          @click="processImport">
          {{ $t('process-import') }}
        </Button>
      </template>
    </Dialog>
  </div>
</template>


<script setup lang="ts">
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';
  import FileUpload, { type FileUploadUploadEvent } from 'primevue/fileupload';
  import InputSwitch from 'primevue/inputswitch';
  import InputText from 'primevue/inputtext';
  import SelectButton from 'primevue/selectbutton';
  import { computed, type Ref, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { CellDelimiter, type FileImportSettings } from '@/models/core';
  import { importFile, initiateFileImportSettings } from '@/utils/FileUtils';

  const { t } = useI18n();

  const fileToImport: Ref<File | null> = ref(null);
  const onImportCsv = (event: FileUploadUploadEvent) => {

    if (Array.isArray(event.files)) {
      fileToImport.value = event.files[0];
    } else {
      fileToImport.value = event.files;
    }

    isFileImportSettingsDialogOpen.value = true;

    return;
  };

  const processImport = (): void => {
    if (fileToImport.value) {
      importFile(fileToImport.value, fileImportSettings.value);
    }
  };

  const isFileImportSettingsDialogOpen = ref(false);

  const fileImportSettings: Ref<FileImportSettings> = ref(initiateFileImportSettings());

  const cellDelimiterOptions = computed(() => {
    return [
      {
        name: t('auto-detection'),
        value: CellDelimiter.AutoDetection
      },
      {
        name: t('semicolon') + ' (;)',
        value: CellDelimiter.Semicolon
      },
      {
        name: t('comma')  + ' (,)',
        value: CellDelimiter.Comma
      },
      {
        name: t('custom-delimiter'),
        value: CellDelimiter.Custom
      },

    ];
  });

  const isDelimiterValid = computed((): boolean => {
    if (fileImportSettings.value.cellDelimiter === CellDelimiter.Custom) {
      return !!fileImportSettings.value.customDelimiter;
    } else {
      return true;
    }
  });

  const isImportSettingsFormValid = computed((): boolean => {
    return isDelimiterValid.value && fileToImport.value !== null;
  });
</script>

<style lang="scss">
.p-fileupload {
  @apply flex flex-col justify-center items-center
}
</style>