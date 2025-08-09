<!--
Format into **raw Markdown** :
- Title: `### <Problem Name or Concept>`
- Code in ```typesciipt``` block, clean & commented
- Output only raw Markdown, not rendered view
- Separate topics with `---`
-->

### TypeScript Cheatsheet

**Learned:** Key syntax and concepts for TypeScript types, assertions, unions, intersections, and inheritance.

**Sections:**

---

#### Variables & Type Assertions

```typescript
// Type Assertions
let assertion2 = 79 as const; // Type: 79 (literal)
let assertion3 = "hello" as any as Date; // Double assertion

// Type Inference vs Explicit Types
let temperature = 6; // Inferred: number
let endTime: Date; // Explicit annotation

// Literal Types vs General Types
const humidity = 79; // Type: 79 (literal)
let temp = 19; // number
let humid = 79 as const; // Force literal type

// Type Compatibility (Set Theory)
temp = humid; // ✅ {79} ⊆ {all numbers}
// humid = temp // ❌ {all numbers} ⊄ {79}

// More Type Assertions
let assertion1 = 20 as 23; // Pretend type 23
let safe = 79 as number; // Safe
let dangerous = "oops" as any as Date; // Unsafe
```

---

#### Functions

```typescript
// Function Type Annotations
function add(a: number, b: number): number {
  return a + b;
}

// Implicit 'any' Problem
function badAdd(a, b) {
  return a + b; // Could be anything
}
```

---

#### Object Types

```typescript
// Object Type Annotations
const myCar = { make: "Mazda", model: "mazda6", year: 2023 };
let car: { make: string; model: string; year: number } = myCar;

// Optional Properties
function printCar(car: { make: string; chargeVoltage?: number }) {
  console.log(`${car.make} ${car.chargeVoltage || "N/A"}`);
}

// Excess Property Checking
const obj = { make: "Tesla", extra: "works" };
printCar(obj); // ✅ via variable

// Arrays vs Tuples
const arr: number[] = [1, 2, 3];
const tuple: [number, string] = [1, "hello"];

// Immutable Arrays/Tuples
const roArr: readonly number[] = [1, 2, 3];
const roTuple: readonly [number, string] = [1, "hello"];

// Index Signatures
const phones: { [key: string]: { area: string; number: string } } = {};

// Computed Property Names
const key = "name";
const obj2 = { [key]: "value" };
```

---

#### Union & Intersection Types

```typescript
// Union Types
type Status = "success" | "error" | "loading";
let result: number | string;

// Literal Union Types
type OneThroughFive = 1 | 2 | 3 | 4 | 5;
type Evens = 2 | 4 | 6 | 8;

let unionExample: Evens | OneThroughFive = 6; // ✅

// Type Narrowing
function handleResponse(response: string | Error) {
  if (response instanceof Error) {
    console.log(response.message);
  } else {
    console.log(response.toUpperCase());
  }
}

// Discriminated Unions
type Result = ["success", { name: string; email: string }] | ["error", Error];

function handleResult([status, data]: Result) {
  if (status === "error") {
    console.log(data.message);
  } else {
    console.log(data.email);
  }
}

// Intersection Types
type Combined = { name: string } & { age: number };
type CommonValues = Evens & OneThroughFive;
let bothSets: CommonValues = 4;
```

---

#### Type Aliases & Interfaces

