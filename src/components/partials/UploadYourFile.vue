<template>
  <div class="flex flex-col h-screen w-screen justify-center items-center gap-12">
    <div class="text-5xl text-center">
      CSV-Editor
    </div>
    <div>
      <FileUpload
        name="csvUpload"
        mode="basic"
        class="w-64"
        @uploader="onUploadCsv($event)"
        :multiple="false"
        :auto="true"
        customUpload
        accept=".csv">
      </FileUpload>
    </div>
  </div>
</template>


<script setup lang="ts">
  import FileUpload, { type FileUploadUploadEvent } from 'primevue/fileupload';

  import { uploadFile } from '@/utils/FileUtils';

  const onUploadCsv = (event: FileUploadUploadEvent) => {
    console.log(event);

    if (Array.isArray(event.files)) {
      uploadFile(event.files[0]);
    } else {
      uploadFile(event.files);
    }

    return;
  };
</script>

<style lang="scss">
.p-fileupload {
  @apply flex flex-col justify-center items-center
}
</style>