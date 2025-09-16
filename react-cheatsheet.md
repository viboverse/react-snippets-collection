<!-- Format into **raw Markdown** :
- Title: `### <Problem Name or Concept>`
- **Learned:** one short key takeaway
- **Steps:** 3 or fewer bullet points
- Code in ```jsx``` block, clean & commented
- Output only raw Markdown, not rendered view
- Separate topics with `---` -->

# Dynamic Component Rendering Pattern

**Learned:** Use variables to store component names as strings and render them dynamically using JSX element syntax.

**Why this matters:** This pattern enables flexible, reusable components where the rendered element type can be determined at runtime. Perfect for UI libraries where you want to allow customization of HTML tags or wrapper components without creating multiple component variants.

**Steps:**

1. Accept a component type as a prop with default value
2. Store the component in a variable (capitalized for JSX)
3. Render the variable as a JSX element

```jsx
// Dynamic component rendering with default fallback
export default function Tabs({ children, buttons, buttonsContainer = "ul" }) {
  const ButtonsContainer = buttonsContainer; // Store component dynamically

  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}

// Usage: Pass any HTML tag or custom component
<Tabs
  buttonsContainer="div" // or "nav", CustomComponent, etc.
  buttons={<TabButton>Click me</TabButton>}
>
  Content here
</Tabs>;
```

---

### Data Fetching Functions Pattern

**Learned:** Create reusable async functions for API calls with proper error handling and response validation.

**Why this matters:** Separating data fetching logic into dedicated functions makes your components cleaner, enables better testing, and promotes code reuse. The pattern handles the common trio of loading, error, and success states that every data fetch operation needs.

**Steps:**

- Create async functions that handle fetch requests and JSON parsing
- Check response.ok status and throw meaningful errors
- Return the specific data needed from the response

```jsx
// Useful functions for fetching and sending data
export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user places!");
  }
  return data.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }

  return resData.message;
}

// These 3 states are usual when you are fetching data
const [availablePlaces, setAvailablePlaces] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState();
```

---

### Optimistic Updates Pattern

**Learned:** Update UI immediately for better user experience, then handle server response or rollback on failure.

**Why this matters:** This pattern makes your app feel lightning-fast by updating the UI instantly while the server request happens in the background. Users don't have to wait for network round-trips to see their actions reflected. Essential for modern, responsive web applications.

**Steps:**

- Update state immediately when user interacts
- Send request to server in background
- Rollback changes if request fails

```jsx
// Optimistic Updating Pattern
/*
⚡ Optimistic Update Flow:
1. User clicks action
2. UI updates immediately (feels fast)
3. Send request to server
4. If success: ✅ keep changes
5. If fails: ❌ rollback + show error
*/

function Post({ postId }) {
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes((prev) => prev + 1); // ✅ Optimistically update UI

    fetch(`/api/posts/${postId}/like`, { method: "POST" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to like");
        }
      })
      .catch(() => {
        setLikes((prev) => prev - 1); // ❌ Rollback if request fails
      });
  }

  return <button onClick={handleLike}>❤️ {likes}</button>;
}
```

---

### ForwardRef Pattern for Reusable Components

**Learned:** Use `forwardRef` to pass refs through custom components, enabling parent components to directly access child DOM elements.

**Why this matters:** Custom components normally can't receive refs like regular DOM elements. ForwardRef solves this by allowing you to build reusable input components, modal triggers, or any wrapper that needs to expose DOM methods (focus, scroll, etc.) to parent components.

**Steps:**

- Wrap component function with `forwardRef()`
- Accept `ref` as second parameter after props
- Pass ref to the target DOM element

```jsx
import React, { forwardRef } from "react";

// forwardRef allows parent components to access the input DOM element
const Input = forwardRef(function Input(
  { title, type = "text", TextContainer = "input" }, // Props first
  ref // Ref as second parameter
) {
  const Container = TextContainer; // Dynamic component pattern

  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {title}
      </label>
      <Container
        ref={ref} // Forward the ref to actual DOM element
        type={type}
        className="w-full p-1 border-b-2 rounded-sm border-stone-300"
      />
    </p>
  );
});

// Usage: Parent can now access input DOM methods
// const inputRef = useRef();
// <Input ref={inputRef} title="Name" />
// inputRef.current.focus(); // Direct DOM access
```

