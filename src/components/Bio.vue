<template>
<div class="page">
    <Sidebar />
    <div class="content">
    <h1>Bio</h1>
    <p>
        {{ bioText }}
    </p>
    </div>
</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import Sidebar from './Sidebar.vue';

import { ref, onMounted } from 'vue';
import axios from 'axios';

const bioText = ref('');

onMounted(async () => {
    const response = await axios.get('/public/docs/bio.md');
    bioText.value = response.data;
});

defineComponent({
    name: 'Bio',
    components: {
        Sidebar
    }
});
</script>

<style scoped>

.content p {
    padding: 0em;
    max-width: 40em;
}
</style>