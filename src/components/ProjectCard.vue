<template>
  <div class="project">
    <img v-if="project.image" :src="getImageUrl(project.image)" :alt="project.title" class="project-image" />
    <div class="content">
      <h2>{{ project.title }}</h2>
      <p>{{ project.description }}</p>
    </div>
    <div class="links">
      <a v-for="link in project.links" :key="link" :href="link" target="_blank">
        <svg-icon type="mdi" :path="getIcon(link)"></svg-icon>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiGit, mdiLink, mdiStickerTextOutline } from '@mdi/js';

defineProps({
  project: {
    type: Object,
    required: true
  }
});

const getImageUrl = (imageName: string) => {
  return `/project_images/${imageName}`;
};

const getIcon = (link: string) => {
  if (link.includes('github.com')) {
    return mdiGit;
  } else if (link.includes('arxiv')) {
    return mdiStickerTextOutline;
  } else {
    return mdiLink;
  }
};
</script>

<style scoped>
.project {
  background: var(--palette-lightestest-orange);
  padding: 16px;
  margin: 16px 0;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  break-inside: avoid;
}

.project:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
}

.project-image {
  width: 100%;
  height: 25vh;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.content {
  padding: 0;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project h2 {
  color: var(--palette-dark-orange);
  font-size: 1.2rem;
  margin-bottom: 8px;
  line-height: 1.1em;
}

.project p {
  color: var(--color-text);
  font-size: 0.9rem;
  line-height: 1.4;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  flex-grow: 1;
}

.links {
  margin-top: auto;
  align-self: flex-end;
  display: flex;
}

.links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: var(--color-background);
  border-radius: 50%;
  transition: background 0.3s ease, transform 0.2s ease;
}

.links a:hover {
  background: var(--palette-dark-blue);
  transform: scale(1.1);
}

.links a svg {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--palette-dark-orange);
  transition: color 0.3s ease;
}

.links a:hover svg {
  color: var(--color-background-soft);
}
</style>
