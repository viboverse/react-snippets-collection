// TypeScript Cheatsheet

//* Variables and Valu//* Type Assertions (Casting)
let assertion2 = 79 as const // Type: 79 (literal)
let assertion3 = 'hello' as any as Date // Double assertionSummary

//* Type Inference vs Explicit Types
let temperature = 6 // TypeScript infers: number
let endTime: Date // Explicit type annotation (undefined initially)

//* Literal Types vs General Types
const humidity = 79 // Type: 79 (literal - cannot change)
let temp = 19 // Type: number (general - can be any number)
let humid = 79 as const // Type: 79 (forcing literal type with 'as const')

//* Type Compatibility (Sets Theory)
// TypeScript treats types as sets of values
// Assignment works if source type is subset of target type
temp = humid // ✅ {79} is subset of {all numbers}
// humid = temp; // ❌ {all numbers} is NOT subset of {79}

//* Type Assertions (Casting)
let assertion1 = 20 as 23 // Lie to TypeScript: tell it 20 is type 23
let safe = 79 as number // Safe: 79 IS a number
let dangerous = 'oops' as any as Date // Dangerous: string pretending to be Date

//* Function Type Annotations
function add(a: number, b: number): number {
  return a + b // Parameters and return type specified
}

//* Implicit 'any' Problem
function badAdd(a, b) {
  // TypeScript can't infer types = 'any'
  return a + b // Could be numbers, strings, anything!
}

//===================================================================

//* Object Type Annotations
const myCar = { make: 'Mazda', model: 'mazda6', year: 2023 }
let car: { make: string; model: string; year: number } = myCar

//* Optional Properties (?)
function printCar(car: { make: string; chargeVoltage?: number }) {
  console.log(`${car.make} ${car.chargeVoltage || 'N/A'}`)
}

//* Excess Property Checking
// printCar({ make: "Tesla", extra: "fails" }); // ❌ Direct literal
const obj = { make: 'Tesla', extra: 'works' }
printCar(obj) // ✅ Variable assignment

//* Type Assertions (Casting)
let x = 79 as const // Type: 79 (literal)
let y = 'hello' as any as Date // Double assertion

//* Arrays vs Tuples
const arr: number[] = [1, 2, 3] // Any length
const tuple: [number, string] = [1, 'hello'] // Fixed length & types

//* Immutable Arrays/Tuples
const roArr: readonly number[] = [1, 2, 3]
const roTuple: readonly [number, string] = [1, 'hello']
// roArr.push(4); // ❌ Error
// roTuple[0] = 2; // ❌ Error

//* Index Signatures (Dynamic Keys)
const phones: { [key: string]: { area: string; number: string } } = {}
//So I can add as many keys I want to this obj, but the format should be string

//* Computed Property Names
const key = 'name'
const obj2 = { [key]: 'value' } // { name: "value" }

//* Type Systems
// Static vs Dynamic: When types are checked (compile vs runtime)
// Nominal vs Structural: Name-based vs shape-based compatibility
// Duck Typing: "If it quacks like a duck..."

// ==============================================
// Union and Intersection Types Cheatsheet

//* Union Types (|)
// Represents values that could be one of several types
type Status = 'success' | 'error' | 'loading'
let result: number | string // Can be either number or string

//* Literal Union Types
// Union of specific literal values
type OneThroughFive = 1 | 2 | 3 | 4 | 5
type Evens = 2 | 4 | 6 | 8

//* Union Type Behavior
// - Values: Can be ANY value from EITHER set
let unionExample: Evens | OneThroughFive = 6 // ✅ Valid
// - Operations: Limited to what's common to ALL types in union
// printEven(unionExample) // ❌ Not guaranteed to be even
// printLowNumber(unionExample) // ❌ Not guaranteed to be in {1-5}

//* Type Narrowing
// Refines types within conditional blocks
function handleResponse(response: string | Error) {
  if (response instanceof Error) {
    console.log(response.message) // ✅ Safe - narrowed to Error
  } else {
    console.log(response.toUpperCase()) // ✅ Safe - narrowed to string
  }
}

//* Discriminated Unions
// Using a property to determine the type
type Result =
  | ['success', { name: string; email: string }]
  | ['error', Error]

function handleResult([status, data]: Result) {
  if (status === 'error') {
    console.log(data.message) // ✅ data is Error
  } else {
    console.log(data.email) // ✅ data is user info
  }
}

//* Intersection Types (&)
// Combines multiple types into one
type Combined = { name: string } & { age: number } // Must have both properties

//* Intersection Type Behavior
// - Values: Must satisfy ALL constraints simultaneously
type CommonValues = Evens & OneThroughFive // Only 2 and 4
let bothSets: CommonValues = 4 // ✅ Valid - in both sets
// - Operations: Can use operations from ALL included types
// printEven(bothSets) // ✅ Guaranteed to be even
// printLowNumber(bothSets) // ✅ Guaranteed to be in {1-5}

// ==============================================
// Type Aliases Cheatsheet

