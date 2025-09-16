<!-- Format into **raw Markdown** :
- Title: `### <Utility Category>`
- **Learned:** one short key takeaway
- **Steps:** 3 or fewer bullet points
- Code in ```html``` block, clean & commented
- Output only raw Markdown, not rendered view
- Separate topics with `---` -->

### Border, Outline & Ring Utilities

**Learned:** Borders are part of the box model, outlines don't affect layout, and rings are perfect for focus states.

**Steps:**

- Use `border-*` for visible element boundaries
- Use `outline-*` for accessibility without layout shifts
- Use `ring-*` for modern focus indicators and emphasis

```html
<!-- BORDERS - Affect box model and layout -->
<div class="border border-gray-300">Basic border</div>
<div class="border-2 border-blue-500">Thick blue border</div>
<div class="border-t-4 border-red-500">Top border only</div>
<div class="rounded-lg border border-gray-200">Rounded with border</div>

<!-- OUTLINES - Don't affect layout, great for debugging -->
<button class="outline outline-2 outline-purple-500">Button with outline</button>
<div class="outline-dashed outline-red-400">Dashed outline</div>
<input class="focus:outline-none focus:ring-2">Remove default outline</input>

<!-- RINGS - Modern focus/hover effects -->
<button class="ring-2 ring-blue-500">Always visible ring</button>
<button class="focus:ring-4 focus:ring-green-300">Focus ring</button>
<button class="hover:ring-2 hover:ring-purple-400">Hover ring</button>
<div class="ring-inset ring-2 ring-gray-300">Inset ring</div>
```

---
