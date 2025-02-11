<template>
<div class="landing"> 
  <h1>
    Matteo <span class="bold">Migliarini</span>
  </h1>
  <p class="subtitle">{{ displayedTitle }}</p>
  <div class="links">
    <a class="social" href="https://github.com/mamiglia" target="_blank">
      <svg-icon type="mdi" :path="mdiGithub"></svg-icon>
    </a>
    <a class="social" href="https://www.linkedin.com/in/mamiglia" target="_blank">
      <svg-icon type="mdi" :path="mdiLinkedin"></svg-icon>
    </a>
    <!-- Add more links as needed -->
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiGithub, mdiLinkedin } from '@mdi/js';

const titles = ["AI Researcher", "Computer Engineer", "Data Scientist"];
const displayedTitle = ref("");
const titleIndex = ref(0);
const charIndex = ref(0);


const typeTitle = () => {
  if (charIndex.value < titles[titleIndex.value].length) {
    displayedTitle.value += titles[titleIndex.value][charIndex.value];
    charIndex.value++;
    setTimeout(typeTitle, 100);
  } else {
    setTimeout(eraseTitle, 1500);
  }
};

const eraseTitle = () => {
  if (displayedTitle.value.length > 0) {
    displayedTitle.value = displayedTitle.value.slice(0, -1);
    setTimeout(eraseTitle, 50);
  } else {
    titleIndex.value = (titleIndex.value + 1) % titles.length;
    charIndex.value = 0;
    setTimeout(typeTitle, 500);
  }
};

onMounted(() => {
  setTimeout(typeTitle, 500);

    return {
      displayedTitle
    };
  }
);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html, #app {
  height: 100vh;
  width: 100vw;
  font-family: 'Courier Prime', monospace;
}

.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: white;
  color: black;
  text-align: center;
}

.landing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  color: #333;
}

.landing h1 {
  font-size: 3rem;
  height: 4rem;
  line-height: 1em;
}

.bold {
  font-weight: bold;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  height: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
}

.links a {
  font-size: 1.5rem;
  margin: 0 10px;
  color: #666;
  transition: all 0.3s ease;
}

.social svg {
  width: 2rem;
  height: 2rem;
}

.links a:hover {
  color: #FF8800;
}

.links {
  margin-top: 1em;
}

@media (orientation: portrait) {
  .landing h1 {
    /* font-size: 3.5rem; */
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  /* .subtitle {
    font-size: 1.4rem;
    /* height: 1em; */
  /* } */



  .social svg {
    width: 2.5rem;
    height: 2.5rem;
  } 


  
}


</style>