//* Basic Type Aliases
// Create reusable names for complex types
type Amount = {
  currency: string
  value: number
}

type Status = 'pending' | 'approved' | 'rejected'
type ID = string | number

//* Using Type Aliases
function processPayment(amount: Amount, status: Status) {
  // TypeScript knows the structure of Amount and valid Status values
}

//* Complex Type Aliases with Unions
type UserInfoOutcomeError = readonly ['error', Error]
type UserInfoOutcomeSuccess = readonly [
  'success',
  { name: string; email: string },
]
type UserInfoOutcome = UserInfoOutcomeError | UserInfoOutcomeSuccess

//* Type Inheritance with Intersection (&)
// Combine existing types to create new ones
type SpecialDate = Date & { getDescription(): string }

// Usage requires ALL properties from both types
const holiday: SpecialDate = Object.assign(new Date(), {
  getDescription: () => 'Special day',
})

//* Benefits of Type Aliases
// 1. Reusability: Define once, use everywhere
// 2. Readability: Descriptive names instead of complex inline types
// 3. Maintainability: Change definition in one place
// 4. Documentation: Self-documenting code with meaningful type names

//* Type Aliases vs Interfaces
// Type aliases: More flexible, can alias primitives, unions, intersections
// Interfaces: Better for object shapes, can be extended/merged
type StringOrNumber = string | number // ✅ Type alias
// interface StringOrNumber = string | number // ❌ Can't do this with interface

//* Interface Inheritance with `extends`
// Interfaces can extend other interfaces to inherit their properties
interface Animal {
  isAlive(): boolean
}
interface Mammal extends Animal {
  getFurOrHairColor(): string
  // Now has both isAlive() AND getFurOrHairColor()
}
interface Hamster extends Mammal {
  squeak(): string
  // Now has isAlive(), getFurOrHairColor(), AND squeak()
}

//* Class Inheritance with `extends`
// Classes inherit properties and methods from parent classes
class AnimalThatEats {
  eat(food: string) {
    console.log(`Eating ${food}`)
  }
}
class Cat extends AnimalThatEats {
  meow() {
    return 'meow'
  }
  // Cat has BOTH eat() method AND meow() method
}

//* Class Implementation with `implements`
// Classes must provide all methods defined in the interface
interface AnimalLike {
  eat(food: string): void
}
class Dog implements AnimalLike {
  eat(food: string) {
    // Must implement this method
    console.log(`Dog eating ${food}`)
  }
  bark() {
    return 'woof'
  }
}

//* Multiple Inheritance/Implementation
// Classes can extend one class AND implement multiple interfaces
class LivingOrganism {
  isAlive() {
    return true
  }
}
interface CanBark {
  bark(): string
}
class Dog2 extends LivingOrganism implements AnimalLike, CanBark {
  // Must implement ALL interface methods
  eat(food: string) {
    /* implementation */
  }
  bark() {
    return 'woof'
  }
  // Also inherits isAlive() from LivingOrganism
}

//* Implementing Type Aliases
// Classes can implement type aliases (if they represent object shapes)
type CanJump = {
  jumpToHeight(): number
}
class Rabbit implements CanJump {
  jumpToHeight() {
    return 1.5
  }
}

//* Key Differences
// extends: Inherits actual implementation (classes) or structure (interfaces)
// implements: Must provide the implementation, just enforces the contract
// Interface extends interface: Adds more required properties/methods
// Class extends class: Inherits existing functionality
// Class implements interface: Must fulfill the interface contract

//* Open Interfaces (Declaration Merging)
// Interfaces can be declared multiple times and TypeScript merges them
interface AnimalLike {
  eat(food: string): void
}

interface AnimalLike {
  // ✅ Additional declaration is OK - gets merged
  isAlive(): boolean
}

// Now AnimalLike has BOTH eat() AND isAlive() methods
function feed(animal: AnimalLike) {
  animal.eat('food') // ✅ Available
  animal.isAlive() // ✅ Available
}

//* Declaration Merging Use Case: Augmenting Global Types
// Extend existing global interfaces (like Window, Array, etc.)
declare global {
  interface Window {
    exampleProperty: number // Add custom property to Window
  }
}

// Now you can use it safely
window.exampleProperty = 42 // ✅ TypeScript knows this exists
window.document // ✅ Still has all original properties

//* Recursive Types
// Types that reference themselves - useful for nested structures
type NestedNumbers = number | NestedNumbers[]

// Usage: Can be a number OR an array of NestedNumbers
const val: NestedNumbers = [3, 4, [5, 6, [7], 59], 221]

if (typeof val !== 'number') {
  val.push(41) // ✅ Valid - adding number
  // val.push('string')             // ❌ Error - strings not allowed
}

//* Common Recursive Type Patterns
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue }

type TreeNode<T> = {
  value: T
  children?: TreeNode<T>[]
}

//* Key Benefits
// - Declaration Merging: Extend existing types without modifying original code
// - Global Augmentation: Add properties to built-in types safely
// - Recursive Types: Model complex nested data structures
// - Type Safety: Maintain type checking even with dynamic structures
