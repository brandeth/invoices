# ScrollTrigger Plugin Reference

## Import and Registration

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

---

## Using ScrollTrigger with Tweens

### Simple Trigger (Shorthand)

Pass a string selector as the `scrollTrigger` property to trigger when the element enters the viewport:

```js
gsap.to(".box", {
  scrollTrigger: ".box",
  x: 500,
  duration: 1,
});
```

### Full Configuration Object

```js
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    markers: true, // remove in production
  },
});
```

---

## Using ScrollTrigger with Timelines

```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "+=1000",
    scrub: 1,
    pin: true,
  },
});

tl.to(".element-a", { x: 300 })
  .to(".element-b", { y: 200 }, "-=0.3")
  .to(".element-c", { rotation: 360 });
```

---

## ScrollTrigger Configuration Properties

| Property              | Type                | Default                 | Description                                                            |
| --------------------- | ------------------- | ----------------------- | ---------------------------------------------------------------------- |
| `trigger`             | `string \| Element` | —                       | The element that triggers the animation                                |
| `start`               | `string`            | `"top bottom"`          | When the animation starts (trigger position, scroller position)        |
| `end`                 | `string`            | `"bottom top"`          | When the animation ends                                                |
| `scrub`               | `boolean \| number` | `false`                 | Link animation progress to scroll position. Number = smoothing seconds |
| `pin`                 | `boolean \| string` | `false`                 | Pin the trigger element during the scroll animation                    |
| `pinSpacing`          | `boolean \| string` | `true`                  | Add padding below pinned element to maintain page flow                 |
| `markers`             | `boolean`           | `false`                 | Show visual debug markers (remove in production)                       |
| `toggleActions`       | `string`            | `"play none none none"` | Actions for onEnter, onLeave, onEnterBack, onLeaveBack                 |
| `toggleClass`         | `string \| object`  | —                       | CSS class to toggle when trigger is active                             |
| `snap`                | `number \| object`  | —                       | Snap to specific progress values after scrolling stops                 |
| `once`                | `boolean`           | `false`                 | Kill the ScrollTrigger after the first trigger (one-time animation)    |
| `anticipatePin`       | `number`            | `0`                     | Anticipate pinning to reduce visual jitter                             |
| `fastScrollEnd`       | `boolean \| number` | `false`                 | Force the animation to the end state on fast scroll                    |
| `endTrigger`          | `string \| Element` | —                       | Use a different element for the end position                           |
| `scroller`            | `string \| Element` | `window`                | Custom scrollable container                                            |
| `horizontal`          | `boolean`           | `false`                 | Use horizontal scroll instead of vertical                              |
| `invalidateOnRefresh` | `boolean`           | `false`                 | Recalculate tween values on ScrollTrigger refresh                      |

---

## Start and End String Format

The `start` and `end` properties use a two-value string: `"triggerPosition scrollerPosition"`.

### Position Keywords

- `top` — top edge of the element
- `center` — center of the element
- `bottom` — bottom edge of the element

### Position Formats

| Format          | Example             | Description                                |
| --------------- | ------------------- | ------------------------------------------ |
| Keyword         | `"top center"`      | Trigger top meets scroller center          |
| Percentage      | `"top 80%"`         | Trigger top meets 80% from top of viewport |
| Offset          | `"top+=100 center"` | 100px below the trigger's top edge         |
| Pixel value     | `"200px 400px"`     | Absolute pixel positions                   |
| Relative length | `"+=500"`           | End 500px after start (for `end` only)     |

### Common Start/End Combinations

```js
// Element fades in when top hits 80% of viewport
start: "top 80%", end: "bottom 20%"

// Pin section from top of viewport through 500px of scroll
start: "top top", end: "+=500"

// Start when element center hits viewport center
start: "center center", end: "bottom top"

// Start 100px below element top
start: "top+=100 center"
```

---

## toggleActions

The `toggleActions` string defines four actions separated by spaces:

```
"onEnter onLeave onEnterBack onLeaveBack"
```

### Available Actions

| Action     | Description                              |
| ---------- | ---------------------------------------- |
| `play`     | Play the animation forward               |
| `pause`    | Pause the animation                      |
| `resume`   | Resume from the current position         |
| `reverse`  | Play the animation in reverse            |
| `restart`  | Restart the animation from the beginning |
| `reset`    | Reset to the starting state immediately  |
| `complete` | Jump to the end state immediately        |
| `none`     | Do nothing                               |

