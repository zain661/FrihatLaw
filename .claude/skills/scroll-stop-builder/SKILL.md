---
name: scroll-stop-builder
description: >
  Takes a video file (e.g. a product deconstruction/assembly animation) and builds a
  beautiful, performant website with scroll-driven animation. The video plays forward/backward as the user
  scrolls, creating a mesmerizing scroll-stopping effect. Uses frame extraction via FFmpeg,
  canvas-based rendering, and modern scroll-driven animation techniques. Includes: animated
  starscape background, annotation cards with snap-stop scroll, specs section with count-up
  animations, navbar with scroll-to-pill transform, loader, and full mobile responsiveness.
  Trigger when the user says "scroll-stop build", "scroll animation website", "scroll-driven video",
  "build the scroll-stop site", or provides a video file and asks to make it scroll-controlled.
  Also trigger if the user mentions "Apple-style scroll animation" or "video on scroll".
---

# Scroll-Stop Builder Skill

You take a video file and build a production-quality website where the video playback is controlled by scroll position – creating a dramatic, Apple-style scroll-stopping effect.

Before building anything, you MUST gather information from the user through a brief interview.
Do not assume any brand names, colors, or content – everything is customized per project.

---

## Step 0: The Interview (MANDATORY)

Before touching any code or extracting any frames, ask the user these questions. Do not skip this step – the whole point of the skill is to build something tailored, not generic.

### Required Questions

Ask these in a natural, conversational way – not as a numbered interrogation:

* **Brand name** – "What's the brand or product name for this site?"
* **Logo** – "Do you have a logo file I can use? (SVG or PNG preferred)"
* **Accent color** – "What's your primary accent color? (hex code, or describe it and I'll suggest options)"
* **Background color** – "What background color do you want? (dark backgrounds work best for this effect)"
* **Overall vibe** – "What's the overall feel you're going for? (e.g., premium tech launch, luxury, playful, minimal, bold)"

### Content Sourcing

Ask the user how they want to provide the website content:

- **Option A: Based on an existing website** – "Is this based on an existing website? If so, share the URL and I'll pull the real content (product name, features, specs, copy) to populate the site."
- **Option B: Paste it in** – "If you don't have a website, you can paste in the content you'd like – product descriptions, feature lists, specs, testimonials, etc."

If the user provides a URL, use `WebFetch` to retrieve the page content and extract relevant copy, product details, feature descriptions, spec numbers, and any other usable content.

### Optional Sections

Ask whether the user wants these included:

- **Testimonials** – "Would you like a testimonials section? If so, provide the testimonials or I'll pull them from the website you shared."
- **Confetti** – "Want a confetti burst effect anywhere? (e.g., on CTA button click, on page load)"
- **Card Scanner** – "Want a 3D particle showcase section? (Three.js-based – good for showing off a card, device, or object)"

Only include these sections if the user explicitly opts in.

---

## Prerequisites

- **FFmpeg** must be installed (`brew install ffmpeg` if not)
- The user provides a video file (MP4, MOV, WebM, etc.)
- The video should be relatively short (3-10 seconds is ideal)
- **The first frame of the video MUST be on a white background.** This is a hard requirement – the opening shot should show the product/object clean on white. If the user's video doesn't start this way, let them know and ask for a re-export or a separate white-background image.

---

## Design System (Built from User's Answers)

Once the interview is complete, construct the design system from the user's answers:

- **Fonts**: Space Grotesk (headings), Archivo (body), JetBrains Mono (code/mono)
- **Accent color**: From user's answer (used for buttons, glows, progress bars, highlights)
- **Background color**: From user's answer (used for body, sections)
- **Text colors**: Derive from the background – if dark bg, use white primary + muted secondary; if light bg, use dark primary + muted secondary
- **Selection**: Accent color background with contrasting text
- **Scrollbar**: Dark track with gradient thumb using accent color, glow on hover
- **Cards**: Glass-morphism – semi-transparent bg, subtle border, `backdrop-filter: blur(20px)`, `border-radius: 20px`
- **Buttons**: Primary = accent color bg with contrasting text + accent glow; Secondary = transparent with white/dark border
- **Effects**: Floating background orbs (accent color tones, blurred), subtle grid overlay, animated starscape
- **Brand name & logo**: Used in navbar, footer, loader, and anywhere branding appears

---

## Technique: Frame Sequence + Canvas

The most reliable approach for scroll-driven video:

1. **Extract frames** from the video using FFmpeg
2. **Preload all frames** as images with a loading indicator
3. **Draw frames to a canvas** based on scroll position
4. The scroll position maps to a frame index – scrolling forward advances the video, scrolling backward reverses it

This is the same technique Apple uses for their product pages.

### Why not `<video>` with `currentTime`?

Browser video decoders aren't optimized for seeking on every scroll event. Canvas + extracted frames is buttery smooth and gives frame-perfect control.
