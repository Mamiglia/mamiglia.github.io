<script setup lang="ts">
import { defineComponent } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import Game from '../components/Game.vue';

import { ref, onMounted } from 'vue';
import axios from 'axios';

import VueTypewriterEffect from "vue-typewriter-effect";

const bioText = ref([]);


function add() {
    console.log('add');
}

function remove() {
    console.log('remove');
}
onMounted(async () => {
    const response = await axios.get('/docs/bio.md');
    bioText.value = response.data.split('\n');
});

defineComponent({
    name: 'Bio',
    components: {
        Sidebar
    }
});
</script>

<template>
    <div class="page">
        <Sidebar />
        <div class="content">
        <h1>Bio</h1>
        <vue-typewriter-effect
          v-if="bioText.length"
          :strings="bioText"
          :autoStart="true"
          :delay="4"
          :deleteSpeed="100000000000000000000"
          :cursor="'█'"
        />
        </div>
        <Game />

    </div>
</template>

<style scoped>

.content {
    max-width: 40em;
    color: #333;
    font-size: 1rem;
}

@media (orientation: portrait) {
    .content {
        max-width: 100vw;
        padding: 0em 2em;
    }

}
</style>