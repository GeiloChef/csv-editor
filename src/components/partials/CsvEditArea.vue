<template>
  <div class="flex flex-col gap-8">
    <EditableTable />
    <RowInformationDialog />
    <ColumnsEditDialog />
  </div>
</template>

<script setup lang="ts">
  import EditableTable from '@/components/elements/EditableTable.vue';
  import ColumnsEditDialog from '@/components/partials/ColumnsEditDialog.vue';
  import RowInformationDialog from '@/components/partials/RowInformationDialog.vue';
</script>