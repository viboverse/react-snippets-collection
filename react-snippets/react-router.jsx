// React Router Cheat Sheet

// 1. Create a browser router
//Main.jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "todos", element: <App />, loader: todosLoader },
      {
        path: "profiles",
        element: <ProfilesPage />,
        children: [
          {
            path: ":profileId",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// 2. Use NavLink for navigation with active class
import { NavLink } from "react-router-dom";

// Example usage:
<NavLink
  to="/events"
  className={({ isActive }) => (isActive ? "active" : undefined)}
>
  Events;
</NavLink>;
// NavLink automatically adds 'active' class when the link matches the current URL.

// 3. Use Params to get route parameters
import { useParams } from "react-router-dom";

// Example usage inside a component:
// const params = useParams();
// params.eventId // access the dynamic part from the URL, e.g. /events/:eventId

// 4. Use Outlet to render child routes
import { Outlet } from "react-router-dom";

// Example usage in a layout component:
function MainLayout() {
  return (
    <div>
      <nav>Navigation here</nav>
      <main>
        <Outlet /> {/* Child routes will render here */}
      </main>
    </div>
  );
}

// 5. Use useNavigate for programmatic navigation
import { useNavigate } from "react-router-dom";

// Example usage inside a component:
function MyComponent() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Do something...
    navigate("/success"); // Navigate to success page
    // navigate(-1); // Go back one page
    // navigate("/users", { replace: true }); // Replace current entry
  };
}

// 6. Use loader to fetch data before rendering
// Loaders run before the component renders and provide data
// This prevents loading states and improves user experience

// Define a loader function:
async function todosLoader() {
  const response = await fetch("/api/todos");
  if (!response.ok) {
    throw new Response("Failed to fetch todos", { status: 500 });
  }
  return response.json();
}

// Add loader to route:
// { path: "todos", element: <TodosPage />, loader: todosLoader }

// Use loader data in component:
import { useLoaderData } from "react-router-dom";

function TodosPage() {
  const todos = useLoaderData(); // Gets data from todosLoader

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}

// 7. Use useNavigation to track navigation state
import { useNavigation } from "react-router-dom";

// Example usage to show loading states:
function App() {
  const navigation = useNavigation();

  return (
    <div>
      {navigation.state === "loading" && <div>Loading...</div>}
      {navigation.state === "submitting" && <div>Submitting...</div>}
      <Outlet />
    </div>
  );
}

// navigation.state can be: "idle" | "loading" | "submitting"
// navigation.location gives you the location being navigated to

// 8. Use useRouteError to handle errors from loaders and actions
import { useRouteError } from "react-router-dom";

// Create an error boundary component:
function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

// Example loader that might throw an error:
async function userLoader({ params }) {
  const response = await fetch(`/api/users/${params.userId}`);
  if (!response.ok) {
    // This error will be caught by the error boundary
    throw new Response("User not found", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return response.json();
}

// Add errorElement to route to catch loader errors:
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />, // Catches all errors in this route tree
    children: [
      {
        path: "users/:userId",
        element: <UserPage />,
        loader: userLoader,
        errorElement: <UserErrorPage />, // Catches errors specific to this route
      },
    ],
  },
]);
// The error object contains:
// - error.status (if thrown with Response)
// - error.statusText (if thrown with Response)
// - error.message (for regular Error objects)
// - error.data (if thrown with Response and JSON data)

// 9. Use action to handle form submissions
// Actions handle form submissions and data mutations
// They run when a form is submitted and can handle POST, PUT, DELETE, etc.
// Actions execute BEFORE navigation happens, allowing you to validate/process data

import { Form, redirect } from "react-router-dom";

// Use Form component for submission (not regular <form>):
import { Form, useActionData } from "react-router-dom";

function CreateUserPage() {
  const actionData = useActionData(); // Gets data returned from action

  return (
    <Form method="post">
      <div>
        <label>Name:</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" required />
      </div>
      <button type="submit">Create User</button>

      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
    </Form>
  );
}

// Define an action function:
async function createUserAction({ request }) {
  const formData = await request.formData();
  // Each input needs to have name attribute
  const userData = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  // Validate data
  if (!userData.name || !userData.email) {
    return { error: "Name and email are required" };
  }

  // Submit to API
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Response("Failed to create user", { status: 500 });
  }

  // Redirect after successful submission
  return redirect("/users");
}

// Add action to route:
const router = createBrowserRouter([
  {
    path: "/users/new",
    element: <CreateUserPage />,
    action: createUserAction,
  },
]);

// Key points about actions:
// - Use Form component (from react-router-dom) instead of regular <form>
// - Actions receive request object with formData
// - Actions can return data that components access via useActionData
// - Actions can redirect using redirect() function
// - Actions run before navigation, perfect for data validation/submission
// - Form submissions automatically trigger the action on the current route
