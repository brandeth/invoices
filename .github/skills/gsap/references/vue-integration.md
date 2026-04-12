# GSAP Vue 3 / Nuxt Integration Patterns

## The `gsap.context()` Pattern (Required)

Every Vue/Nuxt component that uses GSAP **must** use `gsap.context()` for proper cleanup. This collects all animations created inside the callback and lets you revert them all at once.

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

const containerRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    // All animations here are scoped and collected
    gsap.from(".title", { y: 40, opacity: 0, duration: 0.8 });
    gsap.from(".content", { y: 20, opacity: 0, duration: 0.6, delay: 0.3 });
  }, containerRef.value!);
});

onUnmounted(() => {
  ctx.revert(); // Kills all animations and reverts inline styles
});
</script>

<template>
  <div ref="containerRef">
    <h1 class="title">Title</h1>
    <p class="content">Content</p>
  </div>
</template>
```

### Why `gsap.context()` Matters

- **Scoped selectors**: CSS selectors inside the context only match elements within the scope element, preventing cross-component conflicts.
- **Automatic collection**: Every tween, timeline, and ScrollTrigger created inside is tracked.
- **Clean revert**: `.revert()` kills all animations, reverts inline styles, and removes ScrollTriggers — preventing memory leaks and ghost animations.

---

## Using Template Refs with GSAP

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

const boxRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    // Use ref values directly as targets
    gsap.from(boxRef.value, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    });

    // Or query within the scoped container
    gsap.from(".list-item", {
      x: -30,
      opacity: 0,
      stagger: 0.1,
    });
  }, listRef.value!);
});

onUnmounted(() => {
  ctx.revert();
});
</script>

<template>
  <div ref="listRef">
    <div ref="boxRef" class="box">Box</div>
    <div class="list-item" v-for="i in 5" :key="i">Item {{ i }}</div>
  </div>
</template>
```

---

## SSR Considerations for Nuxt

GSAP manipulates the DOM directly and cannot run during server-side rendering. All GSAP code **must** be wrapped in `onMounted()`:

```vue
<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Plugin registration is safe at module level —
// it only registers, doesn't touch the DOM
gsap.registerPlugin(ScrollTrigger);

const containerRef = ref(null);
let ctx: gsap.Context;

// GSAP code MUST be inside onMounted for Nuxt SSR
onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".hero", { y: 80, opacity: 0, duration: 1 });
  }, containerRef.value);
});

onUnmounted(() => {
  ctx.revert();
});
</script>
```

**Do NOT:**

- Call `gsap.to()` / `gsap.from()` at the top level of `<script setup>`
- Use `gsap.set()` outside of `onMounted()`
- Access DOM elements before mount

---

## Prevent FOUC (Flash of Unstyled Content)

Since GSAP animations only run after mount in Nuxt, elements may briefly appear in their final state before animating. Prevent this with CSS:

```vue
<style scoped>
.hero-title,
.hero-subtitle {
  opacity: 0;
}
</style>
```

Or use `gsap.set()` at the beginning of your `onMounted` context:

```js
onMounted(() => {
  ctx = gsap.context(() => {
    gsap.set(".hero-title", { opacity: 0, y: 60 });
    gsap.to(".hero-title", { opacity: 1, y: 0, duration: 1, delay: 0.1 });
  }, containerRef.value);
});
```

---

## Composable Pattern for Reusable Animations

Create a composable to encapsulate the GSAP context lifecycle:

```ts
// composables/useGsapAnimation.ts
import { onUnmounted } from "vue";
import { gsap } from "gsap";

export function useGsapAnimation() {
  let ctx: gsap.Context;

  const initAnimations = (
    scope: Element,
    fn: (context: gsap.Context) => void,
  ) => {
    ctx = gsap.context((self) => {
      fn(self);
    }, scope);
  };

  onUnmounted(() => ctx?.revert());

  return { initAnimations };
}
```