---

### useReducer Pattern for Complex State Logic

**Learned:** Use `useReducer` instead of `useState` when state logic is complex or when next state depends on previous state.

**Why this matters:** When you have multiple state values that change together, or complex state transitions, useReducer provides a more predictable and centralized way to manage state. It's especially powerful for form handling, shopping carts, or any stateful component with multiple possible actions.

**Steps:**

- Define reducer function with `(state, action) => newState`
- Use `dispatch` to send action objects to reducer
- Keep state updates predictable with switch statements

```jsx
import { useReducer } from "react";

// Initial state - can be object, array, or primitive
const initialState = { count: 0 };

// Reducer function - pure function that returns new state
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 }; // Always return new state object
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState; // Reset to initial state
    default:
      return state; // Return current state for unknown actions
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      {/* dispatch sends action objects to reducer */}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

// Benefits over useState:
// ✅ Centralized state logic
// ✅ Predictable state updates
// ✅ Better for complex state objects
// ✅ Easier testing (pure reducer function)
```

---

### useEffect Side Effects & Cleanup Pattern

**Learned:** Use cleanup functions to prevent memory leaks and manage side effects lifecycle properly.

**Why this matters:** Side effects like timers, event listeners, and subscriptions can cause memory leaks if not properly cleaned up. This pattern ensures your components don't leave running processes when they unmount, preventing performance issues and unexpected behavior.

**Steps:**

- Return cleanup function from useEffect
- Cleanup runs before next effect and on unmount
- Use for timers, subscriptions, and event listeners

```jsx
import { useEffect, useState } from "react";

function LocationTracker() {
  const [location, setLocation] = useState(null);

  // Get user's current location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []); // Empty deps = run once on mount

  // Effect with cleanup function
  useEffect(() => {
    console.log("✅ Effect runs");

    // Cleanup function - prevents memory leaks
    return () => {
      console.log("🧹 Cleanup runs");
    };
  }, [someValue]); // Runs when someValue changes

  /*
  Lifecycle Flow:
  📦 Mount: ✅ Effect runs
  🔄 Update: 🧹 Cleanup → ✅ Effect runs  
  💥 Unmount: 🧹 Cleanup
  */
}
```

---

### Object State Updates with Computed Properties

**Learned:** Handle multiple form inputs efficiently using computed property names `[key]` in a single state object.

**Why this matters:** Instead of creating separate state variables for each form field, this pattern lets you manage all form data in one object with a single update function. The computed property syntax `[fieldName]` allows dynamic key assignment, making forms scalable and maintainable.

**Steps:**

- Store all form data in one object state
- Use computed properties `[identifier]` for dynamic updates
- Convert string inputs to numbers with `+` operator

```jsx
import { useState } from "react";

function FormHandler({ onSubmit }) {
  const [formData, setFormData] = useState({
    investment: 10000,
    duration: 10,
    rate: 6,
  });

  // Single handler for all inputs using computed properties
  function updateField(fieldName, value) {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: +value, // Convert to number
    }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <input
        type="number"
        value={formData.investment}
        onChange={(e) => updateField("investment", e.target.value)}
      />
      <input
        type="number"
        value={formData.duration}
        onChange={(e) => updateField("duration", e.target.value)}
      />

      <button type="submit">Calculate</button>
    </form>
  );
}

// Key Concept: [fieldName] allows dynamic object key updates
// Instead of separate handlers for each field
```

---

### React Context Pattern (Global State Management)

**Learned:** Context solves "prop drilling" by creating a global state tunnel that any component can access directly.

**Why this matters:** When you need to pass data through many component layers (prop drilling), Context provides a clean solution. Perfect for themes, user authentication, language settings, or any data that multiple components need access to throughout your app tree.

**Steps:**

- Create Context with `createContext()`
- Wrap app with `Provider` and link it to state
- Access anywhere with `useContext()`

