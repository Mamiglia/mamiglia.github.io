<template>
<div class="teaching-card">
    <div class="card-header">
    <h2 class="teaching-title">{{ teaching.title }}</h2>
    <p class="teaching-role">{{ teaching.role }} · {{ teaching.year }}</p>
    </div>
    <div class="teaching-details">
    <div class="teaching-place">
        <span class="material-symbols-outlined">pin_drop</span>
        <p>{{ teaching.place }}</p>
    </div>
    <p class="teaching-description">{{ teaching.description }}</p>
    </div>
    <a :href="teaching.link" target="_blank" class="teaching-link" aria-label="Teaching link">
    <span class="material-symbols-outlined">link</span>
    </a>
</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

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
align-items: center;
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
bottom: 12px;
right: 12px;
display: flex;
align-items: center;
justify-content: center;
background: transparent;
border-radius: 50%;
width: 28px;
height: 28px;
color: #d96d00;
transition: color 0.2s ease-in-out;
}

.teaching-link:hover {
color: #b35600;
}
</style>
