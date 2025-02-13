<template>
<div class="teaching-card">
    <div class="card-header">
    <h2 class="teaching-title">{{ teaching.title }}</h2>
    <p class="teaching-role">{{ teaching.role }} · {{ teaching.year }}</p>
    </div>
    <div class="teaching-details">
    <div class="teaching-place">
        <svg-icon type="mdi" :path="mdiSchool"></svg-icon>
        <p>{{ teaching.place }}</p>
    </div>
    <p class="teaching-description">{{ teaching.description }}</p>
    </div>
    <a :href="teaching.link" target="_blank" class="teaching-link" aria-label="Teaching link">
    <svg-icon type="mdi" :path="mdiLink"></svg-icon>
    </a>
</div>
</template>

<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiSchool, mdiLink } from '@mdi/js';

defineProps({
teaching: {
    type: Object,
    required: true
}
});
</script>

<style scoped>
.teaching-card {
background: #ffffff;
padding: 16px;
border-radius: 8px;
box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
transition: box-shadow 0.2s ease-in-out;
display: flex;
flex-direction: column;
position: relative;
border-left: 4px solid #d96d00;
}

.teaching-card:hover {
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
}

.card-header {
margin-bottom: 10px;
}

.teaching-title {
font-size: 1.2rem;
font-weight: 600;
color: #333;
}

.teaching-role {
font-size: 0.85rem;
color: #555;
opacity: 0.85;
}

.teaching-place {
font-size: 0.9rem;
color: #d96d00;
display: flex;
gap: 6px;
font-weight: 500;
}

.teaching-place span {
font-size: 1rem;
color: #d96d00;
}

.teaching-description {
font-size: 0.9rem;
color: #444;
opacity: 0.9;
}

.teaching-link {
position: absolute;
bottom: 4px;
right: 12px;
align-items: center;
justify-content: center;
color: #d96d00;
transition: color 0.2s ease-in-out;
}

.teaching-link svg {
    width: 1.8rem;
    height: 1.8rem;
}

.teaching-link:hover {
color: #b35600;
}

@media (orientation: portrait) {
.teaching-card {
    border-left: none;
    border-top: 4px solid #d96d00;
    padding-left: 8px;
    padding-right: 8px;
}
}
</style>
