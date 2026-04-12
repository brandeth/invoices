# SplitText and Text Animation Patterns

## SplitText Plugin

SplitText splits text elements into individual characters, words, and/or lines, wrapping each in a `<div>` so they can be animated independently.

### Import and Registration

```ts
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);
```

### Creating a Split

```js
const split = SplitText.create(".hero-text", {
  type: "chars,words,lines",
});

// Access the split elements
split.chars; // array of character elements
split.words; // array of word elements
split.lines; // array of line elements
```

### Type Options

| Type      | Description                         | Access        |
| --------- | ----------------------------------- | ------------- |
| `"chars"` | Each character wrapped individually | `split.chars` |
| `"words"` | Each word wrapped individually      | `split.words` |
| `"lines"` | Each line wrapped individually      | `split.lines` |

Combine with commas: `"chars,words"`, `"words,lines"`, `"chars,words,lines"`

### SplitText.create() Options

```js
const split = SplitText.create(".text", {
  type: "chars,words,lines",
  charsClass: "char", // CSS class for character wrappers
  wordsClass: "word", // CSS class for word wrappers
  linesClass: "line", // CSS class for line wrappers
  tag: "span", // HTML tag for wrappers (default: "div")
  mask: "lines", // adds overflow:clip to line wrappers, hiding text that animates into view
});
```

---

## Common Text Animation Patterns

### Character-by-Character Reveal

```js
const split = SplitText.create(".heading", { type: "chars" });

gsap.from(split.chars, {
  y: 50,
  opacity: 0,
  duration: 0.6,
  stagger: 0.02,
  ease: "power3.out",
});
```

### Word Fade-In

```js
const split = SplitText.create(".paragraph", { type: "words" });

gsap.from(split.words, {
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.05,
  ease: "power2.out",
});
```

### Line Slide-Up (Masked Reveal)

Uses the `mask` option to clip overflow, creating a clean reveal from below:

```js
const split = SplitText.create(".heading", {
  type: "lines",
  mask: "lines",
});

gsap.from(split.lines, {
  yPercent: 100,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out",
});
```

### Character Scatter Effect

```js
const split = SplitText.create(".title", { type: "chars" });

gsap.from(split.chars, {
  opacity: 0,
  scale: 0,
  y: 80,
  rotationX: 180,
  transformOrigin: "0% 50% -50",
  duration: 0.8,
  stagger: 0.01,
  ease: "back.out(1.7)",
});
```

### Typewriter Effect

```js
const split = SplitText.create(".typewriter-text", { type: "chars" });

gsap.from(split.chars, {
  opacity: 0,
  duration: 0.05,
  stagger: 0.04,
  ease: "none",
});
```

---

## Text Animations with Timeline

### Hero Text Sequence

```js
const headingSplit = SplitText.create(".hero-heading", {
  type: "chars",
  mask: "lines",
});
const subtitleSplit = SplitText.create(".hero-subtitle", { type: "words" });

const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.from(headingSplit.chars, {
  yPercent: 100,
  duration: 0.8,
  stagger: 0.02,
})
  .from(
    subtitleSplit.words,
    {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.03,
    },
    "-=0.3",
  )
  .from(
    ".hero-cta",
    {
      opacity: 0,
      y: 20,
      duration: 0.5,
    },
    "-=0.2",
  );
```

### Text with ScrollTrigger

```js
const split = SplitText.create(".scroll-heading", {
  type: "chars,lines",
  mask: "lines",
});

gsap.from(split.chars, {
  yPercent: 100,
  opacity: 0,
  duration: 0.6,
  stagger: 0.02,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".scroll-heading",
    start: "top 80%",
    once: true,
  },
});
```

---

## Cleanup and Accessibility

### Reverting SplitText

SplitText modifies the DOM by wrapping text in additional elements. **Always revert SplitText when cleaning up** to restore the original DOM structure:

```vue
<script setup lang="ts">
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const containerRef = ref(null);
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    const split = SplitText.create(".heading", { type: "chars" });

    gsap.from(split.chars, {
      y: 50,
      opacity: 0,
      stagger: 0.02,
      duration: 0.6,
    });

    // SplitText instances inside gsap.context() are
    // automatically reverted when ctx.revert() is called
  }, containerRef.value!);
});

onUnmounted(() => {
  ctx.revert(); // Reverts SplitText DOM changes + kills animations
});
</script>
```

### Accessibility Considerations

- SplitText wraps text in `<div>` elements by default. Use `tag: "span"` for inline text to preserve semantic structure.
- Screen readers will read the split text as normal because the text content is preserved.
- Ensure animated text reaches its final visible state (full opacity, correct position) so content is accessible after animation completes.
- Avoid very long stagger delays that keep content invisible for too long.

---

## Full Vue/Nuxt Component Example

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    // Split the heading into characters with line masking
    const headingSplit = SplitText.create(".section-heading", {
      type: "chars,lines",
      mask: "lines",
    });

    // Split the paragraph into words
    const bodySplit = SplitText.create(".section-body", {
      type: "words",
    });

    // Create a timeline triggered by scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 70%",
        once: true,
      },
    });

    tl.from(headingSplit.chars, {
      yPercent: 100,
      duration: 0.7,
      stagger: 0.02,
      ease: "power3.out",
    }).from(
      bodySplit.words,
      {
        opacity: 0,
        y: 15,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.out",
      },
      "-=0.3",
    );
  }, sectionRef.value!);
});

onUnmounted(() => {
  ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="py-20">
    <h2 class="section-heading text-4xl font-bold">
      Animate Your Text Beautifully
    </h2>
    <p class="section-body mt-4 text-lg text-gray-600">
      SplitText makes it easy to create stunning character, word, and line
      animations with smooth staggered reveals and scroll-triggered effects.
    </p>
  </section>
</template>

<style scoped>
.section-heading,
.section-body {
  opacity: 0;
}
</style>
```

**Note:** The CSS `opacity: 0` prevents FOUC. GSAP will set the final opacity via animation. When `ctx.revert()` is called, inline styles are removed and the CSS rule applies — but by that point the component is unmounting anyway.

---

## Tips

- **Performance**: Character-level splits with many characters can be expensive. Use `"words"` or `"lines"` for large blocks of text.
- **Responsive**: SplitText calculates lines based on the current layout. If the viewport resizes, call `split.revert()` and re-split, or use `gsap.matchMedia()` to handle different breakpoints.
- **Nested splits**: You can split into lines first, then split each line's words or characters for more complex effects.
- **Mask**: The `mask: "lines"` option is the simplest way to achieve the popular "text reveals from below" effect without manual CSS overflow hidden.
