<template>
<div class="page">
    <Sidebar />
    <div class="content">
    <h1>Projects</h1>
    <div v-for="project in projects" :key="project.title" class="project">
        <h2>{{ project.title }}</h2>
        <p>{{ project.description }}</p>
        <div class="links">
        <a v-for="link in project.links" :key="link" :href="link" target="_blank">
            <font-awesome-icon :icon="getIcon(link)" />
            <!-- <font-awesome-icon :icon="['fab', 'github']" /> -->
        </a>
        </div>     
   
    </div>
    </div>
</div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue';

import { ref, onMounted } from 'vue';
import axios from 'axios';
import yaml from 'js-yaml';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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

const getIcon = (link: string) => {
    console.log(link);  
    if (link.includes('github.com')) {
        return ['fab', 'github'];
    } else if (link.includes('arxiv')) {
        return ['fas', 'file-alt'];
    } else {
        return ['fas', 'link'];
    }
};

</script>

<style scoped>
.content {
    max-width: 50vw;
    margin: 40px auto;
    padding: 20px;
    font-family: 'Courier Prime', monospace;
}

h1 {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #FF8800;
}

.project {
    background: #f9f9f9;
    padding: 16px;
    margin: 16px 0;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
}

.project:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
}

.project h2 {
    color: #FF8800;
    font-size: 1.2rem;
    margin-bottom: 8px;
}

.project p {
    color: #333;
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 30px; /* Space for the icons */
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

}

.links {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    gap: 8px;
}

.links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: rgba(255, 136, 0, 0.2);
    border-radius: 50%;
    transition: background 0.3s ease, transform 0.2s ease;
}

.links a:hover {
    background: #FF8800;
    transform: scale(1.1);
}

.links a svg {
    font-size: 1.1rem;
    color: #FF8800;
    transition: color 0.3s ease;
}

.links a:hover svg {
    color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
    .content {
        padding: 10px;
    }
    .project {
        padding: 12px;
    }
    .project h2 {
        font-size: 1rem;
    }
    .project p {
        font-size: 0.85rem;
    }
    .links {
        bottom: 8px;
        right: 8px;
    }
    .links a {
        width: 28px;
        height: 28px;
    }
    .links a svg {
        font-size: 1rem;
    }
}   
</style>