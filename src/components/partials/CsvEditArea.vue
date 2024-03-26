<template>
  <div class="flex flex-col gap-8">
    <EditableTable />
    <RowInformationDialog />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import EditableTable from '@/components/elements/EditableTable.vue';
  import RowInformationDialog from '@/components/partials/RowInformationDialog.vue';
  import { useCurrentTableStore } from '@/stores/currentTableStore';

  const currentTableStore = useCurrentTableStore();
  const { currentTableMetaData } = storeToRefs(currentTableStore);
</script>