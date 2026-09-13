<template>
<div class="page">
    <Sidebar />
    <div class="content">
    <h1>Projects</h1>
    <div class="projects-grid">
        <div v-for="(column, i) in columns" :key="i" class="projects-column">
            <ProjectCard v-for="project in column" :key="project.title" :project="project" />
        </div>
    </div>
    </div>
</div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
import ProjectCard from '../components/ProjectCard.vue';

import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import yaml from 'js-yaml';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt, faLink } from '@fortawesome/free-solid-svg-icons';

library.add(faFileAlt, faLink, faGithub);

interface Project {
    title: string;
    description: string;
    links: string[];
}

const projects = ref<Project[]>([]);

// Deal projects into columns round-robin (1st -> left, 2nd -> right, ...)
// so each column stays in order and the newest entries sit on the top row,
// while every column packs its cards without gaps.
const narrowQuery = window.matchMedia('(max-width: 768px)');
const columnCount = ref(narrowQuery.matches ? 1 : 2);
const columns = computed(() => {
    const cols: Project[][] = Array.from({ length: columnCount.value }, () => []);
    projects.value.forEach((project, i) => cols[i % columnCount.value].push(project));
    return cols;
});

function onLayoutChange(e: MediaQueryListEvent) {
    columnCount.value = e.matches ? 1 : 2;
}

onMounted(async () => {
    narrowQuery.addEventListener('change', onLayoutChange);
    const response = await axios.get('/docs/projects.yaml');
    const data = yaml.load(response.data) as { projects: Project[] };
    projects.value = data.projects || [];
});

onBeforeUnmount(() => {
    narrowQuery.removeEventListener('change', onLayoutChange);
});
</script>

<style scoped>
.content {
    max-width: 70vw;
    margin: 50px auto;
    padding: 20px;
    font-family: 'Courier Prime', monospace;
}

.projects-grid {
  display: flex;
  gap: 1em;
  align-items: flex-start;
}

.projects-column {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

@media (max-width: 768px) {
  .projects-grid {
    flex-direction: column;
    align-items: stretch;
  }

  .content {
    max-width: 100vw;
    padding: 20px 0;
  }
}

h1 {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #FF8800;
}
</style>