<template>
    <div id="sidemenu">
        <header>
            <h1>Matteo<br>Migliarini</h1>
        </header>
        <ul>
            <li><a href="#projects">>Projects</a></li>
            <li><a href="#knowledge">>Knowledge</a></li>
            <li><a href="#contacts">>Contacts</a></li>
        </ul>
    </div>
</template>

<style scoped>
header {
    padding: 2em;
}
#sidemenu {
    background-color: var(--color-background-mute);
    height: 100vh;
    width: 100%;
}
a {
    text-decoration: none;
    color: var(--color-text);
    transition: color .5s;
}
a:hover {
    color: var(--accent);
}
a::after {
    display: inline-block;
    content: " ";
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: var(--accent);
    bottom: 0;
    left: 0;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
    transform: scaleX(0);
}
a:hover::after {
    /* https://www.30secondsofcode.org/css/s/hover-underline-animation */
    transform: scaleX(1);
    transform-origin: bottom left;
}
li {
    padding: 1em 0 0 1em;
    font-family: 'Courier New', Courier, monospace;
}
ul {
    list-style: none;
}
</style>