```jsx
import { createContext, useContext, useState } from "react";

// 🏗️ STEP 1: Create the context "tunnel"
export const CartContext = createContext({
  items: [], // Default shape for auto-completion
  addItem: () => {},
});

// 🚀 STEP 2: Provider component (wraps your app)
function App() {
  const [cart, setCart] = useState({ items: [] });

  function addItemToCart(id) {
    setCart((prev) => ({
      items: [...prev.items, { id, quantity: 1 }],
    }));
  }

  // 🔗 Link context to actual state
  const contextValue = {
    items: cart.items,
    addItem: addItemToCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      <Header />
      <ProductList />
    </CartContext.Provider>
  );
}

// 🎯 STEP 3: Consume anywhere (no prop drilling!)
function ProductCard({ productId }) {
  const { addItem } = useContext(CartContext); // Direct access!

  return <button onClick={() => addItem(productId)}>Add to Cart</button>;
}

/*
🧠 Memory Aid - Context = Global Tunnel:
📦 createContext() → Create the tunnel
🚀 Provider → Pump data into tunnel  
🎯 useContext() → Grab data from tunnel

❌ Without Context: Parent → Child → Grandchild → Target
✅ With Context: Provider → 🌐 → Target (direct access)
*/
```

---

### React Router Setup & Navigation

**Learned:** React Router provides declarative routing with nested routes, data loading, and programmatic navigation.

**Steps:**

- Define routes with `createBrowserRouter()`
- Use `NavLink` for navigation and `Outlet` for nested routes
- Access route data with hooks like `useParams`, `useNavigate`

```jsx
import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  Outlet,
} from "react-router-dom";

function App() {
  // 📍 STEP 1: Define route structure
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "users/:userId", element: <UserPage /> }, // Dynamic route
      ],
    },
  ]);

  // 🚀 STEP 2: Provide router to app
  return <RouterProvider router={router} />;
}

// 🏗️ STEP 3: RootLayout with navigation
function Layout() {
  return (
    <div>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}

// 🎯 STEP 4: Access route data in components
function UserPage() {
  const { userId } = useParams(); // Get :userId from URL
  const navigate = useNavigate(); // Programmatic navigation

  return (
    <div>
      <h1>User: {userId}</h1>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}
```

---

### React Router Data Loading & Forms

**Learned:** Use loaders for data fetching and actions for form submissions to handle async operations declaratively.

**Steps:**

- Add `loader` to routes for data fetching before render
- Use `action` for form submissions and mutations
- Access data with `useLoaderData` and `useActionData`

```jsx
import { Form, useLoaderData, useActionData, redirect } from "react-router-dom";

// 📊 Data loader - runs before component renders
async function userLoader({ params }) {
  const response = await fetch(`/api/users/${params.userId}`);
  if (!response.ok) throw new Response("Not found", { status: 404 });
  return response.json();
}

// ✍️ Form action - handles submissions
async function createUserAction({ request }) {
  const formData = await request.formData();
  const userData = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });

  if (!response.ok) return { error: "Failed to create user" };
  return redirect("/users"); // Navigate after success
}

// 🛣️ Route with loader and action
const router = createBrowserRouter([
  {
    path: "/users/:userId",
    element: <UserPage />,
    loader: userLoader,
  },
  {
    path: "/users/new",
    element: <CreateUserPage />,
    action: createUserAction,
  },
]);

// 📖 Component using loader data
function UserPage() {
  const user = useLoaderData(); // Data from userLoader
  return <h1>{user.name}</h1>;
}

// 📝 Component with form action
function CreateUserPage() {
  const actionData = useActionData(); // Data from action

  return (
    <Form method="post">
      {" "}
      {/* Uses React Router Form */}
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">Create</button>
      {actionData?.error && <p>{actionData.error}</p>}
    </Form>
  );
}

/*
🧠 Data Flow Memory Aid:
📊 Loader: Fetch → Render (no loading states needed)
✍️ Action: Submit → Process → Redirect/Return
🎯 Hooks: useLoaderData(), useActionData(), useNavigation()
*/
```

