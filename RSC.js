// React Server Components & Next.js Cheat Sheet

// 1. Server Components
// - Default in Next.js app directory (no "use client").
// - Can use async/await, access server APIs (fs, db, etc).
// - Can include client components.

// 2. Client Components
// - Marked with "use client" at the top.
// - Can use React hooks (useState, useEffect, etc).
// - Can accept server components as children, but can't render them directly (unless converted to client component).

// 3. Data Fetching
// - Server components can fetch data with async/await.
// - Data is fetched on the server, not in the browser.

// 4. Server Actions
// - Functions marked with "use server" (must be async).
// - Used for secure form handling and server-side logic.
// - Can only be defined in server files (not in client components).
// - Can be imported and used in client components.

// 5. Form Action Prop
// - <form action={serverAction}> runs the function on the server when submitted.

// 6. Suspense & use() Hook
// - <Suspense fallback={...}> shows fallback UI while data loads.
// - use() hook can await special Promises in components (works with Suspense).
// - Improves user experience by not blocking the whole page.

// 7. Project Setup
// - Features like server components, server actions, and use() require special setups (e.g., Next.js).
// - Not available in plain React (Vite, CRA, etc).
