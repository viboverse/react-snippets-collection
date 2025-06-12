// Short Next.js Concepts Cheat Sheet

import Link from "next/link";

// 1. <Link> Component (from 'next/link')
//    - Purpose: Client-side navigation between pages.
//    - How:
<Link href="/your-page">Go to Page</Link>;
//    - Benefit: Faster navigation, no full page reload.

// 2. <Image> Component (from 'next/image')
//    - Purpose: Optimized image rendering.
//    - How:
<Image src="/path/to/img.jpg" alt="description" width={100} height={100} />;
//    - Or with `fill`: `<div style={{position: 'relative'}}><Image src={...} alt={...} fill /></div>` (parent needs positioning)
//    - Benefits: Auto image optimization (size, format), lazy loading.

// 3. usePathname() Hook (from 'next/navigation')
//    - Purpose: Get the current URL's pathname (e.g., "/meals/burger").
//    - How:
const currentPath = usePathname();
//    - Requirement: Must be used in a Client Component (`"use client";`).
//    - Use Case: Highlight active nav links, conditional rendering based on path.

// 4. loading.js File (in `app` directory segments)
//    - Purpose: Show an instant loading UI while route segment content loads.
//    - How: Create `loading.js` alongside `page.js` (e.g., `app/meals/loading.js`).
//    - Benefit: Improves user experience by showing immediate feedback during data fetching or rendering of a route. Uses React Suspense behind the scenes.

// 5. useParams (from 'next/navigation')
//    - Purpose: Get dynamic route params (e.g., [slug]) in a client component.
//    - How:
const params = useParams(); // { slug: "burger" }
//    - Use Case: Read URL params in client-side logic.

// 6. Server Action ("use server")
//    - Purpose: Mark a function to always run on the server (e.g., for form handling).
//    - How:
//      "use server";
//      export async function myAction(formData) { /* ... */ }
//    - Use Case: Securely handle data, DB, or sensitive logic.

// 7. <Suspense> (from 'react')
//    - Purpose: Show fallback UI while waiting for async data/components.
//    - How:
<Suspense fallback={<p>Loading...</p>}>
  <MyAsyncComponent />
</Suspense>;
//    - Use Case: Granular loading states for parts of a page.

// 8. revalidatePath (from 'next/cache')
//    - Purpose: Invalidate cached pages so they update with fresh data.
//    - How:
revalidatePath("/meals");
//    - Use Case: After a form or action changes data, update the UI for that path.

// 9. useFormStatus (from 'react-dom')
//    - Purpose: Get the status of a form submission (pending, success, error) in a client component.
//    - How:
const status = useFormStatus();
if (status.pending) {
  /* show spinner */
}
//    - Use Case: Show loading indicators or disable buttons during form submission.

// 10. useFormState (from 'react-dom')
//     - Purpose: Manage and track the state/result of a server action form.
//     - How:
const [state, formAction] = useFormState(myAction, initialState);
<form action={formAction}>...</form>;
//     - Use Case: Show messages, errors, or results after form submission.
