// React Router Cheat Sheet

// 1. Create a browser router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  // Example route definitions
  {
    path: "/",
    element: <HomePage />,
    children: [
      { path: "events", element: <EventsPage /> },
      { path: "events/:eventId", element: <EventDetailPage /> },
      // ...other routes
    ],
  },
]);

// Use in your App component:
// <RouterProvider router={router} />

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
