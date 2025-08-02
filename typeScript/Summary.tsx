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

// Type Queries Cheatsheet

//* keyof Operator
// Gets all property names of a type as a union of string literals
type DatePropertyNames = keyof Date // "getTime" | "toDateString" | "getFullYear" | ...

// Filter keyof results by type
type DateStringPropertyNames = DatePropertyNames & string // Only string keys
type DateSymbolPropertyNames = DatePropertyNames & symbol // Only symbol keys

//* typeof Operator
// Gets the type of a value (not the JavaScript typeof!)
const user = { name: 'John', age: 30 }
type UserType = typeof user // { name: string; age: number }

// Works with complex expressions
async function main() {
  const apiResponse = await Promise.all([
    fetch('https://example.com'),
    Promise.resolve('Titanium White'),
  ])
  type ApiResponseType = typeof apiResponse // [Response, string]
}

//* Indexed Access Types
// Extract types from object properties using bracket notation
interface Car {
  make: string
  model: string
  year: number
  color: {
    red: string
    green: string
    blue: string
  }
}

type CarColor = Car['color'] // { red: string; green: string; blue: string }
type CarMake = Car['make'] // string
type RedComponent = Car['color']['red'] // string (nested access)
type CarProperty = Car['color' | 'year'] // Car["color"] | Car["year"] (union)

//* Common Patterns
// Get all property value types
type CarPropertyTypes = Car[keyof Car] // string | number | { red: string; green: string; blue: string }

// Extract array element type
type StringArray = string[]
type StringType = StringArray[number] // string

// Extract function return type
function getData() {
  return { id: 1, name: 'test' }
}
type DataType = ReturnType<typeof getData> // { id: number; name: string }

//* Key Benefits
// - keyof: Get all possible property names
// - typeof: Capture types from existing values
// - Indexed Access: Extract specific property types
// - Type Safety: All operations are checked at compile time

// ==============================================
// Callables and Function Types Cheatsheet

//* Function Type Definitions
// Two ways to define function types

// Interface syntax
interface TwoNumberCalculation {
  (x: number, y: number): number
}

// Type alias syntax (more common)
type TwoNumberCalc = (x: number, y: number) => number

// Both work the same way
const add: TwoNumberCalculation = (a, b) => a + b
const subtract: TwoNumberCalc = (x, y) => x - y

//* void vs undefined Return Types
// void: "I don't care what this function returns"
// undefined: "This function must return exactly undefined"

function printData(obj: string[]) {
  console.log(JSON.stringify(obj, null, '  '))
  // Returns undefined, but return type is inferred as void
}

// Strict undefined return
function strictCallback(callback: () => undefined) {
  setTimeout(callback, 1000)
}

// Flexible void return (recommended)
function flexibleCallback(callback: () => void) {
  setTimeout(callback, 1000)
}

const values: number[] = []
// strictCallback(() => values.push(4))    // ❌ Error: push returns number, not undefined
flexibleCallback(() => values.push(4)) // ✅ Works: void accepts any return value

//* Constructable Types
// Define types for constructor functions
interface DateConstructor {
  new (value: number): Date
}

let MyDateConstructor: DateConstructor = Date
const d = new MyDateConstructor(1697923072611)

//* Function Type Best Practices
// - Use () => void for callbacks that can return anything
// - Use () => undefined only when you need exactly undefined
// - Prefer type aliases over interface for simple function types
// - Be explicit about return types for better error messages

//* Common Function Type Patterns
type EventHandler<T> = (event: T) => void
type Predicate<T> = (value: T) => boolean
type Mapper<T, U> = (value: T) => U
type AsyncOperation<T> = () => Promise<T>

// ==============================================
// Classes Cheatsheet

//* Basic Class Structure
class Car {
  // Field declarations with types
  make: string
  model: string
  year: number

  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }

  // Method with return type
  honk(duration: number): string {
    return `h${'o'.repeat(duration)}nk`
  }
}

const sedan = new Car('Honda', 'Accord', 2017)
sedan.honk(5) // "hooooonk"

//* Static Members
class CarWithStatic {
  static nextSerialNumber = 100
  static generateSerialNumber() {
    return this.nextSerialNumber++
  }

  serialNumber = CarWithStatic.generateSerialNumber()

