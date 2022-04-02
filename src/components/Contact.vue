<script setup>
const props = defineProps({
    link: String,
    icon: String
})
</script>

<template>
    <a :href="link" >
        <i :class="icon"></i>
    </a>
</template>

<style scoped>
a {
    padding: 1em;
    font-style: normal;
    text-decoration: none;
    color: var(--accent);
    font-size: 3em;
    transition: padding 1s ease, color 1s ease;

}

a:hover {
    padding-bottom: 2em;
    color: var(--accent-2);
}

</style>