<template>
    <Sidebar />
    <div class="teachings-page">
      <div class="content">
        <h1 class="title">Teachings</h1>
        <div class="teachings-grid">
          <div v-for="teaching in teachings" :key="teaching.title" class="teaching-card">
            <div class="card-header">
              <h2 class="teaching-title">{{ teaching.title }}</h2>
              <p class="teaching-role">{{ teaching.role }} - {{teaching.year}}</p>
            </div>
            <div class="teaching-details">
              <div class="teaching-place">
                <span class="material-symbols-outlined">
                pin_drop
                </span> <p>{{ teaching.place }}</p>
            </div>
              <p class="teaching-description">{{ teaching.description }}</p>
            </div>
            <a :href="teaching.link" target="_blank" class="teaching-link">
                <span class="material-symbols-outlined">
                link
                </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import Sidebar from './Sidebar.vue';

import { ref, onMounted } from 'vue';
import axios from 'axios';
import yaml from 'js-yaml';

interface Teaching {
    title: string;
    place: string;
    description: string;
    link: string;
    year: string;
    role: string;
}

const teachings = ref<Teaching[]>([]);

onMounted(async () => {
    const response = await axios.get('/public/docs/teachings.yaml');
    teachings.value = yaml.load(response.data).teachings;
});

defineComponent({
    name: 'Teachings',
    components: {
        Sidebar
    }
});
</script>

<style scoped>
.teachings-page {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: white; /* Light-themed background */
  color: #333;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.content {
  flex: 1;
  max-width: 900px;
}

.title {
  font-size: 2rem;
  font-family: 'Courier Prime', monospace;
  font-weight: bold;
  margin-bottom: 20px;
}

.teachings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.teaching-card {
  background: #f9f9f9;
  padding: 14px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  position: relative;
}

.teaching-card:hover {
  transform: translateY(-4px);
}

.card-header {
  margin-bottom: 8px;
}

.teaching-title {
  font-size: 1.1rem;
  font-weight: bold;
}

.teaching-place {
  font-size: 0.85rem;
  color: #ff8800;
  display: flex;
  vertical-align: middle;
}

.teaching-place span {
  font-size: 1rem;
}

.teaching-details {
  margin-bottom: 12px;
}

.teaching-role {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  opacity: 0.8;
}

.teaching-description {
  font-size: 0.9rem;
  opacity: 0.9;
}

.teaching-link {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff8800;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  color: white;
  text-decoration: none;
  transition: background 0.2s ease-in-out;
}

.teaching-link:hover {
  background: #d96d00;
}

.icon {
  width: 16px;
  height: 16px;
}
</style>