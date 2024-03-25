<template>
  <div class="flex flex-col gap-8">
    <div>
      <span class="text-4xl"> Tabellentitel </span>
    </div>
    <EditableTable />
  </div>
</template>

<script setup lang="ts">

  import EditableTable from '@/components/elements/EditableTable.vue';
</script>