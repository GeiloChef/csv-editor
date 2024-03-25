<template>
  <DataTable
    ref="CsvDataTable_Ref"
    :value="currentCsvData"
    dataKey="uuid_for_edition"
    editMode="cell"
    @cell-edit-complete="onCellEditComplete"
    tableStyle="min-width: 50rem">
    <template #header>
      <div class="flex flex-row justify-end">
        <Button
          size="small"
          @click="exportCSV()">
          {{ $t('export-table') }}
        </Button>
      </div>
    </template>
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
  import { storeToRefs } from 'pinia';
  import Column from 'primevue/column';
  import DataTable, { type DataTableCellEditCompleteEvent } from 'primevue/datatable';
  import Textarea from 'primevue/textarea';
  import { ref } from 'vue';

  import { useCurrentTableStore } from '@/stores/currentTableStore';

  const currentTableStore = useCurrentTableStore();
  const { currentCsvData, currentCsvHeader } = storeToRefs(currentTableStore);

  const onCellEditComplete = (cellEditPayload: DataTableCellEditCompleteEvent) => {
    Object.assign(cellEditPayload.data, cellEditPayload.newData);
  };

  const CsvDataTable_Ref = ref();
  const exportCSV = () => {
    CsvDataTable_Ref.value.exportCSV();
  };

</script>


