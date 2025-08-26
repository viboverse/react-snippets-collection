<!-- Format into **raw Markdown** :
- Title: `### <Utility Category>`
- **Learned:** one short key takeaway
- **Steps:** 3 or fewer bullet points
- Code in ```html``` block, clean & commented
- Output only raw Markdown, not rendered view
- Separate topics with `---` -->

### Styling & Color System

**Learned:** Tailwind uses predictable naming: `{property}-{color}-{intensity}` where intensity ranges from 50 (lightest) to 950 (darkest).

**Steps:**

- Use `bg-` for background, `text-` for text color
- Combine with intensity numbers: 100 (light), 500 (medium), 900 (dark)
- Add hover states with `hover:` prefix

```html
<!-- Basic color system: bg-{color}-{intensity} -->
<button class="bg-blue-500 text-white hover:bg-blue-700">
  Blue Button (500 → 700 on hover)
</button>

<!-- Alert with color coordination -->
<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
  ⚠️ Error: Coordinated red color scheme (100/400/700)
</div>

<!-- Custom color combinations -->
<div class="bg-purple-500 text-yellow-200 p-4">
  High contrast: Purple background + Yellow text
</div>

/* 🎨 Color Intensity Scale: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
950 └─ Light ────────────── Medium ──────────── Dark ─┘ */
```

---

### Spacing & Sizing System

**Learned:** Tailwind uses a 4px base unit system where each number represents multiples of 4px (except for specific values).

**Steps:**

- Use `p-` for padding, `m-` for margin, `w-` for width, `h-` for height
- Numbers represent 4px units: `p-4` = 16px padding
- Use fractions for flexible layouts: `w-1/2` = 50% width

```html
<!-- Spacing system: each unit = 4px -->
<div class="w-64 h-32 m-4 p-6 bg-gray-200">
  w-64 (256px) × h-32 (128px) m-4 (16px margin) + p-6 (24px padding)
</div>

<!-- Responsive sizing with fractions -->
<div class="w-full md:w-1/2 lg:w-1/3 p-4">
  Full width → Half → Third (responsive)
</div>

<!-- Space between children -->
<div class="space-y-4">
  <p>Paragraph 1</p>
  <p>Paragraph 2 (16px gap above)</p>
  <p>Paragraph 3 (16px gap above)</p>
</div>

/* 📏 Spacing Scale: 0.5 = 2px, 1 = 4px, 2 = 8px, 3 = 12px, 4 = 16px 6 = 24px, 8
= 32px, 12 = 48px, 16 = 64px 🔄 Fractions: 1/2, 1/3, 2/3, 1/4, 3/4, 1/5, etc. */
```

---

### Typography & Text Control

**Learned:** Typography classes control size, weight, and appearance with predictable scaling from xs to 9xl.

**Steps:**

- Use `text-{size}` for font sizes (xs, sm, base, lg, xl, 2xl, etc.)
- Add `font-{weight}` for boldness (light, normal, medium, semibold, bold)
- Control text behavior with `select-` utilities

```html
<!-- Typography scale -->
<p class="text-xs font-light">Extra Small Light (12px)</p>
<p class="text-base font-normal">Base Normal (16px)</p>
<p class="text-lg font-medium">Large Medium (18px)</p>
<p class="text-2xl font-bold">2XL Bold (24px)</p>

<!-- Text selection control -->
<div class="space-y-4">
  <p class="select-text">Normal text (default selection)</p>
  <p class="select-all">Click once to select all</p>
  <p class="select-none">Cannot be selected</p>
</div>

<!-- ID display with smart selection -->
<div class="font-mono">
  <p class="font-bold">Workflow ID:</p>
  <p class="select-all bg-gray-100 p-2 rounded">
    550e8400-e29b-41d4-a716-446655440000
  </p>
  <p class="text-sm text-gray-500">☝️ One click selects entire ID</p>
</div>

/* 📝 Text Scale: xs(12px) sm(14px) base(16px) lg(18px) xl(20px) 2xl(24px)
3xl(30px) 4xl(36px) 5xl(48px) 6xl(60px) 7xl(72px) 8xl(96px) 9xl(128px) 💪 Font
Weights: thin(100) light(300) normal(400) medium(500) semibold(600) bold(700)
extrabold(800) black(900) */
```

