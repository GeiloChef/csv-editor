<template>
  <Dialog
    id="rowInformationDialog"
    v-model:visible="isColumnsEditDialogVisible"
    modal
    position="top"
    class="overflow-hidden"
    content-class="mb-20"
    :header="$t('edit-column', 2)">
    <div class="flex flex-col gap-6">
      <div
        v-for="column of columnsEditedByUser"
        :key="column.uuid_for_edition"
        class="flex flex-row gap-4">
        <div class="flex flex-col gap-1">
          <label :for="column.uuid_for_edition + '_column_name'">{{ $t('column-name') }}</label>
          <InputText
            :id="column.uuid_for_edition + '_column_name'"
            v-model="column.label" />
        </div>
        <div class="flex flex-col gap-1">
          <label :for="column.uuid_for_edition + '_column_type'">{{ $t('column-type') }}</label>
          <Dropdown
            :id="column.uuid_for_edition + '_column_type'"
            class="min-w-64"
            v-model="column.columnType"
            :options="columnTypeSelectionOption"
            optionLabel="name"
            optionValue="value"/>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 bottom-action-button-color w-full flex justify-center items-center h-20 border-t">
      <Button
        :label="$t('save-changes')"
        @click="saveChangedColumns" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import Dialog from 'primevue/dialog';
  import Dropdown from 'primevue/dropdown';
  import InputText from 'primevue/inputtext';
  import { type Ref, ref } from 'vue';

  import type { ColumnTypeSelectionOption } from '@/models/core';
  import { useColumnsEditDialogStore } from '@/stores/columnsEditDialogStore';
  import { getSelectableColumnTypes } from '@/utils/ColumnUtils';


  const editColumnsDialogStore = useColumnsEditDialogStore();
  const { isColumnsEditDialogVisible, columnsEditedByUser } = storeToRefs(editColumnsDialogStore);

  const columnTypeSelectionOption: Ref<ColumnTypeSelectionOption[]> = ref(getSelectableColumnTypes());

  const saveChangedColumns = (): void => {
    editColumnsDialogStore.saveUserChangesInTable();
  };
</script>