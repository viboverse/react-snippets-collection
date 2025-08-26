// React Router & Auth Concepts: Quick Recap

// 1. useSearchParams
import { useSearchParams } from "react-router-dom";
const [searchParams, setSearchParams] = useSearchParams();
const mode = searchParams.get("mode"); // e.g., 'login' or 'signup'
setSearchParams({ mode: "signup" }); // change the mode in the URL

// 2. useActionData
import { useActionData } from "react-router-dom";
const data = useActionData();
// Example usage:
// if (data?.errors) { /* show field errors */ }
// if (data?.message) { /* show general message */ }

// 3. useNavigation
import { useNavigation } from "react-router-dom";
const navigation = useNavigation();
const isSubmitting = navigation.state === "submitting";
// <button disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Save'}</button>

// 4. Conditional Rendering Based on URL State
const isLogin = searchParams.get("mode") === "login";
// <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>

// 5. Auth Token Concept
// After a successful login/signup, the backend returns a token (usually a JWT).
// Example:
const resData = await response.json();
const token = resData.token;
// Store the token (e.g., localStorage.setItem('token', token)) to use for authenticated requests.
// For protected API calls, send the token in the Authorization header:
fetch(url, { headers: { Authorization: "Bearer " + token } });
// The backend will verify the token to allow or deny access.

// 6. Protecting Routes: Prevent Access Without Login
// To restrict access to certain pages unless the user is logged in (has a token):
// In your loader or action for a protected route:
import { redirect } from "react-router-dom";
import { getAuthToken } from "./uitl/auth"; // adjust path as needed

// Example loader for a protected page:
export async function loader() {
  const token = getAuthToken();
  if (!token) {
    // If no token, redirect to login page
    return redirect("/auth");
  }
  // ...load protected data...
}
// This pattern ensures users can't access certain routes unless authenticated.

// 7. Automatic Logout (Token Expiry)
// To automatically log out a user when their token expires:
// - Store the token's expiration time along with the token after login/signup:
//     localStorage.setItem('token', token);
//     localStorage.setItem('expiration', expirationDateString); // e.g., ISO string
//
// - Create a utility to check if the token is expired:
//   export function getAuthToken() {
//     const token = localStorage.getItem('token');
//     const expiration = localStorage.getItem('expiration');
//     if (!token || !expiration) return null;
//     if (new Date() > new Date(expiration)) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('expiration');
//       return null; // Token expired
//     }
//     return token;
//   }
//
// - Use this utility in your loaders/actions. If it returns null, redirect to /auth (login page).
//
// - Optionally, use a timer in your app (e.g., with useEffect) to auto-logout the user on the client side when the expiration time is reached.
//
// This ensures users are logged out automatically when their token is no longer valid.

// Add more code snippets as you learn!