---

### React Router URL State Management

**Learned:** Use URL search parameters to store UI state that should be shareable and bookmark-able (like modal modes, filters, pagination).

**Steps:**

- Use `useSearchParams` to read/write URL query parameters
- URL becomes the source of truth for UI state
- Perfect for toggles, modes, and filters that users might want to share

```jsx
import { useSearchParams } from "react-router-dom";

function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 📖 Read from URL: /auth?mode=login
  const mode = searchParams.get("mode") || "login"; // Default to login
  const isLogin = mode === "login";

  // ✍️ Write to URL: Changes /auth?mode=login to /auth?mode=signup
  function switchMode() {
    setSearchParams({ mode: isLogin ? "signup" : "login" });
  }

  return (
    <div>
      <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
      <button onClick={switchMode}>
        Switch to {isLogin ? "Sign Up" : "Log In"}
      </button>

      {/* Conditional rendering based on URL state */}
      {isLogin ? <LoginForm /> : <SignupForm />}
    </div>
  );
}

/*
💡 Benefits of URL State:
✅ Shareable URLs: /auth?mode=signup
✅ Browser back/forward works
✅ Bookmark-able states
✅ No prop drilling for UI state
*/
```

---

### React Router Form State & Loading Management

**Learned:** React Router provides built-in hooks to manage form submission states and display validation errors from server responses.

**Steps:**

- Use `useActionData` to get server response data (errors, messages)
- Use `useNavigation` to track form submission state
- Handle both field-specific and general form errors

```jsx
import { Form, useActionData, useNavigation } from "react-router-dom";

function AuthForm() {
  const actionData = useActionData(); // Data returned from action
  const navigation = useNavigation();

  // 🔄 Track submission state
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post">
      <div>
        <input name="email" type="email" required />
        {/* Show field-specific errors */}
        {actionData?.errors?.email && (
          <p className="error">{actionData.errors.email}</p>
        )}
      </div>

      <div>
        <input name="password" type="password" required />
        {actionData?.errors?.password && (
          <p className="error">{actionData.errors.password}</p>
        )}
      </div>

      {/* Show general error messages */}
      {actionData?.message && <p className="error">{actionData.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </Form>
  );
}

// 📝 Action function that returns errors
async function authAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");

  // Validation
  if (!email.includes("@")) {
    return { errors: { email: "Invalid email format" } };
  }

  // Server request
  const response = await fetch("/auth", { method: "POST", body: formData });

  if (!response.ok) {
    return { message: "Authentication failed" };
  }

  // Success - redirect
  return redirect("/dashboard");
}

/*
🎯 Form State Flow:
1. User submits → navigation.state = "submitting"
2. Action runs → returns errors or redirects
3. Errors → useActionData() gets error data
4. Success → redirect happens automatically
*/
```

---

### JWT Authentication & Token Management

**Learned:** JWT tokens enable stateless authentication by storing user session data in the browser and sending it with each protected request.

**Steps:**

- Store JWT token after successful login/signup
- Send token in Authorization header for protected requests
- Implement automatic logout when token expires

```jsx
import { redirect } from "react-router-dom";

// 🏗️ Token utility functions
export function getAuthToken() {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("expiration");

  // Check if token exists and not expired
  if (!token || !expiration) return null;

  if (new Date() > new Date(expiration)) {
    // Token expired - clean up
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return null;
  }

  return token;
}

export function storeAuthToken(token, expirationTime) {
  localStorage.setItem("token", token);
  localStorage.setItem("expiration", new Date(expirationTime).toISOString());
}

// 🔐 Login action - store token after success
async function loginAction({ request }) {
  const formData = await request.formData();

  const response = await fetch("/auth/login", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    return { message: "Login failed" };
  }

  const resData = await response.json();

  // Store token and expiration
  storeAuthToken(resData.token, resData.expiration);

  return redirect("/dashboard");
}

// 🛡️ Protected route loader
export function protectedLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  // Fetch protected data with token
  return fetch("/api/protected-data", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/*
🔑 JWT Flow Memory Aid:
1. 🚪 Login → Server returns JWT token
2. 💾 Store token + expiration in localStorage  
3. 🛡️ Protected routes → Check token in loader
4. 📡 API calls → Send token in Authorization header
5. ⏰ Auto-logout → Remove expired tokens

🧠 Security Note: 
JWT contains user data (encoded, not encrypted)
Server verifies JWT signature to trust the data
*/
```

