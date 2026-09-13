/// <reference types="vite/client" />

// The package ships types, but its package.json "exports" map hides them from TypeScript.
declare module '@jamescoyle/vue-icon' {
  import type { DefineComponent } from 'vue';
  const SvgIcon: DefineComponent<{ type: string; path: string; size?: number | string }>;
  export default SvgIcon;
}
