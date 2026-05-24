# main.js — Portfolio Script Documentation

A breakdown of every feature module in `main.js` for the personal portfolio site.

---

## 1. Loader Animation

Simulates a loading progress bar on page start.

- Increments a percentage counter randomly every 120ms until it reaches 100%.
- Once the page fully loads, waits 2.1 seconds then hides the loader overlay and marks `<body>` as `loaded`.

---

## 2. Cursor Glow

Creates a smooth, lagging glow effect that follows the mouse cursor.

- Tracks the real mouse position (`mx`, `my`).
- On every animation frame, the glow element eases toward the cursor at 12% speed — giving it a soft trailing feel.

---

## 3. Particle Network (Canvas)

Draws an animated network of floating dots connected by lines on a fullscreen `<canvas>`.

- Particle count scales with screen width (max 80).
- Each particle moves slowly and bounces off canvas edges.
- Particles within 130px of each other are connected by a fading line.
- Automatically resizes and reinitialises on window resize.

---

## 4. Header Scroll Behaviour

- Adds a `.scrolled` class to the header after scrolling past 40px (for a background/shadow effect).
- Shows a "Back to Top" button after scrolling past 500px.
- Clicking the button smoothly scrolls back to the top.

---

## 5. Mobile Navigation

Toggles the mobile menu open/closed when the hamburger button is clicked.

- Adds/removes `.open` on both the button and the nav overlay.
- Automatically closes the menu when any nav link is tapped.

---

## 6. Active Navigation Spy

Highlights the correct nav link based on which section is currently in view.

- Uses `IntersectionObserver` with a vertical root margin of ±45% to detect the "middle" section.
- Toggles an `.active` class on the matching anchor link.

---

## 7. Typewriter Effect

Cycles through a list of phrases, typing and deleting them in a loop.

```
Phrases:
  " Building secure DevOps tools."
  " Exploring ethical hacking."
  " Creating AI assistants."
  " Tracking habits with my own app."
  " Leading teams at LMV System Company."
  " Freelance web developer for hire."
  " Building AI chatbots with PHP."
  " Designing with code & creativity."
```

- Types each character at ~45ms, then pauses 1.8s at full phrase.
- Deletes each character at ~28ms, then pauses 400ms before the next phrase.
- Starts after a 2.4s delay (after the loader clears).

---

## 8. Mask Word Rotation

Rotates through a set of identity words inside a highlighted/masked element every 3.2 seconds.

```
Words: DEVELOPER · HACKER · CREATOR · BUILDER · STUDENT
```

- Fades out the current word, swaps text, then fades back in.
- The element gains a `.show` class when it first scrolls into view.

---

## 9. Reveal on Scroll

Animates elements with the `.reveal` class as they enter the viewport.

- Uses `IntersectionObserver` with a 12% threshold and a 40px bottom margin.
- Adds `.visible` class with a staggered delay (70ms per element) for a cascade effect.
- Each element is unobserved after it animates (fires once only).

---

## 10. Animated Skill Bars

Fills progress bars to their target level when the skill section scrolls into view.

- Each `.skill-item` element carries a `data-level` attribute (0–100).
- On intersection, sets the inner `.fill` element's width to that percentage.

---

## 11. Animated Stat Counters

Counts numbers up from 0 to their target value over 1.6 seconds.

- Uses an ease-out cubic curve for a natural deceleration effect.
- Triggered once when the `.stats` container enters the viewport.
- Target values are read from each element's `data-count` attribute.

---

## 12. Tech Orbit Badges

Dynamically generates floating technology label badges inside `#techOrbit`.

```
Labels: HTML, CSS, JS, AJAX, React, Flask, Cloud,
        Python, MySQL, Networking, ChatGPT, Git
```

- Each badge is positioned and given a staggered animation delay for a drifting, orbiting feel.

---

## 13. 3D Hero Scene & Parallax

Gives the hero section a responsive 3D tilt effect driven by mouse movement.

- Tracks normalised mouse position (–1 to +1 on each axis).
- Smoothly interpolates (`smoothX/Y`) toward the target at 8% per frame.
- `#scene3dInner` rotates up to ±28° (Y) / ±22° (X).
- `#heroContent3d` rotates subtly at ±2° / ±1.5° for depth layering.
- On scroll, the scene translates downward at 15% of scroll offset (parallax).

---

## 14. Reusable `bindTilt3D` Helper

A utility applied to `.tilt-3d` and `[data-tilt]` elements for card-level 3D hover tilt.

| Selector     | Intensity | Lift  |
|--------------|-----------|-------|
| `.tilt-3d`   | 8°        | 10px  |
| `[data-tilt]`| 14°       | 18px  |

- On `mousemove`: calculates offset from card centre, applies `perspective(900px) rotateY rotateX translateZ`.
- On `mouseleave`: resets transform.

---

## 15. Contact Form

Handles form submission by composing a `mailto:` link.

- Reads `name`, `email`, and `message` fields from the form.
- Opens the user's default email client addressed to `vishnussv25@gmail.com`.
- Displays a toast notification: *"Opening your email client..."*
- Resets the form after submission.

---

## 16. Toast Notifications

A lightweight notification utility used internally.

- Sets the `#toast` element's text and adds `.show`.
- Automatically removes `.show` after 3.2 seconds.

---

## 17. Magnetic Buttons

Adds a subtle magnetic pull effect to all `.btn` elements.

- On `mousemove`: shifts the button up to 12% of the cursor's offset from the button centre.
- On `mouseleave`: resets transform to original position.

---

## Summary

| Module | Technique |
|---|---|
| Loader | `setInterval` + `classList` |
| Cursor Glow | `requestAnimationFrame` lerp |
| Particles | Canvas 2D API |
| Header Scroll | `scroll` event + `classList.toggle` |
| Mobile Nav | `click` toggle |
| Nav Spy | `IntersectionObserver` |
| Typewriter | Recursive `setTimeout` |
| Mask Words | `setInterval` + fade |
| Scroll Reveal | `IntersectionObserver` + stagger |
| Skill Bars | `IntersectionObserver` + CSS width |
| Counters | `requestAnimationFrame` + easing |
| Tech Badges | Dynamic DOM generation |
| 3D Parallax | Mouse tracking + `requestAnimationFrame` |
| Card Tilt | Per-element mouse transform |
| Contact Form | `mailto:` URL construction |
| Toast | Timed `classList` toggle |
| Magnetic Btns | `mousemove` transform offset |
