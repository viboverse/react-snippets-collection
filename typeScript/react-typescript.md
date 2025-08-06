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

# Tuesday 6.8.2025

## 🟣 useReducer with TypeScript

- **Purpose**: Manage complex state with type safety using reducer pattern.
- **Key Types**: Define `State`, `Action` types, and use union types for different action shapes.

```typescript
// 1. Define state type
type State = {
  count: number;
  draftCount: string | number;
};

// 2. Define action types (with and without payload)
type Action = {
  type: "increment" | "decrement" | "reset" | "updateCountFromDraft";
};

type ActionWithPayload = {
  type: "updateDraftCount";
  payload: number;
};

// 3. Reducer function with typed parameters
const reducer = (state: State, action: Action | ActionWithPayload) => {
  if (action.type === "increment") {
    return { ...state, count: state.count + 1 };
  }
  // Handle other actions...
  return state;
};

// 4. Use in component
const [state, dispatch] = useReducer(reducer, initialState);

// 5. Dispatch actions
dispatch({ type: "increment" }); // No payload
dispatch({ type: "updateDraftCount", payload: 5 }); // With payload
```

**Benefits**: Type safety for actions, predictable state updates, better than multiple `useState` for related state.

## 🟣 Template Literal Types for String Patterns

- **Concept**: Use TypeScript template literal types to restrict props or state to specific string patterns.
- **Why**: Ensures only allowed string formats (like `"bright-red"`, `"bright-blue"`) are accepted at compile time.

**Example:**

```typescript
type BrightColor = `bright-${"red" | "blue" | "green"}`;

type Props = { color: BrightColor };

const ColorLabel = ({ color }: Props) => <span>{color}</span>;

// <ColorLabel color="bright-red" /> // ✅
// <ColorLabel color="red" />        // ❌ Type error
```

## 🟣 Context API with TypeScript

- **Purpose**: Share state across components with type safety using React Context.
- **Key Types**: Define context value type and provide default value with proper typing.

**Example (Theme Management):**

```typescript
// 1. Define context value type
type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

// 2. Create context with default value
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

// 3. Provider component
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "dark" ? "dark-theme" : "light-theme"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// 4. Use in component
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
    </header>
  );
};
```

**Benefits**: Type-safe global state, prevents undefined context errors, IntelliSense support.

## 🟣 TypeScript `Omit` Utility

- **Concept**: `Omit<Type, Keys>` creates a new type by removing one or more properties from an existing type.
- **Use case**: When you want a type like another, but without certain properties.

**Example:**

```typescript
type User = { id: number; name: string; password: string };

// Remove 'password' from User
type PublicUser = Omit<User, "password">;

// PublicUser is { id: number; name: string }
```

## 🟣 TypeScript `Partial` Utility

- **Concept**: `Partial<Type>` makes all properties of a type optional.
- **Use case**: Useful when updating or initializing objects where not all fields are required.

**Example:**

```typescript
type User = { id: number; name: string; password: string };

// All properties now optional
type UserUpdate = Partial<User>;
// { id?: number; name?: string; password?: string
```

## 🟣 Using Generics to Create Reusable Context

- **Purpose**: Create a generic context creator that works with any data type.
- **Benefit**: Write the context logic once, reuse it for different data types.

**Example:**

```typescript
// Generic context creator function
function createContext<T>() {
  const Context = createContext<T | undefined>(undefined);

  const useContext = () => {
    const context = useContext(Context);
    if (!context) throw new Error("Context must be used within Provider");
    return context;
  };

  return [Context, useContext] as const;
}

// Usage with different types
const [UserContext, useUser] = createContext<{ name: string; id: number }>();
const [ThemeContext, useTheme] = createContext<{ theme: "light" | "dark" }>();

// Provider usage
<UserContext.Provider value={{ name: "John", id: 1 }}>
  <App />
</UserContext.Provider>;

// Component usage
const Profile = () => {
  const user = useUser(); // Fully typed!
  return <div>{user.name}</div>;
};
```

## 🟣 Combining Custom Props with HTML Element Props

- **Purpose**: Create reusable components that accept both custom props and all standard HTML element props.
- **Benefit**: Your component behaves like a native element but with extra features.

**Example:**

```typescript
// Combine custom props with input props
type InputProps = {
  label: string; // Custom prop
} & React.ComponentProps<"input">; // All input props

const LabeledInput = ({ label, ...inputProps }: InputProps) => (
  <div>
    <label>{label}</label>
    <input {...inputProps} /> {/* Pass all input props */}
  </div>
);

// Usage - can use both custom and native props
<LabeledInput
  label="Name" // Custom prop
  type="text" // Native input prop
  placeholder="Enter name" // Native input prop
  onChange={handleChange} // Native input prop
/>;
```

## 🟣 Polymorphic Components in React

- **Purpose**: Create components that can render as different HTML elements while keeping the same props interface.
- **Point**: One component that can be a `<button>`, `<a>`, `<div>`, etc. based on what you need.

**Example:**

```typescript
type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
} & React.ComponentProps<T>;

const Button = <T extends React.ElementType = 'button'>({
  as,
  children,
  ...props
}: PolymorphicProps<T>) => {
  const Component = as || 'button';
  return <Component {...props}>{children}</Component>;
};

// Usage - same component, different elements
<Button>Click me</Button>                    // Renders as <button>
<Button as="a" href="/home">Go Home</Button> // Renders as <a>
<Button as="div" onClick={handler}>Box</Button> // Renders as <div>
```

**Benefit**: Flexible, reusable components that adapt to different use cases while maintaining type safety.