---

### TanStack Query Data Fetching

**Learned:** React Query handles caching, loading states, and error handling automatically for server state management.

**Steps:**

- Use `useQuery` for fetching (GET requests)
- Handle loading, error, and success states automatically
- Query keys enable automatic caching and invalidation

```jsx
import { useQuery } from "@tanstack/react-query";

// 📊 Fetch function - separate from component logic
async function fetchTodos() {
  const response = await fetch("/api/todos");
  if (!response.ok) throw new Error("Failed to fetch todos");
  return response.json();
}

function TodoList() {
  // 🎯 useQuery handles caching, loading, error states automatically
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["todos"], // Unique cache key
    queryFn: fetchTodos, // Function that fetches data
    staleTime: 5000, // Consider data fresh for 5 seconds
  });

  // 🔄 Built-in loading and error handling
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

/*
🧠 Query Benefits:
✅ Automatic caching (no duplicate requests)
✅ Background refetching
✅ Loading/error states built-in
✅ Stale-while-revalidate pattern
*/
```

---

### TanStack Query Mutations & Cache Updates

**Learned:** Use `useMutation` for data modifications with automatic cache invalidation to keep UI in sync with server.

**Steps:**

- Use `useMutation` for POST/PUT/DELETE operations
- Invalidate related queries after successful mutations
- Handle optimistic updates for instant UI feedback

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ✍️ Mutation function - handles data changes
async function addTodo(newTodo) {
  const response = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to add todo");
  return response.json();
}

function AddTodoForm() {
  const queryClient = useQueryClient();

  // 🚀 useMutation for data modifications
  const { mutate, isPending, isError } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      // 🔄 Invalidate and refetch todos after successful add
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Failed to add todo:", error.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutate({ title: formData.get("title") }); // Trigger mutation
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add Todo"}
      </button>
      {isError && <p>Failed to add todo</p>}
    </form>
  );
}

/*
🎯 Mutation Flow:
1. User submits → mutate() called
2. mutationFn runs → server request
3. onSuccess → invalidate cache
4. Related queries refetch automatically
5. UI updates with fresh data
*/
```

---

### TanStack Query Optimistic Updates

**Learned:** Update UI immediately before server response, then rollback if the request fails for the best user experience.

**Steps:**

- Use `onMutate` to update cache optimistically
- Use `onError` to rollback changes if mutation fails
- Use `onSettled` to refetch and ensure data consistency

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function OptimisticTodoUpdater({ todoId }) {
  const queryClient = useQueryClient();

  const { mutate: updateTodo } = useMutation({
    mutationFn: async (updatedData) => {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error("Update failed");
      return response.json();
    },

    // 🚀 onMutate: Update UI immediately (optimistic)
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["todos", todoId] });

      // Snapshot current data for rollback
      const previousTodo = queryClient.getQueryData(["todos", todoId]);

      // Update cache immediately
      queryClient.setQueryData(["todos", todoId], newData);

      return { previousTodo }; // Return context for rollback
    },

    // ❌ onError: Rollback if mutation fails
    onError: (error, variables, context) => {
      if (context?.previousTodo) {
        queryClient.setQueryData(["todos", todoId], context.previousTodo);
      }
      console.error("Update failed:", error);
    },

    // 🔄 onSettled: Refetch to ensure consistency
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", todoId] });
    },
  });

  function handleUpdate() {
    updateTodo({ title: "Updated Todo", completed: true });
  }

  return <button onClick={handleUpdate}>Update Todo</button>;
}

/*
⚡ Optimistic Update Flow:
1. User clicks → UI updates instantly (onMutate)
2. Server request sends in background
3. Success → Keep optimistic update
4. Failure → Rollback to previous state (onError)
5. Always → Refetch for consistency (onSettled)

🧠 Setup Required:
// Wrap app with QueryClientProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
<QueryClientProvider client={queryClient}><App /></QueryClientProvider>
*/
```

