<script setup lang="ts">
import { defineComponent } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import Game from '../components/Game.vue';
import FaceLooker from '../components/FaceLooker.vue';

import { ref, onMounted } from 'vue';
import axios from 'axios';

const bioText = ref('');


function add() {
    console.log('add');
}

function remove() {
    console.log('remove');
}
onMounted(async () => {
    const response = await axios.get('/docs/bio.md');
    bioText.value = response.data;
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
        <div v-if="bioText" class="bio-text">
            {{ bioText }}
        </div>
        </div>
        <div class="face-looker-container">
            <FaceLooker :showDebug="false" />
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

.face-looker-container {
    width: 300px;
    height: 300px;
    margin: 2em auto;
}

@media (orientation: portrait) {
    .content {
        max-width: 100vw;
        padding: 0em 2em;
    }

    .face-looker-container {
        width: 250px;
        height: 250px;
        margin-bottom: 40px;
    }
}
</style>