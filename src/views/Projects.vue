<template>
<div class="page">
    <Sidebar />
    <div class="content">
    <h1>Projects</h1>
    <div class="projects-grid">
        <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
    </div>
    </div>
</div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
import ProjectCard from '../components/ProjectCard.vue';

import { ref, onMounted } from 'vue';
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

onMounted(async () => {
    const response = await axios.get('/docs/projects.yaml');
    const data = yaml.load(response.data) as { projects: Project[] };
    projects.value = data.projects || [];
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
  column-count: 2;
  column-gap: 1em;
}

@media (max-width: 768px) {
  .projects-grid {
    display: flex;
    flex-direction: column;
    column-count: unset;
  }

  .content {
    max-width: 100vw;
  }
}

h1 {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #FF8800;
}
</style>