```typescript
// Type Aliases
type Amount = { currency: string; value: number };
type Status2 = "pending" | "approved" | "rejected";
type ID = string | number;

// Complex Aliases
type UserInfoOutcomeError = readonly ["error", Error];
type UserInfoOutcomeSuccess = readonly [
  "success",
  { name: string; email: string }
];
type UserInfoOutcome = UserInfoOutcomeError | UserInfoOutcomeSuccess;

// Type Inheritance with Intersection
type SpecialDate = Date & { getDescription(): string };
const holiday: SpecialDate = Object.assign(new Date(), {
  getDescription: () => "Special day",
});

// Interfaces with extends
interface Animal {
  isAlive(): boolean;
}
interface Mammal extends Animal {
  getFurOrHairColor(): string;
}
interface Hamster extends Mammal {
  squeak(): string;
}

// Class Inheritance
class AnimalThatEats {
  eat(food: string) {
    console.log(`Eating ${food}`);
  }
}
class Cat extends AnimalThatEats {
  meow() {
    return "meow";
  }
}

// Class implements interface
interface AnimalLike {
  eat(food: string): void;
}
class Dog implements AnimalLike {
  eat(food: string) {
    console.log(`Dog eating ${food}`);
  }
  bark() {
    return "woof";
  }
}

// Multiple Inheritance/Implementation
class LivingOrganism {
  isAlive() {
    return true;
  }
}
interface CanBark {
  bark(): string;
}
class Dog2 extends LivingOrganism implements AnimalLike, CanBark {
  eat(food: string) {}
  bark() {
    return "woof";
  }
}

// Implementing Type Aliases
type CanJump = { jumpToHeight(): number };
class Rabbit implements CanJump {
  jumpToHeight() {
    return 1.5;
  }
}

//* Key Differences
// extends: Inherits actual implementation (classes) or structure (interfaces)
// implements: Must provide the implementation, just enforces the contract
// Interface extends interface: Adds more required properties/methods
// Class extends class: Inherits existing functionality
// Class implements interface: Must fulfill the interface contract
```

---

### Open Interfaces (Declaration Merging)

**Learned:** Interfaces declared multiple times merge into one.

```typescript
// Interfaces can be declared multiple times; TypeScript merges them
interface AnimalLike {
  eat(food: string): void;
}

interface AnimalLike {
  // ✅ Additional declaration is OK—gets merged
  isAlive(): boolean;
}

// Now AnimalLike has both eat() and isAlive()
function feed(animal: AnimalLike) {
  animal.eat("food"); // ✅ Available
  animal.isAlive(); // ✅ Available
}
```

---

### Global Type Augmentation (Declaration Merging)

**Learned:** You can safely extend built-in global interfaces.

```typescript
// Extend existing global interfaces (e.g., Window)
declare global {
  interface Window {
    exampleProperty: number; // Add custom property
  }
}

// Use the new property with proper typing
window.exampleProperty = 42; // ✅ Known by TypeScript
console.log(window.document); // ✅ Original properties remain
```

---

### Recursive Types

**Learned:** Recursive types model nested data structures.

```typescript
// Types that reference themselves for nested structures
type NestedNumbers = number | NestedNumbers[];

// Example usage
const val: NestedNumbers = [3, 4, [5, 6, [7], 59], 221];
if (typeof val !== "number") {
  val.push(41); // ✅ Valid: adding a number
  // val.push('string')     // ❌ Error: strings not allowed
}
```

---

### Common Recursive Patterns

**Learned:** Use unions and recursive definitions for JSON and trees.

```typescript
// JSONValue: primitives, arrays, or objects of JSONValue
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

// Generic TreeNode definition
type TreeNode<T> = {
  value: T;
  children?: TreeNode<T>[];
};
```

---

### Type Queries Cheatsheet

**Learned:** keyof, typeof, and indexed access extract and transform types.

```typescript
// keyof: get property names as a union
type DatePropertyNames = keyof Date; // e.g. "getTime" | "toDateString" | ...

// Filter keys by subtype
type DateStringPropertyNames = DatePropertyNames & string; // string keys
type DateSymbolPropertyNames = DatePropertyNames & symbol; // symbol keys

// typeof: capture shape of a value
const user = { name: "John", age: 30 };
type UserType = typeof user; // { name: string; age: number }

// Works with complex expressions
async function main() {
  const apiResponse = await Promise.all([
    fetch("https://example.com"),
    Promise.resolve("Titanium White"),
  ]);
  type ApiResponseType = typeof apiResponse; // [Response, string]
}

// Indexed access types: extract property types
interface Car {
  make: string;
  model: string;
  year: number;
  color: { red: string; green: string; blue: string };
}

type CarColor = Car["color"]; // { red: string; green: string; blue: string }
type CarMake = Car["make"]; // string
type RedComponent = Car["color"]["red"]; // string
type CarProperty = Car["color" | "year"]; // { color } | number

// Common patterns
type CarPropertyTypes = Car[keyof Car]; // string | number | { red: string; ... }
```

