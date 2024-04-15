<template>
  <div
    v-if="currentColumnToEdit"
    class="flex flex-col gap-2 mt-2">
    <div>
      {{ $t('text-type') }}
    </div>
    <div class="flex flex-row">
      <SelectButton
        v-model="currentColumnToEdit.columnTypeSettings_Text.textType"
        :options="selectableTextTypeOption"
        :allowEmpty="false"
        optionLabel="name"
        optionValue="value"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import SelectButton from 'primevue/selectbutton';
  import { computed } from 'vue';

  import type { TextColumnTypeSelection } from '@/models/columnSettings';
  import { useColumnEditStore } from '@/stores/columnEditStore';
  import { getSelectableTextColumnTypes } from '@/utils/ColumnUtils';


  const columnEditStore = useColumnEditStore();
  const { currentColumnToEdit } = storeToRefs(columnEditStore);

  const selectableTextTypeOption = computed((): TextColumnTypeSelection[] => {
    return getSelectableTextColumnTypes();
  });
</script>