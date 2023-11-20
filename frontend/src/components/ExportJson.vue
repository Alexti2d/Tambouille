<template>
  <div class="text-center mb-5">
    <button class="btn btn-outline-warning" @click="exportJSON">Exporter JSON</button>
  </div>
</template>

<script>
import { api } from '@/services/api'
const apiService = new api();
export default {
  methods: {
    exportJSON() {
      apiService.articleGptGetAll().then(res => {
        const dataStr = JSON.stringify(res.data, null, 2);
        const filename = 'export.json';
        const blob = new Blob([dataStr], { type: 'application/json' });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
        }
      })
    }
  }
}
</script>

<style>

</style>