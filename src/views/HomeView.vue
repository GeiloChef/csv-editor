
<template>
  <main>
    <UploadYourFile v-if="!currentCsvHeader.length && !currentCsvData.length" />
    <CsvEditArea v-else />
  </main>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import CsvEditArea from '@/components/partials/CsvEditArea.vue';
  import UploadYourFile from '@/components/partials/UploadYourFile.vue';
  import { useCurrentTableStore } from '@/stores/currentTableStore';

  const currentTableStore = useCurrentTableStore();
  const { currentCsvHeader, currentCsvData } = storeToRefs(currentTableStore);
</script>