---

### Redux Core Concepts (Without Toolkit)

**Learned:** Redux follows a unidirectional data flow: Actions → Reducer → Store → Components. State is immutable and centralized.

**Steps:**

- Create reducer function that returns new state objects
- Dispatch actions to trigger state changes
- Use `useSelector` to read state and `useDispatch` to send actions

```jsx
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

// 🏗️ STEP 1: Reducer - Pure function (state, action) → newState
function counterReducer(state = { counter: 0, showCounter: true }, action) {
  switch (action.type) {
    case "INCREMENT":
      // ⚠️ CRITICAL: Must return complete new state object
      // Don't just return { counter: state.counter + 1 } - other properties get lost!
      return {
        counter: state.counter + 1,
        showCounter: state.showCounter, // Keep existing properties
      };
    case "INCREASE":
      return {
        counter: state.counter + action.payload, // payload = data from action
        showCounter: state.showCounter,
      };
    default:
      return state; // Always return current state for unknown actions
  }
}

// 🏪 STEP 2: Store - Holds entire app state
const store = createStore(counterReducer);

// 🚀 STEP 3: Provider - Makes store available to all components
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// 📖 STEP 4: Component - Read state and dispatch actions
function Counter() {
  const counter = useSelector((state) => state.counter); // Read from store
  const dispatch = useDispatch(); // Get dispatch function

  return (
    <div>
      <p>{counter}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "INCREASE", payload: 10 })}>
        +10
      </button>
    </div>
  );
}

/*
🧠 Redux Flow Memory Aid:
📤 Component dispatches action → 🔄 Reducer processes → 🏪 Store updates → 📖 Component re-renders

⚠️ Golden Rules:
1. Never mutate state directly - always return new objects
2. Reducers must be pure functions (no side effects)
3. Include ALL state properties in returned object
*/
```

---

### Redux Toolkit (RTK) - Modern Redux

**Learned:** Redux Toolkit simplifies Redux with createSlice (auto-generates actions) and configureStore. Immer allows "mutating" syntax safely.

**Steps:**

- Use `createSlice` to define state and reducers together
- "Mutate" state directly - Immer makes it immutable behind the scenes
- Export auto-generated actions and use in components

```jsx
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

// 🍰 STEP 1: Create Slice - combines state, reducers, and actions
const counterSlice = createSlice({
  name: "counter", // Used for action type prefixes
  initialState: { counter: 0, showCounter: true },
  reducers: {
    // ✨ Magic: Write "mutating" code, Immer makes it immutable
    increment(state) {
      state.counter++; // Looks like mutation, but creates new state!
    },
    increase(state, action) {
      state.counter += action.payload; // action.payload = data passed to action
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// 🏪 STEP 2: Configure Store - modern store setup
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer, // Can have multiple slices
    // auth: authSlice.reducer,
    // todos: todosSlice.reducer
  },
});

// 📤 STEP 3: Export auto-generated actions
export const counterActions = counterSlice.actions;
// Creates: increment(), increase(payload), toggleCounter()

// 📖 STEP 4: Use in components
function Counter() {
  // When store has multiple slices, specify the slice name
  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.showCounter);
  const dispatch = useDispatch();

  return (
    <div>
      {showCounter && <p>{counter}</p>}

      {/* Use auto-generated action creators */}
      <button onClick={() => dispatch(counterActions.increment())}>+1</button>
      <button onClick={() => dispatch(counterActions.increase(5))}>+5</button>
      <button onClick={() => dispatch(counterActions.toggleCounter())}>
        Toggle
      </button>
    </div>
  );
}

/*
🎯 RTK Benefits:
✅ Less boilerplate (no action types/creators)
✅ Immer integration (safe "mutations")
✅ Auto-generated actions
✅ Built-in good practices

🧠 Slice vs Reducer:
• Old Redux: Separate actions, action creators, reducers
• RTK: Everything in one createSlice call
*/
```

