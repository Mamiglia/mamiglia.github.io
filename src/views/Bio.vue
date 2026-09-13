<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
import FaceLooker from '../components/FaceLooker.vue';

import { ref, onMounted } from 'vue';
import axios from 'axios';

const bioText = ref('');

onMounted(async () => {
    const response = await axios.get('/docs/bio.md');
    bioText.value = response.data;
});
</script>

<template>
    <div class="page">
        <Sidebar />
        <div class="content">
        <h1>Bio</h1>
        <div v-if="bioText" class="bio-text">
            {{ bioText }}
        </div>
        </div>
        <div class="face-looker-container">
            <FaceLooker :showDebug="false" />
        </div>

    </div>
</template>

<style scoped>

.content {
    max-width: 40em;
    color: #333;
    font-size: 1rem;
}

.bio-text {
    white-space: pre-line;
}

.face-looker-container {
    width: 300px;
    height: 300px;
    margin: 2em auto;
}

@media (max-width: 768px), (max-height: 520px) {
    .content {
        max-width: 100%;
    }

    .face-looker-container {
        width: 250px;
        height: 250px;
        margin-bottom: 40px;
    }
}
</style>