---

### Flexbox Layout Essentials

**Learned:** Flexbox has two axes: main (justify) and cross (items). Most layouts need `justify-center` and `items-center`.

**Steps:**

- Use `flex` to enable flexbox, then control alignment
- `justify-` controls main axis (horizontal by default)
- `items-` controls cross axis (vertical by default)

```html
<!-- Perfect centering (most common pattern) -->
<div class="flex justify-center items-center h-32 bg-gray-100">
  <button class="bg-blue-500 text-white px-4 py-2 rounded">
    Perfectly Centered
  </button>
</div>

<!-- Main axis distribution -->
<div class="flex justify-between bg-gray-200 p-4">
  <div class="bg-blue-500 p-2 text-white">Left</div>
  <div class="bg-green-500 p-2 text-white">Center</div>
  <div class="bg-red-500 p-2 text-white">Right</div>
</div>

<!-- Responsive flex direction -->
<div class="flex flex-col md:flex-row gap-4 p-4">
  <div class="bg-purple-500 p-4 text-white">Stack on mobile</div>
  <div class="bg-orange-500 p-4 text-white">Row on desktop</div>
</div>

/* 🧭 Flexbox Memory Aid: • flex = Enable flexbox • justify-center = Center on
main axis (horizontal) • items-center = Center on cross axis (vertical) • gap-4
= Space between items (16px) 📱 Common Patterns: • justify-center items-center =
Perfect center • justify-between = Space items apart • flex-col md:flex-row =
Stack mobile, row desktop */
```

---

### CSS Grid Layouts

**Learned:** CSS Grid creates two-dimensional layouts with precise control over rows and columns using fraction units (fr).

**Steps:**

- Use `grid` with `grid-cols-` and `grid-rows-` to define structure
- Use `fr` units for flexible sizing: `1fr` = 1 fraction of available space
- Span elements across multiple areas with `col-span-` and `row-span-`

```html
<!-- Classic app layout with grid -->
<main class="grid h-screen grid-rows-[auto_1fr_auto] grid-cols-[250px_1fr]">
  <!-- Header spans full width -->
  <header class="col-span-2 bg-blue-500 text-white p-4">📱 App Header</header>

  <!-- Sidebar (fixed width) -->
  <nav class="bg-gray-200 p-4">🧭 Sidebar</nav>

  <!-- Main content (flexible) -->
  <section class="bg-white p-4">📄 Main Content</section>

  <!-- Footer spans full width -->
  <footer class="col-span-2 bg-gray-800 text-white p-4">🦶 Footer</footer>
</main>

<!-- Responsive grid gallery -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
  <div class="bg-red-500 p-4 text-white">Item 1</div>
  <div class="bg-green-500 p-4 text-white lg:col-span-2">
    Item 2 (spans 2 on large)
  </div>
  <div class="bg-blue-500 p-4 text-white">Item 3</div>
</div>

/* 🏗️ Grid Template Syntax: • grid-cols-[250px_1fr] = Fixed 250px + Flexible
remainder • grid-rows-[auto_1fr_auto] = Content-sized + Flexible + Content-sized
• col-span-2 = Element spans 2 columns • gap-4 = 16px gap between all grid items
📐 Fraction Units (fr): • 1fr = Takes 1 part of available space • 2fr = Takes 2
parts (twice as much as 1fr) • auto = Size based on content */
```

---

### Responsive Design & Breakpoints

**Learned:** Tailwind is mobile-first: styles apply from smallest screen up, then use prefixes to override for larger screens.

**Steps:**

- Start with mobile styles (no prefix needed)
- Add `md:`, `lg:`, `xl:` prefixes for larger screens
- Each breakpoint overrides the previous one

