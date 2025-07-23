// =================================================================
// Redux Cheatsheet for React
// =================================================================

// This without Redux toolkit:

// 1. Installation
// -----------------------------------------------------------------
// npm install redux react-redux

// =================================================================
// 2. Core Redux Setup (e.g., in src/store/store.js)
// =================================================================

// import { createStore } from "redux";

// A. Define a Reducer
// A pure function that takes the current state and an action, and returns the new state.
function counterReducer(state = { counter: 0, showCounter: false }, action) {
  switch (action.type) {
    case "INCREMENT":
      // You MUST define all the state  obj, even those which are not gona be changed for example showCounter, cuz if we do NOT define it, it will be defined as undifined!!! so we ALWASY MUST RETURN NEW OBJECT with all values
      // Also, 
      return { counter: state.counter + 1, showCounter: state.showCounter };
    case "DECREMENT":
      return { counter: state.counter - 1, showCounter: state.showCounter };
    case "INCREASE":
      return {
        counter: state.counter + action.payload,
        showCounter: state.showCounter,
      };
    default:
      return state;
  }
}

// B. Create the Store
// The store holds the entire state tree of your application.
const store = createStore(counterReducer);

export default store;



// =================================================================
// 3. Provide the Store to React (e.g., in src/main.jsx)
// =================================================================

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// =================================================================
// 4. Use Redux in a React Component (e.g., src/components/Counter.jsx)
// =================================================================

// import { useSelector, useDispatch } from "react-redux";
// import Button from "../UI/Button"; // Assuming Button component exists

export default function Counter() {
  // A. Read state from the store with useSelector
  const counter = useSelector((state) => state.counter);

  // B. Get the dispatch function to send actions
  const dispatch = useDispatch();

  // C. Dispatch actions on user interaction
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-sky-200 p-10 text-center">
      <p className="m-5">{counter}</p>

      <button
        className="w-full"
        onClick={() => dispatch({ type: "INCREMENT" })}
      >
        +
      </button>
      <button
        className="w-full"
        onClick={() => dispatch({ type: "DECREMENT" })}
      >
        -
      </button>
      <button
        className="w-full"
        onClick={() => dispatch({ type: "INCREASE", payload: 10 })}
      >
        Increase by 10
      </button>
    </div>
  );
}
