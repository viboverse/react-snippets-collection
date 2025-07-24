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
