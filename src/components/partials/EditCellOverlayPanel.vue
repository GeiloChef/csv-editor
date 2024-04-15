<template>
  <OverlayPanel
    v-if="currentColumnInfoOfFieldToEdit"
    class="orange-border"
    ref="EditCellOverlayPanel">
    <div class="flex flex-col gap-4">
      <div class="font-bold">
        Edit Cell Content
      </div>
      <div>
        <CellEditTextInput v-if="currentColumnInfoOfFieldToEdit.columnType === ColumnType.Text" />
      </div>
      <div>
        <CellEditNumberInput
          v-if="currentColumnInfoOfFieldToEdit.columnType === ColumnType.Number"
          :minFractionDigits="2"
          :maxFractionDigits="5" />
      </div>
    </div>
    <div class="mt-4 flex justify-end">
      <div class="flex flex-row gap-4">
        <Button
          class="!max-h-8"
          size="small"
          severity="secondary"
          :label="$t('cancel')"
          @click="closeOverlay"/>
        <Button
          class="!max-h-8"
          size="small"
          :label="$t('save')"
          @click="storeNewValueInCell"/>
      </div>
    </div>
  </OverlayPanel>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import Button from 'primevue/button';
  import OverlayPanel from 'primevue/overlaypanel';
  import { computed, ref, type Ref } from 'vue';

  import CellEditNumberInput from '@/components/CellEditInputs/CellEditNumberInput.vue';
  import CellEditTextInput from '@/components/CellEditInputs/CellEditTextInput.vue';
  import { ColumnType, type CsvHeaderAsJson } from '@/models/core';
  import { useCellEditStore } from '@/stores/cellEditStore';
  import { useCurrentTableStore } from '@/stores/currentTableStore';

  const cellEditStore = useCellEditStore();
  const { cellField, currentColumnInfoOfFieldToEdit } = storeToRefs(cellEditStore);


  const currentTableStore = useCurrentTableStore();
  const { currentCsvHeader } = storeToRefs(currentTableStore);

  const EditCellOverlayPanel: Ref<OverlayPanel | null> = ref(null);

  const currentColumnInfo = computed((): CsvHeaderAsJson => {
    const foundColumn = currentCsvHeader.value.find((column) => column.uuid_for_edition === cellField.value);

    return foundColumn || currentCsvHeader.value[0];
  });

  const setOverlayVisibility = (visibility: boolean, event: Event): void => {
    if (EditCellOverlayPanel.value) {
      return visibility ? EditCellOverlayPanel.value.show(event) : EditCellOverlayPanel.value.hide();
    }
  };

  const closeOverlay = () => {
    if (EditCellOverlayPanel.value) {
      return EditCellOverlayPanel.value.hide();
    }
  };

  const toggleVisibility = (event: Event) => {
    if (EditCellOverlayPanel.value) {
      return EditCellOverlayPanel.value.toggle(event);
    }
  };

  const storeNewValueInCell = () => {
    cellEditStore.updateCellValue();
    closeOverlay();
  };

  defineExpose({
    setOverlayVisibility,
    toggleVisibility
  });
</script>