```html
<!-- Mobile-first responsive design -->
<div
  class="bg-red-500 p-4 text-white 
            md:bg-green-500 md:p-6
            lg:bg-blue-500 lg:p-8
            xl:bg-purple-500 xl:p-10"
>
  📱 Red mobile → 💻 Green tablet → 🖥️ Blue laptop → 🖥️ Purple desktop
</div>

<!-- Responsive layout patterns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="bg-gray-200 p-4">
    1 col mobile → 2 cols tablet → 4 cols desktop
  </div>
  <div class="bg-gray-200 p-4">Content adapts automatically</div>
  <div class="bg-gray-200 p-4">No media queries needed</div>
  <div class="bg-gray-200 p-4">Just add prefixes</div>
</div>

<!-- Hide/show at different screen sizes -->
<div class="block md:hidden bg-yellow-200 p-4">📱 Only visible on mobile</div>
<div class="hidden md:block bg-blue-200 p-4">
  💻 Hidden on mobile, visible on tablet+
</div>

/* 📱 Breakpoint Scale: • (none): 0px+ (mobile-first default) • sm: 640px+
(large mobile) • md: 768px+ (tablet) • lg: 1024px+ (laptop) • xl: 1280px+
(desktop) • 2xl: 1536px+ (large desktop) 🎯 Mobile-First Logic: bg-red-500 = Red
on all screens md:bg-blue-500 = Blue on tablet and up lg:bg-green-500 = Green on
laptop and up */
```

---

### Interactive States & Pseudo-Classes

**Learned:** Use state prefixes like `hover:`, `focus:`, `active:` to style user interactions without JavaScript.

**Steps:**

- Add `hover:` prefix for mouse hover effects
- Use `focus:` for keyboard navigation and form focus
- Combine with `group` and `peer` for advanced interactions

```html
<!-- Basic interactive button -->
<button
  class="bg-blue-500 text-white px-4 py-2 rounded 
               hover:bg-blue-700 
               focus:ring-4 focus:ring-blue-300 
               active:bg-blue-800
               transition-colors duration-200"
>
  Hover, Focus, and Click Me
</button>

<!-- Form validation states -->
<input
  type="email"
  required
  class="border-2 border-gray-300 p-2 rounded
         focus:border-blue-500 focus:outline-none
         invalid:border-red-500
         peer"
  placeholder="Enter email"
/>
<!-- Peer modifier: Show error when input is invalid -->
<p class="invisible peer-invalid:visible text-red-600 text-sm mt-1">
  ⚠️ Please enter a valid email
</p>

<!-- Group hover effects -->
<div class="group bg-white hover:bg-gray-50 p-4 rounded border cursor-pointer">
  <h3 class="font-bold group-hover:text-blue-600">Card Title</h3>
  <p class="text-gray-600 group-hover:text-gray-800">
    Hover the card to see group effects
  </p>
  <button
    class="opacity-0 group-hover:opacity-100 bg-blue-500 text-white px-3 py-1 rounded mt-2"
  >
    Hidden until group hover
  </button>
</div>

/* 🎨 State Modifiers: • hover: = Mouse hover • focus: = Keyboard focus or click
• active: = Currently being clicked • disabled: = Form element disabled •
invalid: = Form validation failed 🔗 Advanced Interactions: • peer = Mark
element for peer modifier • peer-invalid: = Style when peer element is invalid •
group = Mark parent for group modifier • group-hover: = Style when group parent
is hovered */
```

---

### Columns & Masonry Layouts

**Learned:** Use `columns-` for Pinterest-style masonry layouts where content flows naturally into columns of equal width.

**Steps:**

- Set `columns-{number}` to define column count
- Use `break-inside-avoid` to prevent content from splitting across columns
- Combine with `space-y-` for consistent vertical spacing

