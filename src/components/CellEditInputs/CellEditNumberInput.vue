<template>
  <InputNumber v-model="newFieldValue" />
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import InputNumber  from 'primevue/inputnumber';

  import { useCellEditStore } from '@/stores/cellEditStore';

  const cellEditStore = useCellEditStore();
  const { newFieldValue } = storeToRefs(cellEditStore);
</script>