---
name: gsap
description: "Implement GSAP animations in Vue/Nuxt components. Use when: adding entrance animations, scroll-triggered animations, text reveal effects, timeline sequences, hero section animations, staggered animations, or any DOM animation using GSAP library. Covers gsap.to(), gsap.from(), gsap.fromTo(), gsap.timeline(), ScrollTrigger, SplitText, and proper Vue/Nuxt lifecycle cleanup."
argument-hint: "Describe the animation effect you want to implement"
---

# GSAP Animation Skill for Vue/Nuxt

## Installation

```bash
npm install gsap
```

```ts
import { gsap } from "gsap";
```

Register plugins at module level (outside component lifecycle):

```ts
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
```

All plugins are free and available on npm as of GSAP 3.13+. No special license or separate install is needed.

---

## Core Concepts

### Tweens

Single animations that change properties over time:

- **`gsap.to(targets, vars)`** — animate TO the given values
- **`gsap.from(targets, vars)`** — animate FROM the given values (starts at `vars`, ends at current state)
- **`gsap.fromTo(targets, fromVars, toVars)`** — define both start and end values
- **`gsap.set(targets, vars)`** — immediately set values (zero-duration tween, no animation)

### Timeline

`gsap.timeline()` sequences multiple animations with precise control:

```js
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
tl.from(".heading", { y: 100, opacity: 0, duration: 1.2 })
  .from(".subtitle", { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
  .from(".cta", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4");
```

### Position Parameter

Controls when an animation starts within a timeline:

| Value       | Meaning                                |
| ----------- | -------------------------------------- |
| `"+=1"`     | 1 second after the end of the timeline |
| `"-=0.5"`   | Overlap by 0.5 seconds                 |
| `"<"`       | Start of the most recently-added tween |
| `">"`       | End of the most recently-added tween   |
| `"<0.5"`    | 0.5s after start of previous tween     |
| `3`         | Absolute time at 3 seconds             |
| `"myLabel"` | At the label position                  |

### Stagger

Animate multiple elements with time offsets:

```js
gsap.from(".card", {
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15, // 0.15s between each element
  ease: "power2.out",
});
```

Stagger also accepts an object for advanced control:

```js
stagger: {
  each: 0.1,
  from: "center", // "start", "end", "center", "edges", "random", or index
  grid: "auto",
  axis: "x"
}
```

### Eases

Common easing values:

- `"power1.out"`, `"power2.inOut"`, `"power3.out"`, `"power4.out"`
- `"elastic"`, `"elastic.out(1, 0.3)"`
- `"back"`, `"back.out(1.7)"`
- `"bounce"`, `"bounce.out"`
- `"sine.inOut"`
- `"expo.out"`
- `"circ.out"`
- `"none"` (linear)
- `"steps(5)"` (stepped)

Default ease is `"power1.out"`.

---

## Vue/Nuxt Integration Pattern (CRITICAL)

This is the required pattern for using GSAP in any Vue 3 or Nuxt component:

```vue
<script setup>
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const containerRef = ref(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // All GSAP animations go here
    // They are automatically collected for cleanup
    gsap.from(".hero-title", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
  }, containerRef.value) // scope to component root
})

onUnmounted(() => {
  ctx.revert() // Clean up all animations
})
</script>

<template>
  <div ref="containerRef">
    <h1 class="hero-title">Hello</h1>
  </div>
</template>
```

### Key Rules

1. **ALWAYS** use `gsap.context()` for cleanup in Vue/Nuxt
2. **ALWAYS** call `ctx.revert()` in `onUnmounted()`
3. Use template refs or scoped selectors inside the context
4. Register plugins **OUTSIDE** of component lifecycle (at module level)
5. For **Nuxt SSR**: wrap GSAP code in `onMounted()` only — GSAP needs the DOM and cannot run on the server

---

## Common Animation Patterns

### Hero Entrance Animation

