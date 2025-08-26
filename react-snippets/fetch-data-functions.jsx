// Usefull function for fetich and sending data
export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Faild to fetch user places!");
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

// Thease 3 states are usual when you are fetching data
const [availablePlaces, setAvailablePlaces] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState();

// Optimistic Updating state

/*
🔁 Traditional (Pessimistic) Flow
User clicks "Like".

App sends request to server.

Waits for server response.

Then updates UI.

❌ Slower perceived performance.



⚡ Optimistic Update Flow
User clicks "Like".

UI is updated immediately (e.g., like count increases).

App sends request to server.

If server confirms: ✅ all good.

If server fails: ❌ revert the change or show error.

✅ Feels fast.
⚠️ Needs rollback logic if request fails.
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
