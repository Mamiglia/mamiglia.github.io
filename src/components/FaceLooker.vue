<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useToast } from 'vue-toastification';
import potImage from '@/assets/pot.png';

const toast = useToast();

// Props
interface Props {
  basePath?: string;
  showDebug?: boolean;
  startDelay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  basePath: '/faces/',
  showDebug: false,
  startDelay: 0
});

// Grid configuration (must match your generated images)
const P_MIN = -15;
const P_MAX = 15;
const STEP = 3;
const SIZE = 256;

// Reactive state
const imageSrc = ref('');
const debugInfo = ref({ mouseX: 0, mouseY: 0, filename: '' });
const containerRef = ref<HTMLDivElement | null>(null);
const clickCount = ref(0);

// Click messages
const clickMessages: { [key: number]: string } = {
  1: "Hey Nice to meet you!",
  4: "Hehe, I see that you like using that mouse... Could you please stop clicking me?",
  6: "Please stop.",
  10: "No, really. It's disturbing, please stop clicking my personal space."
};

// Utility functions
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function quantizeToGrid(val: number): number {
  const raw = P_MIN + (val + 1) * (P_MAX - P_MIN) / 2; // [-1,1] -> [-15,15]
  const snapped = Math.round(raw / STEP) * STEP;
  return clamp(snapped, P_MIN, P_MAX);
}

function sanitize(val: number): string {
  const str = Number(val).toFixed(1); // force one decimal, e.g. 0 -> 0.0
  return str.replace('-', 'm').replace('.', 'p');
}

async function preloadImages() {
  const CONCURRENCY_LIMIT = 8;

  // 1. Generate all filenames
  const filenames: string[] = [];
  for (let px = P_MIN; px <= P_MAX; px += STEP) {
    for (let py = P_MIN; py <= P_MAX; py += STEP) {
      filenames.push(gridToFilename(px, py));
    }
  }

  // 2. Shuffle the list for a random load order
  for (let i = filenames.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filenames[i], filenames[j]] = [filenames[j], filenames[i]];
  }

  // 3. Load images with a concurrency limit
  const queue = [...filenames];

  const loadImage = (filename: string) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = `${props.basePath}${filename}`;
      // Resolve on both load and error to not block the queue
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  };

  const processNext = async () => {
    if (queue.length > 0) {
      const filename = queue.shift()!;
      await loadImage(filename);
      await processNext();
    }
  };

  // Start N workers
  const workers = Array(CONCURRENCY_LIMIT).fill(null).map(processNext);
  await Promise.all(workers);
}

function gridToFilename(px: number, py: number): string {
  return `gaze_px${sanitize(px)}_py${sanitize(py)}_${SIZE}.webp`;
}

function setFromClient(clientX: number, clientY: number) {
  if (!containerRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const nx = (clientX - centerX) / (rect.width / 2);
  const ny = (centerY - clientY) / (rect.height / 2);

  const clampedX = clamp(nx, -1, 1);
  const clampedY = clamp(ny, -1, 1);

  const px = quantizeToGrid(clampedX);
  const py = quantizeToGrid(clampedY);

  const filename = gridToFilename(px, py);
  imageSrc.value = `${props.basePath}${filename}`;
  
  if (props.showDebug) {
    debugInfo.value = {
      mouseX: Math.round(clientX - rect.left),
      mouseY: Math.round(clientY - rect.top),
      filename
    };
  }
}

function handleMouseMove(e: MouseEvent) {
  setFromClient(e.clientX, e.clientY);
}

function handleTouchMove(e: TouchEvent) {
  if (e.touches && e.touches.length > 0) {
    const t = e.touches[0];
    setFromClient(t.clientX, t.clientY);
  }
}

function handleClick() {
  clickCount.value++;
  
  // Show toast messages at specific click counts with custom styling
  if (clickCount.value in clickMessages) {
    if (clickCount.value < 5) {
      toast.info(clickMessages[clickCount.value], {
        timeout: 5000,
      });
    } else if (clickCount.value >= 5 && clickCount.value <= 8) {
      toast.warning(clickMessages[clickCount.value], {
        timeout: 5000,
      });
    } else {
      toast.error(clickMessages[clickCount.value], {
        timeout: 5000,
      });
    }
  }

  // After 12 clicks, open pot.png in a new tab
  if (clickCount.value == 12) {
    window.open(potImage, '_blank');
    clickCount.value = 0; // reset counter
  }
}

// Lifecycle hooks
onMounted(() => {
  // Initialize at center
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect();
    setFromClient(rect.left, rect.top + rect.height / 2);
  }
  preloadImages();
  // Delay the start of tracking if specified
  setTimeout(() => {
    // Track pointer anywhere on the page
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

  }, props.startDelay);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('touchmove', handleTouchMove);
});
</script>

<template>
  <div ref="containerRef" class="face-tracker" @click="handleClick">
    <img 
      v-if="imageSrc" 
      :src="imageSrc" 
      class="face-image" 
      alt="Face following gaze"
    />
    <div v-if="showDebug" class="face-debug">
      Mouse: ({{ debugInfo.mouseX }}, {{ debugInfo.mouseY }})<br/>
      Image: {{ debugInfo.filename }}<br/>
      Clicks: {{ clickCount }}
    </div>
  </div>
</template>

<style scoped>
.face-tracker {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.face-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.1s ease-out;
  user-select: none;
  display: block;
}

.face-debug {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--palette-dark-blue);
  color: var(--palette-lightest-orange);
  padding: 8px 12px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.4;
}
</style>
