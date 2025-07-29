// ============================================
// REACT TYPESCRIPT CHEATSHEET
// ============================================

// 1. BASIC FUNCTIONAL COMPONENT
function MyComponent(): JSX.Element {
  return <div>Hello World</div>;
}

// 2. COMPONENT WITH PROPS (Inline Props)
function TodoItem({ text, id }: { text: string; id: string }) {
  return <li>{text}</li>;
}

// 3. COMPONENT WITH PROPS (Interface)
interface TodosProps {
  items: Todo[];
  onRemoveTodo: (id: string) => void;
}

function Todos({ items, onRemoveTodo }: TodosProps) {
  return (
    <ul>
      {items.map((item) => (
        <TodoItem key={item.id} text={item.text} id={item.id} />
      ))}
    </ul>
  );
}

// 4. REACT HOOKS WITH TYPESCRIPT
const [todos, setTodos] = useState<Todo[]>([]);
const todoRef = useRef<HTMLInputElement>(null);

// 5. EVENT HANDLERS
function handleSubmit(event: FormEvent) {
  event.preventDefault();
  const value = todoRef.current!.value; // ! = non-null assertion
}

// 6. CLASS MODEL
class Todo {
  id: string;
  text: string;

  constructor(todoText: string) {
    this.text = todoText;
    this.id = new Date().toISOString();
  }
}

// 7. CONTEXT PATTERN
type TodoContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

export const TodoContext = createContext<TodoContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: () => {},
});

// 8. PROP DRILLING ALTERNATIVE (Context)
function MyComponent() {
  const todosCtx = useContext(TodoContext);
  return <div>{todosCtx.items.length}</div>;
}

// 9. ARROW FUNCTION FOR EVENT BINDING
{
  items.map((item) => (
    <TodoItem
      key={item.id}
      onRemoveTodo={() => onRemoveTodo(item.id)} // Captures item.id
    />
  ));
}

// 10. FUNCTION TYPES
// () => void          - Function with no params, returns nothing
// (text: string) => void - Function takes string, returns nothing
// (id: string) => boolean - Function takes string, returns boolean

// 11. OPTIONAL vs REQUIRED PROPS
interface Props {
  title: string; // Required
  subtitle?: string; // Optional (can be undefined)
}

// 12. COMMON TYPESCRIPT OPERATORS
// !  = Non-null assertion operator
// ?  = Optional chaining operator
// ?. = Safe property access
