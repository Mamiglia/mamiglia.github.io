<template>
<div class="page">
    <Sidebar />
    <div class="content">
      <h1 class="title">Teachings</h1>
      <div class="teachings-list">
        <TeachingCard v-for="teaching in teachings" :key="teaching.title" :teaching="teaching" />
      </div>
    </div>
</div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
import TeachingCard from '../components/TeachingCard.vue';

import { ref, onMounted } from 'vue';
import axios from 'axios';
import yaml from 'js-yaml';

interface Teaching {
    title: string;
    place: string;
    description: string;
    link?: string;
    year: string;
    role: string;
}

const teachings = ref<Teaching[]>([]);

onMounted(async () => {
    const response = await axios.get('/docs/teachings.yaml');
    const data = yaml.load(response.data) as { teachings: Teaching[] };
    teachings.value = data.teachings || [];
});
</script>

<style scoped>
.content {
  display: flex;
  max-width: 70vw;
  margin: 50px auto;
  padding: 20px;
  color: #333;
  flex-direction: column;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.title {
  font-size: 2rem;
  font-family: 'Courier Prime', monospace;
  font-weight: bold;
  margin-bottom: 20px;
}

.teachings-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (max-width: 768px), (max-height: 520px) {
  .content {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 1em;
  }
}
</style>