```js
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
tl.from(".hero-heading", { y: 100, opacity: 0, duration: 1.2 })
  .from(".hero-subtitle", { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
  .from(".hero-cta", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4");
```

### Staggered List/Grid Reveal

```js
gsap.from(".card", {
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: "power2.out",
  scrollTrigger: { trigger: ".cards-grid", start: "top 80%" },
});
```

### Text Reveal with SplitText

```js
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const split = SplitText.create(".hero-text", { type: "chars,words,lines" });
gsap.from(split.chars, {
  y: 50,
  opacity: 0,
  duration: 0.6,
  stagger: 0.02,
  ease: "power3.out",
});
```

---

## ScrollTrigger Basics

```js
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Simple trigger
gsap.to(".box", {
  scrollTrigger: ".box", // trigger when element enters viewport
  x: 500,
});

// Advanced with pinning and scrub
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".section",
      start: "top top",
      end: "+=500",
      scrub: 1,
      pin: true,
      markers: true, // remove in production
    },
  })
  .to(".element", { x: 200 })
  .to(".element", { rotation: 360 });
```

---

## Timeline Features

- **`defaults`** — set shared properties for all child tweens
- **Position parameter** — `"<"` = start of previous, `">"` = end of previous, numbers = absolute time
- **Nesting** — nest timelines inside timelines for modular code
- **Playback control** — `.pause()`, `.play()`, `.reverse()`, `.restart()`, `.seek()`
- **Repeat** — `repeat: -1` for infinite, `yoyo: true` to alternate, `repeatDelay` for gaps

---

## GSAP Homepage Hero Analysis

The GSAP homepage hero ("Animate anything") uses these techniques:

1. **Large serif typography** with dramatic scale — oversized heading with high contrast (cream on black)
2. **Staggered text entrance** — words/characters animate in sequentially using timeline with offsets
3. **Decorative animated elements** — gradient icon (flower/pinwheel) and 3D liquid/blob element animated with rotation, scale, and floating effects
4. **Timeline orchestration** — all elements are sequenced in a master timeline with overlapping position parameters (`"-=0.5"` etc.) for a cohesive feel
5. **Easing** — organic, smooth eases like `power3.out` or `power4.out` for the text, and `sine.inOut` for looping decorative animations

### Recreating a Similar Effect

```js
const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

// Heading characters animate up from below with stagger
tl.from(".hero-heading", {
  y: 120,
  opacity: 0,
  duration: 1.4,
  ease: "power4.out",
})
  // Decorative element fades in and scales
  .from(
    ".hero-decoration",
    {
      scale: 0,
      opacity: 0,
      rotation: -180,
      duration: 1,
      ease: "back.out(1.7)",
    },
    "-=1",
  )
  // Subtitle slides up
  .from(
    ".hero-subtitle",
    {
      y: 40,
      opacity: 0,
      duration: 0.8,
    },
    "-=0.5",
  )
  // CTA buttons
  .from(
    ".hero-cta > *",
    {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
    },
    "-=0.3",
  );

// Continuous floating animation for decorative element
gsap.to(".hero-decoration", {
  y: -15,
  duration: 2,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
});
```

---

## Important Notes

- **GSAP is free for everyone** (all plugins included) as of version 3.13+
- **Always clean up** with `gsap.context()` + `.revert()` in Vue/Nuxt
- **Nuxt SSR** — GSAP code MUST be in `onMounted()` (no SSR for DOM animations)
- Use `will-change: transform` sparingly, only when needed for performance
- **Avoid animating layout properties** (`width`, `height`, `top`, `left`) — prefer `transform` and `opacity` for 60fps performance
- **Set initial states** with `gsap.set()` or CSS to avoid FOUC (Flash of Unstyled Content)
- See the reference files for detailed API docs on [core-api](references/core-api.md), [vue-integration](references/vue-integration.md), [scroll-trigger](references/scroll-trigger.md), and [text-animations](references/text-animations.md)
