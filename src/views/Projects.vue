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

import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import yaml from 'js-yaml';
import type { Publication } from '../components/PublicationEntry.vue';
import { useNarrow } from '@/composables/useNarrow';

interface Project {
    title: string;
    year: number;
    description: string;
    links?: string[];
    image?: string;
}

const projects = ref<Project[]>([]);

// Publications flagged `featured` in publications.yaml also show up here as
// cards, so each paper is written once and the two pages cannot drift apart.
function toProject(pub: Publication): Project {
    return {
        title: pub.title,
        year: pub.year,
        description: pub.summary,
        links: pub.links.map(link => link.url),
        image: pub.image,
    };
}

// Deal projects into columns round-robin (1st -> left, 2nd -> right, ...)
// so each column stays in order and the newest entries sit on the top row,
// while every column packs its cards without gaps.
const isNarrow = useNarrow();
const columnCount = computed(() => (isNarrow.value ? 1 : 2));
const columns = computed(() => {
    const cols: Project[][] = Array.from({ length: columnCount.value }, () => []);
    projects.value.forEach((project, i) => cols[i % columnCount.value].push(project));
    return cols;
});

onMounted(async () => {
    const [projectsRes, pubsRes] = await Promise.all([
        axios.get('/docs/projects.yaml'),
        axios.get('/docs/publications.yaml'),
    ]);
    const own = (yaml.load(projectsRes.data) as { projects: Project[] }).projects || [];
    const pubs = (yaml.load(pubsRes.data) as { publications: (Publication & { featured?: boolean })[] }).publications || [];
    const featured = pubs.filter(pub => pub.featured).map(toProject);
    // Newest first; within a year, publications come before projects and
    // both keep their file order (Array.prototype.sort is stable).
    projects.value = [...featured, ...own].sort((a, b) => b.year - a.year);
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

@media (max-width: 768px), (max-height: 520px) {
  .projects-grid {
    flex-direction: column;
    align-items: stretch;
  }

  .content {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 1em;
  }
}

h1 {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #FF8800;
}
</style>