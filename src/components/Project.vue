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
        <img v-if="image && image!==''" :src="image">
        <p>{{text}}</p>
        <div class="links">
            <a v-if="gitLink && gitLink!==''" :href="gitLink"><i class='fa fa-github' ></i></a>
            <a v-if="link && link!==''" :href="link"><span class="material-icons">link</span></a>
            <a v-if="link && link!==''" :href="link"><span class="material-icons">share</span></a>
        </div>
    </div>
</template>

<style scoped>
.project{
    width: 50vw;
    max-height: 80vh;
    margin: 10% 5% 5% 5%;
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
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
    margin-left: 1em;
    color: var(--accent-light);
}
a:visited {
    color: var(--accent-light);
}
a:hover {
    color: var(--accent-dark);
}
.links>a>*:hover {
    transform: scale(1.3);
}

h2 {
    font-family: 'Courier New', Courier, monospace;
    color: var(--accent);
}





</style>