# GSAP Core API Reference

## Tween Methods

### `gsap.to(targets, vars)`

Animate targets TO the specified values.

```js
gsap.to(".box", {
  x: 200,
  rotation: 360,
  duration: 1,
  ease: "power2.out",
});
```

### `gsap.from(targets, vars)`

Animate targets FROM the specified values to their current state.

```js
gsap.from(".box", {
  y: 100,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
});
```

### `gsap.fromTo(targets, fromVars, toVars)`

Define both start and end values explicitly.

```js
gsap.fromTo(
  ".box",
  { x: -100, opacity: 0 },
  { x: 200, opacity: 1, duration: 1, ease: "power2.inOut" },
);
```

### `gsap.set(targets, vars)`

Immediately set values with no animation (zero-duration tween). Useful for setting initial states to prevent FOUC.

```js
gsap.set(".box", { opacity: 0, y: 50 });
```

### `gsap.timeline(vars)`

Create a timeline for sequencing multiple animations.

```js
const tl = gsap.timeline({
  defaults: { duration: 0.8, ease: "power2.out" },
  paused: true,
  repeat: -1,
  yoyo: true,
});

tl.to(".box1", { x: 200 })
  .to(".box2", { y: 100 }, "-=0.4")
  .to(".box3", { rotation: 360 }, "<");
```

### `gsap.context(fn, scope)`

Collect all animations created inside the function for easy bulk cleanup. Essential for Vue/Nuxt components.

```js
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 200 });
  gsap.from(".title", { opacity: 0 });
}, containerElement); // scope selectors to this element

// Later, clean up everything:
ctx.revert();
```

### `gsap.registerPlugin(...plugins)`

Register GSAP plugins before use.

```js
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
```

---

## Common `vars` Properties

### Animation Control

| Property          | Type                | Default        | Description                             |
| ----------------- | ------------------- | -------------- | --------------------------------------- |
| `duration`        | `number`            | `0.5`          | Duration in seconds                     |
| `delay`           | `number`            | `0`            | Delay before animation starts (seconds) |
| `ease`            | `string`            | `"power1.out"` | Easing function                         |
| `stagger`         | `number \| object`  | —              | Time offset between multiple targets    |
| `repeat`          | `number`            | `0`            | Number of repeats (`-1` for infinite)   |
| `yoyo`            | `boolean`           | `false`        | Alternate direction on each repeat      |
| `repeatDelay`     | `number`            | `0`            | Delay between repeats (seconds)         |
| `paused`          | `boolean`           | `false`        | Create in a paused state                |
| `overwrite`       | `boolean \| "auto"` | `false`        | How to handle conflicting tweens        |
| `immediateRender` | `boolean`           | varies         | Render immediately on creation          |

### Callbacks

| Callback            | Description                             |
| ------------------- | --------------------------------------- |
| `onComplete`        | Called when the animation finishes      |
| `onStart`           | Called when the animation begins        |
| `onUpdate`          | Called on every frame during animation  |
| `onRepeat`          | Called each time the animation repeats  |
| `onReverseComplete` | Called when reversed playback completes |

Each callback has a corresponding `Params` property (e.g., `onCompleteParams: [arg1, arg2]`).

### CSS Transform Properties

These are shorthand for CSS transforms, animated via the GSAP transform component for optimal performance:

| Property          | Description      | Unit    |
| ----------------- | ---------------- | ------- |
| `x`               | Translate X      | px      |
| `y`               | Translate Y      | px      |
| `xPercent`        | Translate X      | %       |
| `yPercent`        | Translate Y      | %       |
| `rotation`        | Rotate (2D)      | degrees |
| `rotationX`       | Rotate X (3D)    | degrees |
| `rotationY`       | Rotate Y (3D)    | degrees |
| `scale`           | Scale both axes  | ratio   |
| `scaleX`          | Scale X          | ratio   |
| `scaleY`          | Scale Y          | ratio   |
| `skewX`           | Skew X           | degrees |
| `skewY`           | Skew Y           | degrees |
| `transformOrigin` | Transform origin | string  |

### CSS Properties

Any CSS property can be animated. Common ones:

- `opacity`
- `backgroundColor`
- `borderRadius`
- `color`
- `fontSize`
- `width`, `height` (prefer `scale` for performance)
- `padding`, `margin`
- `boxShadow`
- `clipPath`

