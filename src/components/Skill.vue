<script>
export default {
    name: "Skill",
    props: {
        title: String,
        icon: String,
        img: String,
        text: String
    }
}
</script>

<template>
    <div class="skill">
        <i v-if="icon && icon!=''" :class="icon"></i>
        <img v-else :src="img">
        <h4>{{title}}</h4>
        <p v-if="text && text!=''">{{text}}</p>
    </div>
</template>

<style>
.skill {
    background-color: var(--color-background-soft);
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 12vw;
    height: fit-content;
    margin: 1em;
    padding: 1em;
    transition: height 2s ease;
}

h4, p {
    max-height: 0;
    text-align: center;
    overflow: hidden;
    transition: max-height 2s ease;
    font-family: 'Courier New', Courier, monospace;
    padding-top: 1em;

}

.skill:hover>h4 {
    max-height: 500px;
}
</style>