---

### Multi-Slice Redux Architecture

**Learned:** Organize complex apps by feature using multiple slices, each handling one piece of state independently.

**Steps:**

- Create separate slices for different features (auth, counter, todos)
- Combine slices in configureStore with named reducers
- Access state by slice name: `state.auth.isLoggedIn`, `state.counter.value`

```jsx
import { configureStore, createSlice } from "@reduxjs/toolkit";

// 🔐 Auth slice - handles authentication state
const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, user: null },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload; // user data from login
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// 🔢 Counter slice - handles counter logic
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0, step: 1 },
  reducers: {
    increment(state) {
      state.value += state.step;
    },
    setStep(state, action) {
      state.step = action.payload;
    },
    reset(state) {
      state.value = 0;
    },
  },
});

// 🏪 Store - combines multiple slices
const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // state.auth.*
    counter: counterSlice.reducer, // state.counter.*
  },
});

// Export actions from each slice
export const authActions = authSlice.actions;
export const counterActions = counterSlice.actions;
export default store;

// 📖 Using multiple slices in components
function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      {isAuth ? (
        <div>
          <p>Counter: {counter}</p>
          <button onClick={() => dispatch(counterActions.increment())}>
            +
          </button>
          <button onClick={() => dispatch(authActions.logout())}>Logout</button>
        </div>
      ) : (
        <button onClick={() => dispatch(authActions.login({ name: "John" }))}>
          Login
        </button>
      )}
    </div>
  );
}

/*
🗂️ State Structure with Multiple Slices:
{
  auth: { isAuthenticated: false, user: null },
  counter: { value: 0, step: 1 },
  todos: { items: [], filter: "all" }
}

🎯 Access Pattern:
• state.auth.isAuthenticated
• state.counter.value  
• state.todos.items

🧠 Organization Benefits:
✅ Each feature manages its own state
✅ Reducers don't interfere with each other
✅ Easy to add/remove features
✅ Clear separation of concerns
*/
```

---

### Form Data Extraction with FormData API

**Learned:** The native FormData API automatically extracts all form fields by name attribute, handling complex forms with minimal code.

**Steps:**

- Use `new FormData(event.target)` to capture all form data
- Convert to object with `Object.fromEntries(fd.entries())`
- Handle multiple values (checkboxes) with `fd.getAll()`

```jsx
import { useRef } from "react";

function SignupForm() {
  function handleSubmit(event) {
    event.preventDefault();

    // 📦 Extract all form data automatically
    const formData = new FormData(event.target);

    // 🔄 Convert to plain object
    const data = Object.fromEntries(formData.entries());

    // 📋 Handle multiple checkbox values
    const acquisitionChannels = formData.getAll("acquisition");
    data.acquisition = acquisitionChannels;

    console.log(data); // All form data as object
    event.target.reset(); // Clear form
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Single values */}
      <input name="email" type="email" required />
      <input name="password" type="password" required />

      <select name="role">
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>

      {/* Multiple values (same name) */}
      <fieldset>
        <legend>How did you find us?</legend>
        <input type="checkbox" name="acquisition" value="google" />
        <label>Google</label>
        <input type="checkbox" name="acquisition" value="friend" />
        <label>Friend</label>
      </fieldset>

      <button type="submit">Sign Up</button>
    </form>
  );
}

/*
🎯 FormData Benefits:
✅ No state management needed
✅ Automatically gets all named inputs
✅ Handles files, checkboxes, selects
✅ Works with any form element

🔑 Key Methods:
• formData.get("name") → Single value
• formData.getAll("name") → Array of values
• Object.fromEntries(formData.entries()) → Plain object
*/
```

---

### Form Input Handling Approaches

**Learned:** Three main approaches for form input: useState (controlled), useRef (uncontrolled), and FormData (native). Choose based on your validation needs.

**Steps:**

- Use **useState** for real-time validation and complex interactions
- Use **useRef** for simple forms without real-time updates
- Use **FormData** for complex forms with minimal React state

