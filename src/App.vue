<template>
    <!-- Footbar (appears after 2s) -->
    <transition name="fade">
      <div class="footbar" v-if="showFootbar && ($route.path === '/' || !isPortrait)">
        <nav>
          <RouterLink class="hoverable" to="/projects" @mouseover="showFinger" @mouseleave="hideFinger">Projects</RouterLink>
          <RouterLink class="hoverable" to="/publications" @mouseover="showFinger" @mouseleave="hideFinger">Publications</RouterLink>
          <RouterLink class="hoverable" to="/teachings" @mouseover="showFinger" @mouseleave="hideFinger">Teachings</RouterLink>
          <RouterLink class="hoverable" to="/bio" @mouseover="showFinger" @mouseleave="hideFinger">Bio</RouterLink>
          <a class="hoverable" href="/notes" target="_blank" @mouseover="showFinger" @mouseleave="hideFinger">Notes</a>
        </nav>
      </div>
    </transition>
    <img :style="fingerStyle" src="@/assets/finger.png" class="finger-image" />
    <RouterView />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const narrowQuery = window.matchMedia('(max-width: 768px)');
const isPortrait = ref(narrowQuery.matches);
const showFootbar = ref(false);

function onNarrowChange(e: MediaQueryListEvent) {
  isPortrait.value = e.matches;
}
onMounted(() => narrowQuery.addEventListener('change', onNarrowChange));
onBeforeUnmount(() => narrowQuery.removeEventListener('change', onNarrowChange));

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
.page {
  display: flex;
  width: 100vw;
}

.content {
  flex: 1;
  padding: 50px;
}

.bold {
  font-weight: bold;
}

.footbar {
  position: fixed;
  bottom: 10px;
  width: 100%;
  opacity: 0;
  animation: fadeIn 2.5s forwards 0.5s;
}

.footbar nav {
  list-style: none;
  display: flex;
  justify-content: center;
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

.footbar nav a {
  font-size: 1rem;
  color: #666;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .page {
    flex-direction: column;
  }

  /* Views center .content with auto margins; on narrow screens that
     shrink-wraps inside the column flexbox, so force full width. */
  .content {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 1.25em;
  }

  .footbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    opacity: 0;
    animation: fadeIn 1s forwards 0.3s;
  }

  .footbar nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    justify-items: center;
  }
  
  .footbar nav a {
    margin: 0;
  }

  .finger-image {
    display: none;
  }
}
</style>
