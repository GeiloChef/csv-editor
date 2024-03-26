<template>
  <DataTable
    ref="CsvDataTable_Ref"
    :value="currentCsvData"
    dataKey="uuid_for_edition"
    editMode="cell"
    :exportFilename="currentTableStore.currentTableMetaData.name"
    @cell-edit-complete="onCellEditComplete"
    tableStyle="min-width: 50rem">
    <template #header>
      <div class="flex flex-row justify-between items-center my-6">
        <div class="flex flex-row gap-4 items-center">
          <div
            v-if="!isEditTableNameInputVisible"
            class="text-4xl">
            {{ currentTableStore.currentTableMetaData.name }}
          </div>
          <div
            class="flex flex-col"
            v-else>
            <div class="flex flex-row">
              <InputText
                class="rounded-br-none rounded-tr-none"
                :invalid="!isNewFileNameInputValid"
                v-model="newFileName"
                aria-describedby="filename-help"/>
              <Button
                class="rounded-bl-none rounded-tl-none"
                size="large"
                :disabled="!isNewFileNameInputValid"
                @click="setEditTableNameInputVisibility(false)">
                <FontAwesomeIcon icon="save" />
              </Button>
            </div>
            <small
              v-if="!isNewFileNameInputValid"
              class="text-red-500 mt-2 ml-2"
              id="filename-help">Provided filename is invalid</small>
          </div>
          <div v-if="!isEditTableNameInputVisible">
            <FontAwesomeIcon
              class="cursor-pointer"
              icon="pen"
              @click="setEditTableNameInputVisibility(true)"/>
          </div>
        </div>
        <Button
          size="small"
          @click="exportCSV()">
          {{ $t('export-table') }}
        </Button>
      </div>
    </template>
    <Column header="action">
      <template #body="{ data }">
        <div class="flex flex-row gap-2">
          <FontAwesomeIcon
            v-for="action in rowActions"
            :key="action.action"
            :icon="action.icon"
            class="cursor-pointer"
            @click="triggerRowAction(action.action, data)"/>
        </div>
      </template>
    </Column>
    <Column
      class="max-w-72"
      v-for="field in currentCsvHeader"
      :field="field"
      :header="field">
      <template #body="{ data, field }">
        <div class="truncate">
          {{ data[field] }}
        </div>
      </template>
      <template #editor="{ data, field }">
        <Textarea
          class="max-w-80"
          v-model="data[field]" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { storeToRefs } from 'pinia';
  import Column from 'primevue/column';
  import DataTable, { type DataTableCellEditCompleteEvent } from 'primevue/datatable';
  import InputText from 'primevue/inputtext';
  import Textarea from 'primevue/textarea';
  import { computed, type Ref, ref } from 'vue';

  import { type CsvRowAsJson, RowActions, type TableRowAction } from '@/models/core';
  import { useCurrentTableStore } from '@/stores/currentTableStore';
  import { isValidFileName } from '@/utils/FileUtils';

  const currentTableStore = useCurrentTableStore();
  const { currentCsvData, currentCsvHeader } = storeToRefs(currentTableStore);

  const onCellEditComplete = (cellEditPayload: DataTableCellEditCompleteEvent) => {
    Object.assign(cellEditPayload.data, cellEditPayload.newData);
  };

  const CsvDataTable_Ref = ref();
  const exportCSV = () => {
    CsvDataTable_Ref.value.exportCSV();
  };

  const isEditTableNameInputVisible = ref(false);
  const newFileName = ref('');
  const isNewFileNameInputValid = computed((): boolean => {
    return isValidFileName(newFileName.value);
  });
  const setEditTableNameInputVisibility = (visible: boolean) => {
    isEditTableNameInputVisible.value = visible;

    if (visible) {
      newFileName.value = currentTableStore.currentTableMetaData.name;
    } else {
      currentTableStore.processFileRenaming(newFileName.value.trimStart());
    }
  };

  const rowActions: Ref<TableRowAction[]> = ref([
    {
      name: 'delete-row',
      icon: 'trash',
      action: RowActions.DeleteRow
    }
  ]);

  const triggerRowAction = (action: RowActions, row: CsvRowAsJson): void => {
    switch (action) {
      case RowActions.DeleteRow:
        currentTableStore.deleteRowFromCurrentTableData(row);
    }
  };
</script>


