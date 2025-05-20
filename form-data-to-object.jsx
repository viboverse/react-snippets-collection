import { useState } from "react";

const initialInput = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};
function UserInput({ onSubmit }) {
  const [userInput, setUserInput] = useState(initialInput);

  function handleChangeInput(identifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [identifier]: +newValue,
      };
    });
  }

  function handleCalculate(event) {
    event.preventDefault();
    onSubmit(userInput);
  }

  return (
    <form onSubmit={handleCalculate}>
      <section id="user-input">
        <div className="input-group">
          <p>
            <label htmlFor="initial">Initial Investment</label>
            <input
              type="number"
              value={userInput.initialInvestment}
              id="initial"
              onChange={(event) =>
                handleChangeInput("initialInvestment", event.target.value)
              }
            />
          </p>
          <p>
            <label htmlFor="annual">Annual Investment</label>
            <input
              type="number"
              value={userInput.annualInvestment}
              id="annual"
              onChange={(event) =>
                handleChangeInput("annualInvestment", event.target.value)
              }
            />
          </p>
        </div>
        <div className="input-group">
          <p>
            <label htmlFor="expected">Expected Return</label>
            <input
              type="number"
              value={userInput.expectedReturn}
              id="expected"
              onChange={(event) =>
                handleChangeInput("expectedReturn", event.target.value)
              }
            />
          </p>
          <p>
            <label htmlFor="duration">Duration</label>
            <input
              type="number"
              value={userInput.duration}
              id="duration"
              onChange={(event) =>
                handleChangeInput("duration", event.target.value)
              }
            />
          </p>
        </div>
        <div className="button-container">
          <button type="submit">Calculate</button>
        </div>
      </section>
    </form>
  );
}

export default UserInput;
