# Monday 4.8.2025

## 🟣 Defining a React Component with TypeScript

- **Key Insight**: Use `type` or `interface` to define props and ensure type safety in React components.

**Example:**

```typescript
// Define props type
type NameBadgeType = {
  name: string;
  greeting?: string; // Optional prop
};

// React component
const NameBadge = ({ greeting, name }: NameBadgeType) => {
  return (
    <section className="badge">
      <header>
        <h1>{greeting}</h1>
        <p>My name is…</p>
      </header>
      <p>{name}</p>
    </section>
  );
};

export default NameBadge;
```

## 🟣 Handling `children` Prop in React

- **Purpose**: Use `React.ReactNode` or `PropsWithChildren` to type the `children` prop.

```typescript
// Using React.ReactNode
type BoxProps = { children: React.ReactNode };

// Using PropsWithChildren utility
type MyProps = React.PropsWithChildren<{}>;

// React component
const Box = ({ children }: MyProps) => {
  return (
    <section
      className="m-4"
      style={{ padding: "1em", border: "5px solid purple" }}
    >
      {children}
    </section>
  );
};

export default Box;
```

## 🟣 Passing and Typing the `style` Prop in React

- `style: React.CSSProperties` lets your component accept any valid inline CSS as a prop.
- User styles (e.g. `backgroundColor: 'red'`) are merged with defaults using `{ ...style }`.

**Example:**

```typescript
type MyProps = React.PropsWithChildren<{ style: React.CSSProperties }>;

const Box = ({ children, style }: MyProps) => (
  <section style={{ padding: "1em", border: "5px solid purple", ...style }}>
    {children}
  </section>
);
```

## 🟣 Typing Input Change Handlers in React

- `React.ChangeEventHandler<HTMLInputElement>` is a type for functions that handle input change events in React.
- It ensures your handler receives the correct event type for `<input>` elements.

**Example:**

```typescript
type ControlPanelProps = {
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const ControlPanel = ({ name, onChange }: ControlPanelProps) => (
  <form onSubmit={(e) => e.preventDefault()}>
    <label>{name}</label>
    <input name="name" type="text" value={name} onChange={onChange} />
  </form>
);
```

## 🟣 Using `ComponentProps<'tag'>` for Any HTML Element

- `ComponentProps<'tag'>` gives your component all the props of a native HTML tag (like `button`, `a`, `li`, `div`, etc.), including `children`.
- Use it to get full typing for any component that returns an HTML element.

**Example:**

```typescript
import { ComponentProps } from "react";

// ButtonProps now has all props of a native <button>
type ButtonProps = ComponentProps<"button">;

function Button(props: ButtonProps) {
  // Spread all props to the native button element
  return <button {...props} />;
}
```

## 🟣 Typing Button Props in React

- `React.ComponentPropsWithoutRef<'button'>` gives your Button component all the standard props of a native `<button>`, including `onClick`, `type`, `children`, etc. For button tags it is prefred to use ComponentPropsWithoutRef or ComponentPropsWithRef

**Example:**

```typescript
type ButtonProps = React.ComponentPropsWithoutRef<"button">;

function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default Button;
```

## 🟣 Using `valueAsNumber` in React Input Handlers

- `e.target.valueAsNumber` gets the input’s value as a number (not a string) in a change handler.
- Useful for numeric inputs to avoid manual conversion.

**Example:**

```typescript
<input
  type="number"
  value={draftCount}
  onChange={(e) => setDraftCount(e.target.valueAsNumber)}
/>
```
