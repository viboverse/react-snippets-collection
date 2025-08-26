// How to disable a save/submit button when submitting in React Router (v6.4+)

// Use the useNavigation hook from react-router-dom inside your form component:
import { useNavigation, useSubmit } from "react-router-dom";

function MyForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <form method="post">
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
// This disables the button and can show a loading state while the form is being submitted.

// Conceptual example: Programmatically submitting a form (e.g., for delete) using useSubmit
function DeleteButton() {
  const submit = useSubmit();
  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      // Triggers a DELETE request to the current route
      submit(null, { method: "delete" });
    }
  }
  return <button onClick={startDeleteHandler}>Delete</button>;
}
// This pattern is useful for actions like delete, where you want to confirm before submitting.