```jsx
import { useState, useRef } from "react";

// 🎛️ APPROACH 1: Controlled with useState (real-time updates)
function ControlledForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => updateField("password", e.target.value)}
      />
      {/* Real-time validation possible */}
      {formData.email && !formData.email.includes("@") && (
        <p className="error">Invalid email</p>
      )}
    </form>
  );
}

// 📍 APPROACH 2: Uncontrolled with useRef (minimal state)
function UncontrolledForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} type="email" name="email" />
      <input ref={passwordRef} type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}

// 🗂️ APPROACH 3: FormData (native browser API)
function FormDataForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data); // { email: "...", password: "..." }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Submit</button>
    </form>
  );
}

/*
🎯 When to Use Each Approach:

🎛️ useState (Controlled):
• Real-time validation needed
• Complex form interactions
• Form data used in other components
• Dynamic form fields

📍 useRef (Uncontrolled):
• Simple forms
• Submit-only validation
• Performance critical (no re-renders)
• Integration with non-React libraries

🗂️ FormData (Native):
• Complex forms with many fields
• File uploads included
• Server expects FormData format
• Minimal React state management
*/
```

---

### Form Validation Utilities

**Learned:** Create reusable validation functions that return boolean values for easy composition and reuse across forms.

**Steps:**

- Write pure validation functions that take value and return boolean
- Compose multiple validations for complex rules
- Use consistent naming convention for clear intent

```jsx
// 🔍 Basic validation utilities
export function isEmail(value) {
  return value.includes("@"); // Simple email check
}

export function isNotEmpty(value) {
  return value.trim() !== ""; // Remove whitespace and check
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength; // Minimum character count
}

export function isEqualTo(value, otherValue) {
  return value === otherValue; // Compare two values (passwords)
}

// 🛡️ Advanced validation patterns
export function isStrongPassword(password) {
  return (
    hasMinLength(password, 8) &&
    /[A-Z]/.test(password) && // Has uppercase
    /[a-z]/.test(password) && // Has lowercase
    /\d/.test(password) // Has number
  );
}

export function isValidPhoneNumber(phone) {
  return /^\+?[\d\s\-\(\)]{10,}$/.test(phone);
}

/*
🔍 Validation Utilities Benefits:
✅ Reusable across different forms
✅ Easy to test (pure functions)
✅ Composable for complex rules
✅ Clear, descriptive names

🛡️ Validation Patterns:
• isEmail() → Basic format check
• isNotEmpty() → Required field check
• hasMinLength() → Minimum length requirement
• isEqualTo() → Password confirmation
• Custom regex patterns for phone, etc.

🎯 Best Practices:
• Return boolean values consistently
• Use descriptive function names
• Combine simple validators for complex rules
• Validate on both change and submit
*/
```

---

### React 19 useActionState Pattern

**Learned:** React 19's `useActionState` simplifies form handling by automatically managing server actions and form state without manual useState.

**Steps:**

- Create async action function that processes FormData
- Use `useActionState` to connect action to form
- Form handles submission and state updates automatically

```jsx
import { useActionState } from "react";

function CheckoutForm() {
  // 🚀 Action function - handles form submission
  async function checkoutAction(prevState, formData) {
    const data = Object.fromEntries(formData.entries());

    // ✅ Validation
    if (!data.name || !data.email) {
      return { error: "Please fill out all fields." };
    }

    // 📡 Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { success: true };
  }

  const [formState, formAction] = useActionState(checkoutAction, {});

  return (
    <form action={formAction}>
      <h2>Checkout</h2>

      <input name="name" type="text" placeholder="Full Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="street" type="text" placeholder="Street" />

      {formState?.error && <p style={{ color: "red" }}>{formState.error}</p>}
      {formState?.success && <p style={{ color: "green" }}>Order placed!</p>}

      <button type="submit">Submit Order</button>
    </form>
  );
}

/*
🆕 React 19 Benefits:
✅ No useState for form state
✅ Built-in FormData extraction
✅ Automatic loading states
✅ Server action integration
*/
```

```jsx
// This component works in a form that uses formAction hook
import { useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus();
  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </p>
  );
}
```
