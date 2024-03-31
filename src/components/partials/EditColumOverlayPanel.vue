<template>
  <OverlayPanel
    class="orange-border"
    ref="EditColumnOverlayPanel">
    <div
      v-if="currentColumnToEdit"
      class="p-4">
      <span class="text-lg">
        {{ $t('edit-column')}}
      </span>

      <Divider />
      <div class="flex flex-col gap-2">
        <div>
          {{ $t('change-column-name') }}
        </div>
        <div class="flex flex-row">
          <InputText
            v-model="newColumnName"
            class="!rounded-br-none !rounded-tr-none"
            size="small"/>
          <Button
            class="!rounded-bl-none !rounded-tl-none"
            @click="renameColumn">
            {{ $t('save') }}
          </Button>
        </div>
      </div>
    </div>
  </OverlayPanel>
</template>


<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import Divider from 'primevue/divider';
  import InputText from 'primevue/inputtext';
  import OverlayPanel from 'primevue/overlaypanel';
  import { onMounted, type Ref, ref, watch } from 'vue';

  import { useColumnEditStore } from '@/stores/columnEditStore';
  import { useCurrentTableStore } from '@/stores/currentTableStore';

  const columnEditStore = useColumnEditStore();
  const { currentColumnToEdit } = storeToRefs(columnEditStore);

  const currentTableStore = useCurrentTableStore();

  const EditColumnOverlayPanel: Ref<OverlayPanel | null> = ref(null);

  const setOverlayVisibility = (visibility: boolean, event: Event): void => {
    if (EditColumnOverlayPanel.value) {
      return visibility ? EditColumnOverlayPanel.value.show(event) : EditColumnOverlayPanel.value.hide();
    }
  };

  const toggleVisibility = (event: Event) => {
    if (EditColumnOverlayPanel.value) {
      return EditColumnOverlayPanel.value.toggle(event);
    }
  };

  defineExpose({
    setOverlayVisibility,
    toggleVisibility
  });

  const newColumnName = ref('');

  const renameColumn = (): void => {
    if (!currentColumnToEdit.value) return;

    currentTableStore.renameColumn(currentColumnToEdit.value, newColumnName.value);
  };

  const setupOverlayPanel = (): void => {
    if (!currentColumnToEdit.value) return;

    newColumnName.value = currentColumnToEdit.value.label;
  };

  watch(currentColumnToEdit, () => {
    setupOverlayPanel();
  }, { deep: true });
</script>

<style lang="scss">
.orange-border {
  border-color: var(--primary-color)
}


.orange-border:before {
  border-bottom-color: var(--primary-color);
}
</style>