  getLabel() {
    return `${this.make} ${this.model} ${this.year} - #${this.serialNumber}`
  }
}

//* Static Blocks (Initialization)
class CarWithStaticBlock {
  static {
    // Runs when class is first loaded
    fetch('https://api.example.com/data')
      .then((response) => response.json())
      .then((data) => {
        this.nextSerialNumber = data.lastId + 1
      })
  }
}

//* Access Modifiers
class CarWithModifiers {
  private _serialNumber = Car.generateSerialNumber() // Only this class
  protected brand: string // This class + subclasses
  public year: number // Everyone (default)

  protected get serialNumber() {
    // Getter with access modifier
    return this._serialNumber
  }

  private static nextSerialNumber: number // Private static
}

//* JavaScript Private Fields (#)
class CarWithPrivate {
  #serialNumber = 100 // Truly private (JS runtime)
  static #nextId = 1 // Private static

  #generateId() {
    // Private method
    return CarWithPrivate.#nextId++
  }

  // Private field presence check
  equals(other: unknown) {
    if (
      other &&
      typeof other === 'object' &&
      #serialNumber in other
    ) {
      return other.#serialNumber === this.#serialNumber
    }
    return false
  }
}

//* Parameter Properties (Shorthand)
class CarShorthand {
  constructor(
    public make: string, // Automatically creates and assigns public field
    private model: string, // Automatically creates and assigns private field
    readonly year: number, // Automatically creates readonly field
  ) {
    // No need to manually assign this.make = make, etc.
  }
}

//* Method Overrides
class Truck extends Car {
  override honk(): string {
    // Explicit override (recommended)
    return 'BEEP!'
  }
}

//* Key Differences: TypeScript vs JavaScript Privacy
// TypeScript (private/protected): Compile-time only, stripped in JS
// JavaScript (#fields): Runtime privacy, truly private
// readonly: TypeScript compile-time protection only

//* Common Patterns
// - Use public for external API
// - Use private for internal implementation
// - Use protected for inheritance
// - Use # for true runtime privacy
// - Use parameter properties for simple constructors

// ==============================================
// Type Guards Cheatsheet

//* Built-in Type Guards
// TypeScript automatically narrows types based on these checks
let value:
  | Date
  | null
  | undefined
  | 'pineapple'
  | [number]
  | { dateRange: [Date, Date] }

// instanceof - checks if object is instance of a class
if (value instanceof Date) {
  value // Type: Date
}
// typeof - checks primitive types
else if (typeof value === 'string') {
  value // Type: 'pineapple'
}
// Specific value check
else if (value === null) {
  value // Type: null
}
// Truthy/falsy check
else if (!value) {
  value // Type: null | undefined
}
// Built-in functions
else if (Array.isArray(value)) {
  value // Type: [number]
}
// Property presence check
else if ('dateRange' in value) {
  value // Type: { dateRange: [Date, Date] }
}

//* User-Defined Type Guards
interface CarLike {
  make: string
  model: string
  year: number
}

// Basic type guard function
function isCarLike(valueToTest: any): valueToTest is CarLike {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'make' in valueToTest &&
    typeof valueToTest['make'] === 'string' &&
    'model' in valueToTest &&
    typeof valueToTest['model'] === 'string' &&
    'year' in valueToTest &&
    typeof valueToTest['year'] === 'number'
  )
}

// Usage
let maybeCar: any
if (isCarLike(maybeCar)) {
  maybeCar // Type: CarLike (TypeScript knows it's safe)
}

//* Assertion Type Guards
// Throws error if condition fails, otherwise narrows type
function assertsIsCarLike(
  valueToTest: any,
): asserts valueToTest is CarLike {
  if (!isCarLike(valueToTest)) {
    throw new Error(
      `Value does not appear to be a CarLike: ${valueToTest}`,
    )
  }
}

// Usage
assertsIsCarLike(maybeCar)
maybeCar // Type: CarLike (after assertion)

//* Private Field Type Guards
class Car {
  #serialNumber = 100

  static isCar(other: any): other is Car {
    return (
      other && typeof other === 'object' && #serialNumber in other // Private field presence check
    )
  }
}