### Common toggleActions Combinations

```js
// Play on enter, reverse on leave (default feel)
toggleActions: "play none none reverse";

// Play once on enter, never reverse
toggleActions: "play none none none";

// Restart every time element enters viewport
toggleActions: "restart none none none";

// Play on enter, reset when leaving back
toggleActions: "play none none reset";

// Full control: play enter, pause leave, resume enter-back, reverse leave-back
toggleActions: "play pause resume reverse";
```

---

## Callbacks

```js
ScrollTrigger.create({
  trigger: ".section",
  start: "top center",
  end: "bottom center",
  onEnter: () => console.log("entered"),
  onLeave: () => console.log("left"),
  onEnterBack: () => console.log("entered back"),
  onLeaveBack: () => console.log("left back"),
  onUpdate: (self) => {
    console.log("progress:", self.progress.toFixed(2));
    console.log("direction:", self.direction); // 1 = forward, -1 = backward
    console.log("velocity:", self.getVelocity());
  },
  onToggle: (self) => {
    console.log("active:", self.isActive);
  },
  onRefresh: (self) => {
    // Called when ScrollTrigger recalculates positions
  },
});
```

---

## Standalone ScrollTrigger

Create a ScrollTrigger without an animation — useful for triggering callbacks or toggling classes:

```js
ScrollTrigger.create({
  trigger: ".section",
  start: "top center",
  end: "bottom center",
  toggleClass: "active",
  onEnter: () => {
    // Custom logic
  },
});
```

---

## `ScrollTrigger.batch()`

Efficient way to handle many elements as a coordinated group:

```js
ScrollTrigger.batch(".card", {
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 60,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
    });
  },
  onLeave: (elements) => {
    gsap.to(elements, { opacity: 0, y: -30 });
  },
  onEnterBack: (elements) => {
    gsap.to(elements, { opacity: 1, y: 0, stagger: 0.05 });
  },
  start: "top 85%",
});
```

`batch()` groups elements that enter the viewport around the same time and delivers them as an array, making staggered reveals efficient.

---

## Scrub

Link animation progress directly to the scroll position:

```js
// Boolean: direct 1:1 link
scrub: true;

// Number: smooth catch-up over N seconds
scrub: 1; // takes 1 second to catch up to scroll position
scrub: 0.5; // half-second smooth scrub
```

---

## Snap

Snap to specific progress values after the user stops scrolling:

```js
// Snap to nearest quarter
snap: 0.25

// Snap object for more control
snap: {
  snapTo: [0, 0.25, 0.5, 0.75, 1], // specific values
  duration: 0.3,                      // snap animation duration
  delay: 0.1,                         // delay before snapping
  ease: "power2.inOut"
}

// Snap to labeled sections
snap: {
  snapTo: "labels",
  duration: 0.5,
  ease: "power1.inOut"
}
```

---

## Vue/Nuxt Best Practices

### Register and Clean Up Properly

```vue
<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".reveal-item", {
      y: 80,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 75%",
        once: true, // animate only once
      },
    });
  }, sectionRef.value!);
});

onUnmounted(() => {
  ctx.revert(); // This also kills all ScrollTriggers in the context
});
</script>
```

### Refresh After Dynamic Content

If content changes dynamically (e.g., after data loads), refresh ScrollTrigger positions:

```js
// After DOM updates
await nextTick();
ScrollTrigger.refresh();
```

### Handling Route Changes in Nuxt

ScrollTrigger positions can become stale after navigation. If using persistent layouts:

```ts
// In a layout or page component
watch(
  () => route.fullPath,
  () => {
    nextTick(() => {
      ScrollTrigger.refresh();
    });
  },
);
```

---

## Utility Methods

```js
// Get all active ScrollTrigger instances
ScrollTrigger.getAll();

// Get a specific ScrollTrigger by id
ScrollTrigger.getById("myTrigger");

// Refresh all ScrollTrigger positions
ScrollTrigger.refresh();

// Kill all ScrollTriggers
ScrollTrigger.killAll();

// Disable/enable all ScrollTriggers
ScrollTrigger.disable();
ScrollTrigger.enable();

// Scroll to a specific trigger
ScrollTrigger.getById("myTrigger").scroll(500); // scroll to 500px
```
