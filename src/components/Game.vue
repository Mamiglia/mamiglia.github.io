<template>
<div class="game">
    <div class="view">
    </div>
    <div class="buttons">
        <button @click="add">+</button>
        <button @click="remove">-</button>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';

function add() {
    console.log('add');
}

function remove() {
    console.log('remove');
}
</script>

<style scoped>
.game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    display: none;
}

</style>