<template>
  <Dialog
    id="rowInformationDialog"
    v-model:visible="isRowInformationDialogVisible"
    modal
    position="top"
    class="overflow-hidden"
    content-class="mb-20"
    header="Add new row">
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
        label="add-row"
        @click="addNewRow" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext';
  import { useToast } from 'primevue/usetoast';

  const toast = useToast();

  import { useCurrentTableStore } from '@/stores/currentTableStore';
  import { useRowInformationDialogStore } from '@/stores/rowInfomationDialogStore';

  const rowInformationDialogStore = useRowInformationDialogStore();
  const { isRowInformationDialogVisible, currentRowInformation } = storeToRefs(rowInformationDialogStore);

  const currentTableStore = useCurrentTableStore();
  const { currentCsvHeader } = storeToRefs(currentTableStore);

  const addNewRow = (): void => {
    currentTableStore.addNewRow(currentRowInformation.value);
    toast.add({ severity: 'success', summary: 'row-added', detail: 'row-added-successfully', life: 3000 });
    isRowInformationDialogVisible.value = false;
  };
</script>

<style>
  .bottom-action-button-color {
  background-color: var(--surface-overlay);
  border-color: var(--primary-color)
}
</style>