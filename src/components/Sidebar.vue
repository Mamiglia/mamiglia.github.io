<template>
<div class="sidebar">
    <div class="sidebar-content">
        <RouterLink class="hoverable" to="/"><h1>
        {{ isPortrait.value?'Matteo':'M.' }} <span class="bold">Migliarini</span>
        </h1>
        </RouterLink>
    <div class="social-buttons">
            <a class="social" href="https://github.com/mamiglia" target="_blank">
      <font-awesome-icon :icon="['fab', 'github']" />
    </a>
    <a class="social" href="https://www.linkedin.com/in/mamiglia" target="_blank">
      <font-awesome-icon :icon="['fab', 'linkedin']" />
    </a>
        </div>
    </div>

    <button v-if="isPortrait" @click="toggleMenu" class="menu-button">
    <font-awesome-icon :icon="['fas', 'bars']" />
    </button>
</div>
<div class="padding">

</div>

    <nav v-if="isPortrait" :class="{'dropdown-menu': true, 'open': showMenu}">
      <RouterLink to="/projects">Projects</RouterLink>
      <RouterLink to="/teachings">Teachings</RouterLink>
      <RouterLink to="/bio">Bio</RouterLink>
      <a href="/notes" target="_blank">Notes</a>
    </nav>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue';

library.add(faGithub, faLinkedin, faBars);

const showMenu = ref(false);
const isPortrait: Ref<boolean> = ref(window.matchMedia("(max-width: 768px)").matches);

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function handleResize() {
  isPortrait.value = window.matchMedia("(max-width: 768px)").matches;
  if (!isPortrait.value) {
    showMenu.value = false;
  }
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

</script>

<style scoped>
.padding {
    width: 20vw;
    height: 100vh;
}
.sidebar {
position: fixed;
width: 20vw;
height: 100vh;
background-color: #f8f9fa;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 20px;
font-family: 'Courier Prime', monospace;
}

.sidebar-content {
display: flex;
justify-content: space-between;
height: 90vh;
flex-direction: column;
align-items: center;
}

h1 {
font-size: 3rem;
margin-bottom: 20px;
}

.social-buttons {
display: flex;
gap: 10px;
font-size: 2em;
color: #666;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: 10vh;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f9fa;
    border-bottom: 1px solid #ddd;
    height: auto;
    z-index: 2;
  }
  .padding {
    width: 100vw;
    height: 10vh;
  }
  /* Optionally, adjust heading font-size for topbar */
  a {
    margin: 0;
  }
    h1 {
        font-size: 2rem;
        margin: 0;
    }
  .sidebar-content {
    height: auto;
  }
    .social-buttons {
        display: none;
    }
}

.menu-button {
  background: none;
  border: none;
  font-size: 2.7em;
  cursor: pointer;
}

.dropdown-menu {
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100vw;
  padding-top: 11vh;
  z-index: 1;
  opacity: 0;
  transform: translateY(-20em);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-menu.open {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-menu a {
  margin: 10px 0;
  font-size: 1.2em;
  color: #333;
  text-decoration: none;
}

</style>