**Performance note:** Prefer animating `transform` properties (`x`, `y`, `scale`, `rotation`) and `opacity` over layout-triggering properties (`width`, `height`, `top`, `left`, `margin`).

---

## Timeline Position Parameter Reference

The position parameter (second argument to timeline methods) controls when animations start within a timeline:

```js
const tl = gsap.timeline();

tl.to(".a", { x: 100 }) // starts at time 0
  .to(".b", { y: 100 }, "+=1") // 1s after end of timeline
  .to(".c", { rotation: 360 }, "-=0.5") // overlap by 0.5s
  .to(".d", { scale: 2 }, "<") // same start as previous tween
  .to(".e", { opacity: 0 }, ">") // after previous tween ends
  .to(".f", { x: 200 }, "<0.5") // 0.5s after previous tween starts
  .to(".g", { y: 200 }, 3) // absolute time: 3 seconds
  .addLabel("midpoint") // add a label
  .to(".h", { scale: 0.5 }, "midpoint") // at the label
  .to(".i", { x: 300 }, "midpoint+=2"); // 2s after the label
```

### Quick Reference

| Value          | Meaning                                |
| -------------- | -------------------------------------- |
| `"+=1"`        | 1 second after end of timeline         |
| `"-=0.5"`      | Overlap by 0.5 seconds                 |
| `"<"`          | Start of most recently-added animation |
| `">"`          | End of most recently-added animation   |
| `"<0.5"`       | 0.5s after start of previous animation |
| `">0.5"`       | 0.5s after end of previous animation   |
| `3`            | Absolute time at 3 seconds             |
| `"myLabel"`    | At `myLabel` position                  |
| `"myLabel+=2"` | 2 seconds after `myLabel`              |

---

## Easing Reference

### Power Eases

Increase intensity from `power1` (subtle) to `power4` (dramatic):

- `"power1.in"`, `"power1.out"`, `"power1.inOut"`
- `"power2.in"`, `"power2.out"`, `"power2.inOut"`
- `"power3.in"`, `"power3.out"`, `"power3.inOut"`
- `"power4.in"`, `"power4.out"`, `"power4.inOut"`

### Special Eases

| Ease         | Description                           | Configurable          |
| ------------ | ------------------------------------- | --------------------- |
| `"none"`     | Linear, constant speed                | —                     |
| `"elastic"`  | Spring-like overshoot and oscillation | `elastic.out(1, 0.3)` |
| `"back"`     | Slight overshoot then settle          | `back.out(1.7)`       |
| `"bounce"`   | Bouncing ball effect                  | —                     |
| `"circ"`     | Circular motion curve                 | —                     |
| `"expo"`     | Exponential acceleration/deceleration | —                     |
| `"sine"`     | Sine-wave based, very smooth          | —                     |
| `"steps(n)"` | Stepped animation with `n` steps      | —                     |

### Ease Suffixes

- **`.out`** (default) — starts fast, decelerates. Best for entrance animations.
- **`.in`** — starts slow, accelerates. Best for exit animations.
- **`.inOut`** — slow at both ends. Best for transitions between states.

---

## Stagger Object

For fine-grained control over staggered animations:

```js
gsap.from(".item", {
  y: 50,
  opacity: 0,
  duration: 0.6,
  stagger: {
    each: 0.1, // time between each element
    from: "center", // "start", "end", "center", "edges", "random", or index number
    grid: "auto", // auto-detect grid layout
    axis: "x", // stagger along "x" or "y" axis in grids
    ease: "power2.in", // ease the stagger distribution itself
  },
});
```

---

## Tween Control Methods

Tweens and timelines share these playback control methods:

```js
const tween = gsap.to(".box", { x: 200, paused: true });

tween.play(); // play forward
tween.pause(); // pause at current position
tween.reverse(); // play in reverse
tween.restart(); // restart from beginning
tween.seek(0.5); // jump to 0.5 seconds
tween.progress(0.5); // jump to 50% progress
tween.timeScale(2); // double speed
tween.kill(); // destroy the tween
```

---

## `gsap.matchMedia()`

Create responsive, media-query-driven animations:

```js
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  // Desktop animations
  gsap.to(".sidebar", { x: 0, duration: 0.5 });
});

mm.add("(max-width: 767px)", () => {
  // Mobile animations
  gsap.to(".sidebar", { y: 0, duration: 0.5 });
});

// Clean up
mm.revert();
```
