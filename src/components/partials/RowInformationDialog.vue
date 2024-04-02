<template>
  <Dialog
    id="rowInformationDialog"
    v-model:visible="isRowInformationDialogVisible"
    modal
    position="top"
    class="overflow-hidden"
    content-class="mb-20"
    :header="dialogHeader">
    <div class="flex flex-col gap-6 px-12">
      <div
        class="flex flex-row justify-center items-center gap-6"
        v-for="header in currentCsvHeader"
        :key="header.uuid_for_edition">
        <span class="w-1/2 text-lg">
          {{ header.label }}
        </span>
        <InputText
          type="text"
          v-model="currentRowInformation[header.uuid_for_edition]" />
      </div>
    </div>
    <div class="absolute bottom-0 left-0 bottom-action-button-color w-full flex justify-center items-center h-20 border-t">
      <Button
        :label="callToActionButtonLabel"
        @click="triggerAction" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext';
  import { useToast } from 'primevue/usetoast';

  const toast = useToast();
  const { t } = useI18n();

  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { RowActions } from '@/models/core';
  import { useCurrentTableStore } from '@/stores/currentTableStore';
  import { useRowInformationDialogStore } from '@/stores/rowInfomationDialogStore';

  const rowInformationDialogStore = useRowInformationDialogStore();
  const { isRowInformationDialogVisible, currentRowInformation, rowAction } = storeToRefs(rowInformationDialogStore);

  const currentTableStore = useCurrentTableStore();
  const { currentCsvHeader } = storeToRefs(currentTableStore);

  const dialogHeader = computed((): string => {
    switch (rowAction.value) {
      case RowActions.EditRow:
        return t('edit-row');
      case RowActions.CopyRow:
        return t('copy-row-content');
      case RowActions.NewRow:
        return t('insert-new-row');
      default:
        return t('save');
    }
  });

  const callToActionButtonLabel = computed((): string => {
    switch (rowAction.value) {
      case RowActions.EditRow:
        return t('edit-row');
      case RowActions.CopyRow:
        return t('insert-row');
      case RowActions.NewRow:
        return t('insert-new-row');
      default:
        return t('save');
    }
  });

  const triggerAction = (): void => {
    switch (rowAction.value) {
      case RowActions.EditRow:
        editExistingRow();
        break;
      case RowActions.CopyRow:
        addNewRow();
        break;
      case RowActions.NewRow:
        addNewRow();
        break;
      default:
        return;
    }
  };

  const editExistingRow = (): void => {
    currentTableStore.storeEditedExistingRow(currentRowInformation.value);

    toast.add({ severity: 'success', summary: t('row-edited'), detail: t('row-edited-successfully'), life: 3000 });
    isRowInformationDialogVisible.value = false;
  };

  const addNewRow = (): void => {
    currentTableStore.addNewRow(currentRowInformation.value);
    toast.add({ severity: 'success', summary: t('row-added'), detail: t('row-added-successfully'), life: 3000 });
    isRowInformationDialogVisible.value = false;
  };
</script>

<style>
  .bottom-action-button-color {
  background-color: var(--surface-overlay);
  border-color: var(--primary-color)
}
</style>