<script>
export default {
    name: "Project",
    props: {
        title:String,
        image:String,
        text:String,
        link:String,
        gitLink:String
    }
};
</script>

<template>
    <div class="project">
        <h2>{{title}}</h2>
        <img v-if="image!==''" :src="image">
        <p>{{text}}</p>
        <div class="links">
            <a v-if="gitLink!==''" :href="gitLink"><i class='fa fa-github' ></i></a>
            <a v-if="link!==''" :href="link"><span class="material-icons">link</span></a>
            <a v-if="link!==''" :href="link"><span class="material-icons">share</span></a>
        </div>
    </div>
</template>

<style scoped>
.project{
    width: 50vw;
    margin: 5% 0 5% 5%;
}

p {
    padding-top: 1em;
    padding-bottom: 1em;
    font-size: 1.1em;
}

.links {
    display: flex;
    justify-content: right;
}
i {
    font-size: 1rem;
}
.links>a>* {
    aspect-ratio: 1/1;
    font-size: 2em;
    padding: .1em;
    transition: transform .2s;
}
.links>a {
    aspect-ratio: 1/1;
    text-decoration: none;
    color: --var(--color-text);
}
a:visited {
    color: var(--color-text);
}
a:hover {
    color: var(--accent);
}
.links>a>*:hover {
    transform: scale(1.3);
}





</style>