<template>
  <DataTable
    ref="CsvDataTable_Ref"
    tableStyle="min-width: 50rem"
    :value="currentCsvData"
    dataKey="uuid_for_edition"
    stripedRows
    showGridlines
    resizableColumns
    reorderable-columns
    columnResizeMode="expand"
    paginator
    :rows="5"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    :exportFilename="currentTableStore.currentTableMetaData.name"
    @cell-edit-complete="onCellEditComplete"
    @page="setCurrentPageInformation">
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
        <div class="flex flex-row gap-4">
          <SplitButton
            :label="$t('table-actions')"
            :model="tableActions">
            <template #menuitemicon="{ item }">
              <FontAwesomeIcon
                :icon="item.icon"
                class="pr-2" />
            </template>
          </SplitButton>
          <Button
            @click="exportCSV()">
            {{ $t('export-table') }}
          </Button>
        </div>
      </div>
      <EditColumOverlayPanel ref="EditColumnOverlayPanel_Ref" />
    </template>
    <Column
      :header="$t('action')"
      :field="'row_actions'">
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
      :header="$t('index')"
      :field="'row_index'">
      <template #body="{ index }">
        {{ index + 1 + firstItemIndexOnPage }}
      </template>
    </Column>
    <Column
      class="max-w-72"
      v-for="field in currentCsvHeader"
      :field="field.uuid_for_edition"
      :exportHeader="field.label">
      <template #header>
        <div class="flex flex-row h-full w-full justify-between items-center">
          <span>
            {{ field.label }}
          </span>
          <div class="ml-4 h-full flex items-center justify-center">
            <Button
              text
              severity="secondary"
              @click="($event) => triggerEditColumnOverlay($event, field)">
              <FontAwesomeIcon
                class="cursor-pointer"
                icon="ellipsis-vertical"/>
            </Button>
          </div>
        </div>
      </template>
      <template #body="{ data, field }">
        <div
          class="truncate"
          @click="triggerEditCellOverlay($event, data, field)">
          {{ data[field] }}
        </div>
      </template>
      <template #editor="{ data, field }">
        <Textarea
          class="max-w-80"
          v-model="data[field]" />
      </template>
    </Column>
    <EditCellOverlayPanel ref="EditCellOverlayPanel_Ref" />
  </DataTable>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { storeToRefs } from 'pinia';
  import Column from 'primevue/column';
  import DataTable, { type DataTableCellEditCompleteEvent, type DataTablePageEvent } from 'primevue/datatable';
  import InputText from 'primevue/inputtext';
  import SplitButton from 'primevue/splitbutton';
  import Textarea from 'primevue/textarea';
  import { computed, nextTick, type Ref, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import EditCellOverlayPanel from '@/components/partials/EditCellOverlayPanel.vue';
  import EditColumOverlayPanel from '@/components/partials/EditColumOverlayPanel.vue';
  import {
    type CsvHeaderAsJson,
    type CsvRowAsJson,
    RowActions,
    type TableAction,
    type TableRowAction
  } from '@/models/core';
  import { useCellEditStore } from '@/stores/cellEditStore';
  import { useColumnEditStore } from '@/stores/columnEditStore';
  import { useColumnsEditDialogStore } from '@/stores/columnsEditDialogStore';
  import { useCurrentTableStore } from '@/stores/currentTableStore';
  import { isValidFileName } from '@/utils/FileUtils';

  const columnEditStore = useColumnEditStore();
  const cellEditStore = useCellEditStore();

  const { t } = useI18n();

  const columnsEditDialogStore = useColumnsEditDialogStore();

  const currentTableStore = useCurrentTableStore();
  const { currentCsvData, currentCsvHeader } = storeToRefs(currentTableStore);

  const onCellEditComplete = (cellEditPayload: DataTableCellEditCompleteEvent) => {
    Object.assign(cellEditPayload.data, cellEditPayload.newData);
  };

  const CsvDataTable_Ref = ref();
  const exportCSV = (): void => {
    CsvDataTable_Ref.value.exportCSV();
  };

  const firstItemIndexOnPage: Ref<number> = ref(0);
  const setCurrentPageInformation = (event: DataTablePageEvent) => {
    firstItemIndexOnPage.value = event.first;
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
      name: 'edit-row',
      icon: 'pen',
      action: RowActions.EditRow
    },
    {
      name: 'copy-row',
      icon: 'copy',
      action: RowActions.CopyRow
    },
    {
      name: 'delete-row',
      icon: 'trash',
      action: RowActions.DeleteRow
    },
  ]);

  const triggerRowAction = (action: RowActions, row: CsvRowAsJson): void => {
    switch (action) {
      case RowActions.DeleteRow:
        currentTableStore.deleteRowFromCurrentTableData(row);
        break;
      case RowActions.CopyRow:
        currentTableStore.copyExistingRow(row);
        break;
      case RowActions.EditRow:
        currentTableStore.editExistingRow(row);
        break;
    }
  };

  const tableActions: Ref<TableAction[]> = ref([
    {
      label: t('create-new-table'),
      icon: 'file-circle-plus',
      command: () => currentTableStore.resetCurrentTableStore()
    },
    {
      label: t('add-new-row'),
      icon: 'diagram-predecessor',
      command: () => currentTableStore.openNewRowDialog()
    },
    {
      label: t('edit-column', 2),
      icon: 'table-columns',
      command: () => columnsEditDialogStore.initiateColumnsToEdit()
    },
  ]);

  const EditColumnOverlayPanel_Ref: Ref<typeof EditColumOverlayPanel | null> = ref(null);
  const triggerEditColumnOverlay = (event: Event, column: CsvHeaderAsJson) => {
    if (EditColumnOverlayPanel_Ref.value) {
      columnEditStore.setCurrentColumnToEdit(column);
      EditColumnOverlayPanel_Ref.value.setOverlayVisibility(false, event);
      nextTick(() => {
        if (EditColumnOverlayPanel_Ref.value) {
          EditColumnOverlayPanel_Ref.value.setOverlayVisibility(true, event);
        }
      });
    }
  };

  const EditCellOverlayPanel_Ref: Ref<typeof EditCellOverlayPanel | null> = ref(null);
  const triggerEditCellOverlay = (event: Event, data: CsvRowAsJson, field: string) => {
    if (EditCellOverlayPanel_Ref.value) {
      cellEditStore.setCurrentCellToEdit(data, field);
      EditCellOverlayPanel_Ref.value.setOverlayVisibility(false, event);
      nextTick(() => {
        if (EditCellOverlayPanel_Ref.value) {
          EditCellOverlayPanel_Ref.value.setOverlayVisibility(true, event);
        }
      });
    }
  };
</script>


