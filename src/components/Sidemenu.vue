<template>
    <div id="sidemenu">
        <header>
            <h1>Matteo<br>Migliarini</h1>
        </header>
        <ul>
            <li><a href="#projects">Projects&lt</a></li>
            <li><a href="#knowledge">Knowledge&lt</a></li>
            <li><a href="#contacts">Contacts&lt</a></li>
        </ul>
    </div>
</template>

<style scoped>
header {
    padding: 2em;
    padding-right: 0;
}
#sidemenu {
    padding: 2rem;
    background-color: var(--color-background-mute);
    height: 100%;
    width: 100%;
    text-align: right;
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
    content: "";
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
    padding: 1rem 0 0 1rem;
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.3rem;
}
ul {
    list-style: none;
}
</style>