// Nullish Coalescing Operator.
//"If the value on the left is null or undefined, then use the value on the right."
<h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>;

// Dialog
export const ResultModal = ({ result, targetTime }) => {
  return (
    <dialog className="result-modal" open>
      <h2>You Won</h2>
      <p>
        The Target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stop the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
};

//Portal
import { createPortal } from "react-dom";

export const Test = () => {
  return createPortal(<div>Test</div>, document.getElementById("moodal")); // This is an element in the index.html with the id of moodal
};

//useImperativeHandle It’s a React Hook used with forwardRef() to expose specific methods or values from a child component to its parent via a ref.
//Normally, when you use ref, you get direct access to a DOM element.
//But sometimes, you want the parent to call a custom function or access specific data or methods on a custom component, not just the DOM.

// Child.js
import { useImperativeHandle, useRef, forwardRef } from "react";

const MyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    reset: () => {
      inputRef.current.value = "";
    },
  }));

  return <input ref={inputRef} />;
});

export default MyInput;

// App.js
import { useRef } from "react";
import MyInput from "./MyInput";

function App() {
  const inputComponentRef = useRef();

  function handleClick() {
    inputComponentRef.current.reset(); // calls the reset method exposed by child
  }

  return (
    <>
      <MyInput ref={inputComponentRef} />
      <button onClick={handleClick}>Reset Input</button>
    </>
  );
}
