<template>
  <article class="publication">
    <img v-if="publication.image" :src="`/project_images/${publication.image}`" :alt="publication.title" class="thumb" />
    <div class="body">
      <div class="headline">
        <h2>
          <a :href="primaryLink" target="_blank">{{ publication.title }}</a>
        </h2>
        <span :class="['venue', publication.type]">{{ publication.venue }} {{ publication.year }}</span>
      </div>
      <p class="authors">
        <template v-for="(author, i) in authors" :key="author">
          <span :class="{ me: author.includes('Migliarini') }">{{ author }}</span><span v-if="i < authors.length - 1">, </span>
        </template>
        <span v-if="hasEqualContribution" class="note">* equal contribution</span>
      </p>
      <p class="summary">{{ publication.summary }}</p>
      <div class="links">
        <a v-for="link in publication.links" :key="link.url" :href="link.url" target="_blank">{{ link.label }}</a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: 'conference' | 'workshop' | 'preprint' | 'post';
  summary: string;
  links: { label: string; url: string }[];
  image?: string;
}

const props = defineProps<{ publication: Publication }>();

const authors = computed(() => props.publication.authors.split(',').map(a => a.trim()));
const hasEqualContribution = computed(() => props.publication.authors.includes('*'));
const primaryLink = computed(() => props.publication.links[0]?.url ?? '#');
</script>

<style scoped>
.publication {
  display: flex;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid var(--color-border);
}

.publication:last-child {
  border-bottom: none;
}

.thumb {
  flex: none;
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 4px;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.headline {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

h2 {
  font-family: 'Courier Prime', monospace;
  font-size: 1.15rem;
  line-height: 1.25;
  font-weight: bold;
  color: var(--palette-dark-orange);
}

h2 a {
  color: inherit;
  text-decoration: none;
}

h2 a:hover {
  text-decoration: underline;
}

.venue {
  flex: none;
  font-family: 'Courier Prime', monospace;
  font-size: 0.8rem;
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--palette-dark-blue);
  color: var(--palette-lightest-orange);
  text-align: center;
}

.venue.preprint,
.venue.post,
.venue.workshop {
  background: transparent;
  color: var(--palette-dark-blue);
  border: 1px solid var(--palette-dark-blue);
}

.authors {
  font-size: 0.9rem;
  color: var(--color-text);
  line-height: 1.4;
}

.authors .me {
  font-weight: 600;
}

.authors .note {
  margin-left: 8px;
  opacity: 0.7;
  font-size: 0.8rem;
}

.summary {
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--color-text);
  opacity: 0.9;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 2px;
}

.links a {
  font-family: 'Courier Prime', monospace;
  font-size: 0.85rem;
  text-decoration: none;
  color: var(--palette-dark-orange);
  padding: 2px 10px;
  border: 1px solid var(--palette-dark-orange);
  border-radius: 999px;
  transition: background 0.2s ease, color 0.2s ease;
}

.links a:hover {
  background: var(--palette-dark-orange);
  color: var(--palette-lightest-orange);
}

@media (max-width: 768px), (max-height: 520px) {
  .publication {
    gap: 12px;
  }

  .thumb {
    width: 64px;
    height: 64px;
  }

  .headline {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>
