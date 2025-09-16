<!-- Format into **raw Markdown** :
- Title: `### <Utility Category>`
- **Learned:** one short key takeaway
- **Steps:** 3 or fewer bullet points
- Code in ```html``` block, clean & commented
- Output only raw Markdown, not rendered view
- Separate topics with `---` -->

### Ref Element Proxy Pattern

**Learned:** Use refs to trigger actions on hidden elements through visible buttons (custom file picker, etc.)

**Steps:**

- Create ref and attach to target element
- Hidden input handles the actual functionality
- Button triggers the hidden element via ref.current.click()

```jsx
"use client";
import { useRef } from "react";

export default function CustomFilePicker() {
  const fileInputRef = useRef();

  return (
    <div>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Custom button that triggers file input */}
      <button onClick={() => fileInputRef.current.click()}>Pick Image</button>
    </div>
  );
}
```

---
