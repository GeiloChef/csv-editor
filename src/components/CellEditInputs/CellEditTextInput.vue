<template>
  <InputText
    v-if="isShortTextType"
    v-model="newFieldValue" />
  <Textarea
    v-if="isLongTextType"
    v-model="newFieldValue"
    rows="5"
    cols="30" />
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import InputText from 'primevue/inputtext';
  import Textarea from 'primevue/textarea';
  import { computed } from 'vue';

  import { TextColumnType } from '@/models/columnSettings';
  import { useCellEditStore } from '@/stores/cellEditStore';


  const cellEditStore = useCellEditStore();
  const { newFieldValue, currentColumnInfoOfFieldToEdit } = storeToRefs(cellEditStore);

  const isLongTextType = computed((): boolean => {
    return !!currentColumnInfoOfFieldToEdit.value
      && currentColumnInfoOfFieldToEdit.value.columnTypeSettings_Text.textType === TextColumnType.LongText;
  });

  const isShortTextType = computed((): boolean => {
    return !!currentColumnInfoOfFieldToEdit.value
      && currentColumnInfoOfFieldToEdit.value.columnTypeSettings_Text.textType === TextColumnType.ShortText;
  });
</script>