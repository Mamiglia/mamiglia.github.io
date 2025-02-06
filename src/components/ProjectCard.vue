<template>
  <div class="project">
    <h2>{{ project.title }}</h2>
    <p>{{ project.description }}</p>
    <div class="links">
      <a v-for="link in project.links" :key="link" :href="link" target="_blank">
        <svg-icon :path="getIcon(link)" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiGit, mdiLink, mdiStickerTextOutline } from '@mdi/js';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

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
  background: #f9f9f9;
  padding: 16px;
  margin: 16px 0;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  display: inline-block;
}

.project:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
}

.project h2 {
  color: #FF8800;
  font-size: 1.2rem;
  margin-bottom: 8px;
  line-height: 1.1em;
}

.project p {
  color: #333;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 30px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.links {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
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

.links a .material-icons {
  font-size: 1.1rem;
  color: #FF8800;
  transition: color 0.3s ease;
}

.links a:hover .material-icons {
  color: white;
}
</style>
