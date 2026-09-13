<template>
<div class="page">
    <Sidebar />
    <div class="content">
      <h1 class="title">Publications</h1>
      <div class="publications-list">
        <PublicationEntry v-for="pub in publications" :key="pub.title" :publication="pub" />
      </div>
    </div>
</div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
import PublicationEntry, { type Publication } from '../components/PublicationEntry.vue';

import { ref, onMounted } from 'vue';
import axios from 'axios';
import yaml from 'js-yaml';

const publications = ref<Publication[]>([]);

onMounted(async () => {
    const response = await axios.get('/docs/publications.yaml');
    const data = yaml.load(response.data) as { publications: Publication[] };
    publications.value = (data.publications || []).sort((a, b) => b.year - a.year);
});
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  max-width: 60vw;
  margin: 50px auto;
  padding: 20px;
  color: #333;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.title {
  font-size: 2rem;
  font-family: 'Courier Prime', monospace;
  font-weight: bold;
  margin-bottom: 8px;
}

.publications-list {
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .content {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 1em;
  }
}
</style>