---

### Callables and Function Types Cheatsheet

**Learned:** Function signatures can be expressed with interfaces or type aliases.

```typescript
// Interface syntax: defines a callable signature
interface TwoNumberCalculation {
  (x: number, y: number): number;
}

// Type alias syntax: more common for function types
type TwoNumberCalc = (x: number, y: number) => number;

// Both work the same way
const add: TwoNumberCalculation = (a, b) => a + b;
const subtract: TwoNumberCalc = (x, y) => x - y;

// void vs undefined
function printData(obj: string[]): void {
  console.log(JSON.stringify(obj, null, "  "));
}

function strictCallback(callback: () => undefined) {
  setTimeout(callback, 1000);
}

function flexibleCallback(callback: () => void) {
  setTimeout(callback, 1000);
}

const values: number[] = [];

strictCallback(() => values.push(4)); // ❌ Error: push returns number, not undefined
flexibleCallback(() => values.push(4)); // ✅ Works: void accepts any return
```

---

### Classes Cheatsheet

**Learned:** Classes support fields, constructors, access modifiers, and static features.

```typescript
// Basic class with typed fields and methods
class Car {
  make: string;
  model: string;
  year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  honk(duration: number): string {
    return `h${"o".repeat(duration)}nk`;
  }
}

const sedan = new Car("Honda", "Accord", 2017);
sedan.honk(5); // "hooooonk"

// Static members
class CarWithStatic {
  static nextSerialNumber = 100;
  static generateSerialNumber() {
    return this.nextSerialNumber++;
  }

  serialNumber = CarWithStatic.generateSerialNumber();
  make: string;
  model: string;
  year: number;

  getLabel() {
    return `${this.make} ${this.model} ${this.year} - #${this.serialNumber}`;
  }
}

// Parameter properties shorthand
class CarShorthand {
  constructor(
    public make: string,
    private model: string,
    readonly year: number
  ) {}
}

// Method override example
class Truck extends Car {
  override honk(): string {
    return "BEEP!";
  }
}
```

---

### Type Guards Cheatsheet

**Learned:** Narrow types at runtime using built-in and custom checks.

```typescript
// Built-in guards: typeof, instanceof, in, Array.isArray
let value:
  | Date
  | null
  | undefined
  | "pineapple"
  | [number]
  | { dateRange: [Date, Date] };

if (value instanceof Date) {
  // value is Date
} else if (typeof value === "string") {
  // value is string
} else if (value === null) {
  // value is null
} else if (!value) {
  // value is null | undefined
} else if (Array.isArray(value)) {
  // value is [number]
} else if ("dateRange" in value) {
  // value is { dateRange: [Date, Date] }
}

// User-defined type guard
interface CarLike {
  make: string;
  model: string;
  year: number;
}

function isCarLike(valueToTest: any): valueToTest is CarLike {
  return (
    valueToTest &&
    typeof valueToTest === "object" &&
    "make" in valueToTest &&
    typeof valueToTest["make"] === "string" &&
    "model" in valueToTest &&
    typeof valueToTest["model"] === "string" &&
    "year" in valueToTest &&
    typeof valueToTest["year"] === "number"
  );
}

// Assertion type guard
function assertsIsCarLike(v: any): asserts v is CarLike {
  if (!isCarLike(v)) throw new Error("Not CarLike");
}

// Usage
let maybeCar: any;
if (isCarLike(maybeCar)) {
  // maybeCar is CarLike
}
assertsIsCarLike(maybeCar);
// maybeCar is CarLike
```

---

### Generics Cheatsheet

**Learned:** Generics eliminate duplication by abstracting over types.

```typescript
// Generic function to wrap any type in an array
function wrapInArray<T>(arg: T): T[] {
  return [arg];
}

// Generic list-to-dictionary converter
function listToDict<T>(
  list: T[],
  idGen: (item: T) => string
): { [k: string]: T } {
  const dict: { [k: string]: T } = {};
  list.forEach((item) => {
    dict[idGen(item)] = item;
  });
  return dict;
}

// Generic constraints example
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

// Multiple type parameters example
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}
```
