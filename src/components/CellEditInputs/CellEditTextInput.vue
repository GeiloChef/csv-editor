<template>
  <InputText v-model="newFieldValue" />
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import InputText  from 'primevue/inputtext';

  import { useCellEditStore } from '@/stores/cellEditStore';

  const cellEditStore = useCellEditStore();
  const { newFieldValue } = storeToRefs(cellEditStore);
</script>