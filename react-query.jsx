// TanStack Query (React Query) - Quick Code Examples

// --- useQuery: For FETCHING data (GET) ---

import { useQuery } from "@tanstack/react-query";

async function fetchEvents() {
  const response = await fetch("/api/todos");
  if (!response.ok) throw new Error("Failed to fetch todos");
  return response.json();
}

const { data, isPending, isError, error } = useQuery({
  queryKey: ["events"],
  queryFn: fetchEvents,
  staleTime: 5000,
  // gcTime: 1000
});

if (isPending) return <p>Loading...</p>;
if (isError) return <p>Error: {error.message}</p>;

return (
  <ul>
    {data.map((todo) => (
      <li key={todo.id}>{todo.title}</li>
    ))}
  </ul>
);

// --- useMutation: For CHANGING data (POST, PUT, DELETE) ---

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function addTodoToServer(newTodo) {
  const response = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to add todo");
  return response.json();
}

function MyMutationComponent() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addTodoToServer, // Function that performs the change
    onSuccess: () => {
      // Invalidate and refetch 'todos' query after a successful mutation
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => {
      console.error("Mutation failed:", err.message);
    },
  });

  const handleAddTodo = () => {
    mutate({ title: "New Todo from React Query" }); // Call mutate with variables
  };

  return (
    <button onClick={handleAddTodo} disabled={isPending}>
      {isPending ? "Adding..." : "Add Todo"}
    </button>
  );
}

// --- Optimistic Update Example (useMutation) ---
// (Assumes 'updateEventOnServer' is your async mutation function, e.g., async (eventPayload) => { /* ... */ })
// (Assumes 'eventId' is the ID of the item being updated, available in your component's scope)
// (Assumes 'queryClient' is initialized via useQueryClient())

Example of how you might define updateEventOnServer and get eventId
async function updateEventOnServer(eventPayload) { // eventPayload might be { id, event: formData }
  const response = await fetch(`/api/events/${eventPayload.id}`, {
    method: 'PUT',
    body: JSON.stringify(eventPayload.event),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to update event');
  return response.json();
}
const eventId = 'some-event-id'; // This would be dynamic in a real component


const { mutate: updateEventOptimistically } = useMutation({
  mutationFn: updateEventOnServer, // Your actual function to call the API

  // 1. onMutate: Runs BEFORE mutationFn. Update cache optimistically.
  onMutate: async (variablesPassedToMutate) => {
    // `variablesPassedToMutate` is what you pass to `mutate()`,
    // e.g., updateEventOptimistically({ id: eventId, event: formData })
    const newEventData = variablesPassedToMutate.event; // Adjust based on your data structure

    // Cancel any outgoing refetches for this specific queryKey
    // to prevent them from overwriting our optimistic update.
    await queryClient.cancelQueries({ queryKey: ["events", eventId] });

    // Snapshot the previous value of the data for this queryKey.
    const previousEvent = queryClient.getQueryData(["events", eventId]);

    // Optimistically update the cache with the new data.
    // The UI will re-render with this data immediately.
    queryClient.setQueryData(["events", eventId], newEventData);

    // Return a context object with the snapshotted value (and new data if needed).
    // This context will be passed to onError and onSettled.
    return { previousEvent, newEventData };
  },

  // 2. onError: If mutationFn throws an error, roll back using context from onMutate.
  onError: (error, variablesPassedToMutate, context) => {
    if (context?.previousEvent) {
      // If there was a previous state, revert the cache to that state.
      queryClient.setQueryData(["events", eventId], context.previousEvent);
    }
    console.error("Mutation failed:", error);
    // Optionally: Show an error message to the user.
  },

  // 3. onSettled: Runs AFTER mutationFn succeeds or fails.
  // Good place for refetching to ensure data is consistent with the server.
  onSettled: (dataFromMutationFn, error, variablesPassedToMutate, context) => {
    // Invalidate the query for the specific event.
    // This will trigger a refetch to get the latest server state.
    queryClient.invalidateQueries({ queryKey: ["events", eventId] });

    // If this event is part of a larger list (e.g., all events),
    // you might also want to invalidate that list query.
    queryClient.invalidateQueries({ queryKey: ["events"] });
  },

  // Optional: onSuccess can be used if you only want to perform actions
  // specifically on successful mutation.
  // onSuccess: (dataFromMutationFn, variablesPassedToMutate, context) => {
  //   console.log("Mutation successful!", dataFromMutationFn);
    // Navigate, show success notification, etc.
    // Note: Invalidation is often handled in onSettled to cover both success/error.
  // },
});

// How to use it in your component:
function MyComponent() {
  const queryClient = useQueryClient(); // Make sure to get the client
  const eventId = 'some-dynamic-id'; // Get this from props, params, etc.

  const handleFormSubmit = (formData) => {
    updateEventOptimistically({ id: eventId, event: formData });
  };

 }

// --- Key Differences (Simplified) ---
// - useQuery:   Reads data. Caches data. Runs on component load.
//               Example: Displaying a list of items.
//
// - useMutation: Writes data. Doesn't cache results the same way. Triggered manually.
//                Example: Submitting a form, deleting an item.

// Remember:
// 1. Install: `npm install @tanstack/react-query`
// 2. Setup Provider:
/*
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
*/
