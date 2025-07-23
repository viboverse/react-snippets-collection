// =================================================================
// Redux Toolkit (RTK) Cheatsheet for React
// =================================================================

// 1. Installation
// -----------------------------------------------------------------
// npm install @reduxjs/toolkit react-redux

// =================================================================
// 2. Create a "Slice" (e.g., in src/store/counterSlice.js)
// =================================================================
// A slice contains the reducer logic and actions for a single feature.

// import { createSlice } from "@reduxjs/toolkit";

import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  // Reducers are written with "mutating" syntax, but Immer(The internal package) makes it safe.
  reducers: {
    increament(state) {
      state.counter++;
    },
    decreament(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;// payload is the value passed with the action
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// 3. Configure the Store (e.g., in src/store/store.js)
const store = configureStore({
  reducer: counterSlice.reducer,
});

//Export the auto-generated actions and the reducer
export const counterActions = counterSlice.actions;

export default store;



// =================================================================
// 4. Use in a React Component (No change from before, but action dispatch is cleaner)
// =================================================================

import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import { counterActions } from "../store/store";

export default function Counter() {
  // Read state from the store (notice the state structure matches the store config)
  const counter = useSelector((state) => state.counter);
  const showCounter = useSelector((state) => state.showCounter);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-sky-200 p-10 text-center">
      {showCounter && <p className="m-5">{counter}</p>}

      <Button
        className="w-full"
        onClick={() => dispatch(counterActions.increament())}
      >
        +
      </Button>
      <Button
        className="w-full"
        onClick={() => dispatch(counterActions.decreament())}
      >
        -
      </Button>
      <Button
        className="w-full"
        onClick={() => dispatch(counterActions.increase(10))}
      >
        INCREASE
      </Button>
      <Button
        onClick={() => {
          dispatch(counterActions.toggleCounter());
        }}
      >
        TOGGLE SHOW
      </Button>
    </div>
  );
}
