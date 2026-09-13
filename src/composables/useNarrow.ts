import { ref, onMounted, onBeforeUnmount } from 'vue';

// The single "narrow" condition used by every layout decision on the site.
// Phones in portrait, tablets, and any short viewport (phones in landscape)
// get the stacked layout with the top bar. Keep in sync with the CSS
// media queries that use the same expression.
export const NARROW_QUERY = '(max-width: 768px), (max-height: 520px)';

export function useNarrow() {
  const query = window.matchMedia(NARROW_QUERY);
  const isNarrow = ref(query.matches);
  const onChange = (e: MediaQueryListEvent) => { isNarrow.value = e.matches; };
  onMounted(() => query.addEventListener('change', onChange));
  onBeforeUnmount(() => query.removeEventListener('change', onChange));
  return isNarrow;
}
