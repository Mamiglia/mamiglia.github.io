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
    height: 100%;
    margin: 0 5% 5% 5%;
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    max-width: 50vw;
    min-width: 30vw;
}
h2::after {
    /*fat underline effect*/
    height: 0.8em;
    width: 40%;
    background-color: var(--color-background-mute);
    display: inline-block;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
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
    color: var(--accent);
}
a:visited {
    color: var(--accent);
}
a:hover {
    color: var(--accent-2);
}
.links>a>*:hover {
    transform: scale(1.3);
}

h2 {
    font-family: 'Courier New', Courier, monospace;
    color: var(--accent);
}

@media screen and (orientation:portrait) {
    .project {
        max-width: 85vw;
        
    }
}

</style>