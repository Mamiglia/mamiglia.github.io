<template>
    <!-- Footbar (appears after 2s) -->
    <transition name="fade">
      <div class="footbar" v-if="showFootbar">
        <nav>
          <ul>
            <RouterLink class="hoverable" to="/projects" @mouseover="showFinger" @mouseleave="hideFinger">Projects</RouterLink>
            <RouterLink class="hoverable" to="/teachings" @mouseover="showFinger" @mouseleave="hideFinger">Teachings</RouterLink>
            <RouterLink class="hoverable" to="/bio" @mouseover="showFinger" @mouseleave="hideFinger">Bio</RouterLink>
            <a class="hoverable" href="/notes" target="_blank" @mouseover="showFinger" @mouseleave="hideFinger">Notes</a>
          </ul>
        </nav>
      </div>
    </transition>
    <img :style="fingerStyle" src="@/assets/finger.png" class="finger-image" />
    <RouterView />
    <!-- <custom-cursor
      :targets="['img', 'a', 'button', 'svg', 'hoverable']"
      :circleColor="'#666'"
      :circleColorHover="'#2f2f2f'"
      :dotColor="'#333'"
      :dotColorHover="'lightgray'"
      :hoverSize="3"
    ></custom-cursor> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomCursor from "./components/CustomCursor.vue";

const showFootbar = ref(false);

setTimeout(() => {
  showFootbar.value = true;
}, 2000);

const fingerStyle = ref({});

const showFinger = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const rect = target.getBoundingClientRect();
  const angle = Math.random() > 0.5 ? 'rotate(-10deg)' : 'rotate(10deg)';
  fingerStyle.value = {
    left: `${rect.left + rect.width / 2 - 25}px`,
    top: `${rect.top - 2}px`,
    transform: `translateY(0) ${angle}`,
    pointerEvents: 'none',
  };
};

const hideFinger = () => {
  fingerStyle.value = {
    transform: 'translateY(100px)',
    pointerEvents: 'none',
  };
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');

.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  color: black;
  text-align: center;
}

.landing h1 {
  font-size: 3rem;
}
.page {
display: flex;
width: 100vw;
}

.content {
  flex: 1;
  padding: 50px;
  max-width: 50vw;
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
  transition: all 0.3s ease;
}

.links a:hover {
  color: #FF8800;
}

.footbar {
  position: fixed;
  bottom: 20px;
  width: 100%;
  opacity: 0;
  animation: fadeIn 2.5s forwards 2s;
}

.footbar nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
}

.footbar nav ul li {
  margin: 0 15px;
}

.footbar nav ul li a {
  text-decoration: none;
  color: black;
  transition: all 0.3s ease;
}

.footbar nav ul li a:hover {
  color: #FF8800;
  text-decoration: underline;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

a.hoverable {
  margin: 2em;
  margin-bottom: 0;
  padding: 10px;
}

.finger-image {
  position: fixed;
  width: 4em;
  transition: all 0.8s ease; /* Updated transition duration to 0.8s */
  bottom: -100vh;
  transform: translateY(100px);
  pointer-events: none;
}
</style>