Usage in a component:

```vue
<script setup lang="ts">
import { gsap } from "gsap";

const containerRef = ref(null);
const { initAnimations } = useGsapAnimation();

onMounted(() => {
  initAnimations(containerRef.value!, () => {
    gsap.from(".fade-in", { opacity: 0, y: 30, stagger: 0.1 });
  });
});
</script>
```

### Animation-Specific Composable

```ts
// composables/useHeroAnimation.ts
import { gsap } from "gsap";

export function useHeroAnimation() {
  let ctx: gsap.Context;

  const animate = (scope: Element) => {
    ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-heading", { y: 100, opacity: 0, duration: 1.2 })
        .from(".hero-subtitle", { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-cta", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4");
    }, scope);
  };

  onUnmounted(() => ctx?.revert());

  return { animate };
}
```

---

## Watching Reactive Data and Triggering Animations

Animate in response to reactive changes:

```vue
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

const count = ref(0);
const counterRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {}, counterRef.value!);
});

watch(count, (newVal, oldVal) => {
  // Add animation to existing context
  ctx.add(() => {
    gsap.from(counterRef.value, {
      scale: 1.5,
      duration: 0.3,
      ease: "back.out(2)",
    });
  });
});

onUnmounted(() => {
  ctx.revert();
});
</script>
```

**Key:** Use `ctx.add()` to add animations to an existing context after initial creation. This ensures they are still collected for cleanup.

---

## GSAP with Vue `<Transition>` Component

Use GSAP for JavaScript-driven transitions:

```vue
<template>
  <Transition @enter="onEnter" @leave="onLeave" :css="false">
    <div v-if="show" class="modal">Modal Content</div>
  </Transition>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

const show = ref(false);

function onEnter(el: Element, done: () => void) {
  gsap.from(el, {
    opacity: 0,
    scale: 0.8,
    y: 30,
    duration: 0.5,
    ease: "back.out(1.7)",
    onComplete: done,
  });
}

function onLeave(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 0,
    scale: 0.8,
    y: -30,
    duration: 0.3,
    ease: "power2.in",
    onComplete: done,
  });
}
</script>
```

**Important:** Set `:css="false"` to tell Vue to skip CSS-based transition detection and rely entirely on the JavaScript hooks.

---

## GSAP with `<TransitionGroup>`

For staggered list animations:

```vue
<template>
  <TransitionGroup @enter="onEnter" @leave="onLeave" :css="false">
    <div v-for="item in items" :key="item.id" :data-index="item.index">
      {{ item.name }}
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

function onEnter(el: Element, done: () => void) {
  const index = (el as HTMLElement).dataset.index || 0;
  gsap.from(el, {
    opacity: 0,
    y: 30,
    duration: 0.4,
    delay: Number(index) * 0.1, // stagger based on index
    ease: "power2.out",
    onComplete: done,
  });
}

function onLeave(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: "power2.in",
    onComplete: done,
  });
}
</script>
```

---

## Nuxt Plugin Approach for Global Registration

If multiple components use the same GSAP plugins, register them once via a Nuxt plugin:

```ts
// plugins/gsap.client.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  };
});
```

**Note the `.client.ts` suffix** — this ensures the plugin only runs on the client side, where the DOM is available. Components can then import GSAP directly without re-registering plugins.

---

## Summary of Rules

1. **Always** use `gsap.context()` scoped to a container ref
2. **Always** call `ctx.revert()` in `onUnmounted()`
3. **Always** put GSAP code inside `onMounted()` for Nuxt SSR
4. Register plugins at module level, not inside lifecycle hooks
5. Use `ctx.add()` when adding animations after initial setup
6. Use `:css="false"` when combining GSAP with Vue `<Transition>`
7. Use `.client.ts` suffix for Nuxt plugins that touch the DOM
8. Set initial hidden states via CSS to prevent FOUC in SSR