//* Advanced Narrowing Patterns
// Switch with type guards
function handleValue(val: Fish | Bird) {
  switch (true) {
    case val instanceof Bird:
      val.fly() // Type: Bird
      break
    case val instanceof Fish:
      val.swim() // Type: Fish
      break
  }
}

//* Type Guard Best Practices
// ❌ Bad: Lies about what it checks
function isBadNull(val: any): val is null {
  return !val // This is false for "", 0, false, etc.
}

// ✅ Good: Accurately checks what it claims
function isNull(val: any): val is null {
  return val === null
}

//* Common Type Guard Patterns
type NetworkResponse =
  | { success: true; data: any }
  | { success: false; error: string }

function isSuccess(
  response: NetworkResponse,
): response is { success: true; data: any } {
  return response.success === true
}

// Usage
if (isSuccess(response)) {
  console.log(response.data) // Safe access to data
} else {
  console.log(response.error) // Safe access to error
}

// ==============================================
// Generics Cheatsheet

//* The Problem: Code Duplication
// Without generics, you'd need separate functions for each type
function wrapStringInArray(arg: string): string[] {
  return [arg]
}
function wrapNumberInArray(arg: number): number[] {
  return [arg]
}
// ... and so on for every type

//* Generic Functions
// One function that works with any type
function wrapInArray<T>(arg: T): T[] {
  return [arg]
}

// Usage - TypeScript infers the type
const stringArray = wrapInArray('hello') // Type: string[]
const numberArray = wrapInArray(42) // Type: number[]
const dateArray = wrapInArray(new Date()) // Type: Date[]

//* Real-World Example: List to Dictionary
interface PhoneInfo {
  customerId: string
  areaCode: string
  num: string
}

// Generic function to convert any array to dictionary
function listToDict<T>(
  list: T[], // Array of any type T
  idGen: (arg: T) => string, // Function to generate key from T
): { [k: string]: T } {
  // Return dictionary of T
  const dict: { [k: string]: T } = {}

  list.forEach((element) => {
    const dictKey = idGen(element)
    dict[dictKey] = element
  })

  return dict
}

// Usage with different types
const phoneList: PhoneInfo[] = [
  { customerId: '0001', areaCode: '321', num: '123-4566' },
  { customerId: '0002', areaCode: '174', num: '142-3626' },
]

const phoneDict = listToDict(phoneList, (item) => item.customerId)
// Type: { [k: string]: PhoneInfo }

const dateDict = listToDict(
  [new Date('2021-01-01'), new Date('2021-12-31')],
  (date) => date.toISOString(),
)
// Type: { [k: string]: Date }

//* Dictionary Operations (Generic Utilities)
interface Dict<T> {
  [k: string]: T
}

// Generic map function for dictionaries
function mapDict<T, U>(
  dict: Dict<T>,
  mapFn: (value: T, key: string) => U,
): Dict<U> {
  const result: Dict<U> = {}
  Object.entries(dict).forEach(([key, value]) => {
    result[key] = mapFn(value, key)
  })
  return result
}

// Generic filter function for dictionaries
function filterDict<T>(
  dict: Dict<T>,
  filterFn: (value: T, key: string) => boolean,
): Dict<T> {
  const result: Dict<T> = {}
  Object.entries(dict).forEach(([key, value]) => {
    if (filterFn(value, key)) {
      result[key] = value
    }
  })
  return result
}

//* Generic Constraints
// Restrict generic types to have certain properties
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length // Safe because T must have length property
}

getLength('hello') // ✅ string has length
getLength([1, 2, 3]) // ✅ array has length
// getLength(42)       // ❌ number doesn't have length

//* Multiple Type Parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second]
}

const result = pair('hello', 42) // Type: [string, number]

//* Generic Best Practices
// ❌ Don't use generics just to return `any`
function badGeneric<T>(arg: any): T {
  return arg // This defeats the purpose
}

// ✅ Use generics to maintain type relationships
function goodGeneric<T>(arg: T): T {
  return arg // Input type matches output type
}

//* Common Generic Patterns
// - Collections: Array<T>, Dict<T>, Set<T>
// - Functions: Promise<T>, Observable<T>
// - Utilities: Partial<T>, Required<T>, Pick<T, K>
// - API responses: Response<T>, Result<T, E>
