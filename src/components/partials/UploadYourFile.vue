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
      <div class="pt-8 pb-4">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-2 items-center pl-2">
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
      </div>
      <template #footer>
        <Button @click="processImport">
          {{ $t('process-import') }}
        </Button>
      </template>
    </Dialog>
  </div>
</template>


<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';
  import FileUpload, { type FileUploadUploadEvent } from 'primevue/fileupload';
  import InputSwitch from 'primevue/inputswitch';
  import InputText from 'primevue/inputtext';
  import { type Ref, ref } from 'vue';

  import type { FileImportSettings } from '@/models/core';
  import { importFile, initiateFileImportSettings } from '@/utils/FileUtils';

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
</script>

<style lang="scss">
.p-fileupload {
  @apply flex flex-col justify-center items-center
}
</style>