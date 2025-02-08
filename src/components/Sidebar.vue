<template>
<div class="sidebar">
    <div class="sidebar-content">
        <RouterLink class="hoverable" to="/"><h1>
        Matteo <span class="bold">Migliarini</span>
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
</div>
<div class="padding">

</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub, faLinkedin);

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
font-size: 24px;
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
    position: static; /* no longer fixed */
    width: 100%;
    height: auto;
    padding: 0.5rem 1rem;
    display: block;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f9fa;
    border-bottom: 1px solid #ddd;
    height: auto;
  }
  .padding {
    display: none; 
  }
  /* Optionally, adjust heading font-size for topbar */
  a {
    margin: 0;
  }
    h1 {
        font-size: 1.7rem;
        margin: 0;
    }
  .sidebar-content {
    height: auto;
  }
    .social-buttons {
        display: none;
    }
}
</style>