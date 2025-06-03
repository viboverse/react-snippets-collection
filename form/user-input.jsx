// Extracting user's Input with different ways:
// Multiple State
// Single State (Bundle all entered input in an Obj)
// useRef

import { useRef, useState } from "react";

function Login() {
  const email = useRef();
  const password = useRef();
  // const [userInput, setUserInput] = useState({
  //   email: "",
  //   password: "",
  // });

  // function handleInputChange(identifier, value) {
  //   setUserInput((prevValues) => ({
  //     ...prevValues,
  //     [identifier]: value,
  //   }));
  // }

  // const [eneteredEmail, setEnteredEmail] = useState("");
  // const [eneteredPassword, setEnteredPassword] = useState("");

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  function handleSubmit(event) {
    event.preventDefault();
    const eneteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    console.log(eneteredEmail, enteredPassword);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            // onChange={(event) => handleInputChange("email", event.target.value)}
            // value={userInput.email}
            ref={email}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            // onChange={(event) =>
            //   handleInputChange("password", event.target.value)
            // }
            // value={userInput.password}
            ref={password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