```html
<!-- Basic masonry layout -->
<div class="columns-1 md:columns-2 lg:columns-3 gap-4 p-4">
  <img
    class="w-full mb-4 rounded break-inside-avoid"
    src="https://picsum.photos/300/200"
    alt="Image 1"
  />
  <img
    class="w-full mb-4 rounded break-inside-avoid"
    src="https://picsum.photos/300/400"
    alt="Image 2"
  />
  <img
    class="w-full mb-4 rounded break-inside-avoid"
    src="https://picsum.photos/300/300"
    alt="Image 3"
  />
  <img
    class="w-full mb-4 rounded break-inside-avoid"
    src="https://picsum.photos/300/250"
    alt="Image 4"
  />
</div>

<!-- Card-based masonry -->
<div class="columns-1 md:columns-2 lg:columns-3 gap-6 p-6">
  <div class="bg-white rounded-lg shadow-md p-4 mb-6 break-inside-avoid">
    <h3 class="font-bold text-purple-600 mb-2">Morning Routine</h3>
    <p class="text-gray-700">
      Start the day with coffee and planning. A good morning sets the tone for
      productivity.
    </p>
  </div>

  <div class="bg-white rounded-lg shadow-md p-4 mb-6 break-inside-avoid">
    <h3 class="font-bold text-purple-600 mb-2">Work Sprint</h3>
    <p class="text-gray-700">
      Focused burst of productivity tackling the most important tasks. Deep work
      requires elimination of distractions and clear priorities.
    </p>
  </div>

  <div class="bg-white rounded-lg shadow-md p-4 mb-6 break-inside-avoid">
    <h3 class="font-bold text-purple-600 mb-2">Evening Wind-down</h3>
    <p class="text-gray-700">Reflect on the day's accomplishments.</p>
  </div>
</div>

/* 📐 Column System: • columns-1 = Single column (mobile) • columns-2 = Two
columns • columns-3 = Three columns • columns-auto = Automatic column count 🚫
Break Control: • break-inside-avoid = Prevent element from splitting •
break-inside-avoid-column = Specific to column breaks • break-before-column =
Force break before element 🎯 Best Practices: • Always use break-inside-avoid
for cards/images • Add responsive prefixes: columns-1 md:columns-2 lg:columns-3
• Use consistent margin-bottom (mb-4, mb-6) for spacing */
```

---

### Dark Mode Implementation

**Learned:** Dark mode uses the `dark:` prefix and can be toggled with JavaScript by adding/removing the `dark` class on the document.

**Steps:**

- Configure `darkMode: 'class'` in tailwind.config.js
- Use `dark:` prefix for dark mode styles
- Toggle with JavaScript: `document.documentElement.classList.toggle('dark')`

```html
<!-- Dark mode responsive design -->
<div class="bg-white dark:bg-gray-900 min-h-screen p-6 transition-colors">
  <h1 class="text-gray-900 dark:text-white text-3xl font-bold mb-4">
    🌙 Dark Mode Demo
  </h1>

  <!-- Card that adapts to dark mode -->
  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 class="text-gray-800 dark:text-gray-200 text-xl font-semibold mb-2">
      Adaptive Card
    </h2>
    <p class="text-gray-600 dark:text-gray-400">
      This content automatically adapts its colors based on the current theme.
    </p>

    <!-- Button with dark mode styles -->
    <button
      class="mt-4 bg-blue-500 dark:bg-blue-600 
                   hover:bg-blue-600 dark:hover:bg-blue-700
                   text-white px-4 py-2 rounded transition-colors"
    >
      Themed Button
    </button>
  </div>

  <!-- Dark mode toggle button -->
  <button
    onclick="document.documentElement.classList.toggle('dark')"
    class="mt-6 bg-gray-200 dark:bg-gray-700 
           text-gray-800 dark:text-gray-200
           px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
  >
    🌓 Toggle Dark Mode
  </button>
</div>

/* 🌙 Dark Mode Setup: 1. tailwind.config.js: darkMode: 'class' 2. Use dark:
prefix for dark styles 3. Toggle:
document.documentElement.classList.toggle('dark') 🎨 Common Dark Mode Patterns:
• bg-white dark:bg-gray-900 (page background) • text-gray-900 dark:text-white
(primary text) • text-gray-600 dark:text-gray-400 (secondary text) • bg-gray-50
dark:bg-gray-800 (card background) 💡 Pro Tips: • Always pair light and dark
variants • Use transition-colors for smooth changes • Test readability in both
modes • Consider user's system preference: darkMode: 'media' */
```
