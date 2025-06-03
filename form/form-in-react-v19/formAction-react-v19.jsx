"use client"; // only needed if you're using Next.js App Router

import { useActionState } from "react";
import { useContext } from "react";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { UserProgressContext } from "./store/UserProgressContext";

export default function Checkout() {
  const { isCheckingOut } = useContext(UserProgressContext);

  async function checkoutAction(prevState, formData) {
    const customerData = Object.fromEntries(formData.entries());
    console.log("Customer Data:", customerData);

    // You can validate or update state here
    if (!customerData.name || !customerData.email) {
      return { error: "Please fill out all fields." };
    }

    // Simulate async (like submitting to API)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { success: true };
  }

  const [formState, formAction] = useActionState(checkoutAction, {});

  return (
    <Modal open={isCheckingOut}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: $100</p>

        <Input label="Full Name" type="text" id="name" name="name" />
        <Input label="E-Mail Address" type="email" id="email" name="email" />
        <Input label="Street" type="text" id="street" name="street" />
        <div className="control-row">
          <Input
            label="Postal Code"
            type="text"
            id="postal-code"
            name="postalCode"
          />
          <Input label="City" type="text" id="city" name="city" />
        </div>

        {formState?.error && <p style={{ color: "red" }}>{formState.error}</p>}
        {formState?.success && <p style={{ color: "green" }}>Order placed!</p>}

        <p className="modal-actions">
          <Button textOnly="false" type="button">
            Close
          </Button>
          <Button type="submit">Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
