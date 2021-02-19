<div align="center">
<img width="250" alt="grule logo" src="./assets/grule.svg"/>
</div>

<h3 align="center"> A simple and powerful mechanism for validating rules in JSON. </h3>

<p align="center">
<sub>Built with ❤︎ by <a href="https://hiukky.com">Hiukky</a>
<br/>
</p>

<br>

<div align="center">
<a href="https://github.com/hiukky/grule/stargazers">
<img alt="GitHub stars" src="https://img.shields.io/github/stars/hiukky/grule?color=23D18C&style=for-the-badge&colorA=1F2630">
</a>
<a href="https://github.com/hiukky/grule/issues">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/hiukky/grule?style=for-the-badge&color=23D18C&colorA=1F2630">
</a>
<a href="https://github.com/hiukky/grule/network">
<img alt="GitHub forks" src="https://img.shields.io/github/forks/hiukky/grule?color=23D18C&style=for-the-badge&colorA=1F2630">
</a>
</div>

<div align="center">
<a href="https://www.npmjs.com/package/grule">
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/grule?color=1F2630&style=for-the-badge&colorA=1F2630&label=size">
</a>
</div>

<div align="center">
<a href="https://www.npmjs.com/package/grule">
<img alt="NPM" src="https://img.shields.io/npm/dt/grule?color=1F2630&style=for-the-badge&colorA=1F2630" />
</a>
</div>

# About

Grule is a minimal mechanism for testing conditions against values using a JSON scheme. Its main objective is to work as a Rete mechanism and to solve all operations in a performatic and simple way.

<br>

# Installation

### Using NPM

```sh
npm i grule
```

### Using Yarn

```sh
yarn add grule
```

<br>

# Use

To set up your rules scheme, just follow the steps below.

### Create an instance

To create a test instance, you will need a load of facts to power the engine.

```ts
// Import Engine
import { Grule } from 'grule'

// Create an type
type IUser = {
  id: number
  name: string
}

// Create metadata
const metadata: IUser = {
  id: 3,
  name: 'test',
}

// Create instance
const grule = new Grule<IUser>(metadata)
```

### Subscribe rules

After creating an instance of the engine, pre-loading with facts, the next step is to register the rules. To register the rules, you must import the `IRules <T>` interface and create a set of rules for the attributes declared in the facts.

The rules follow the structure of the data declared in the facts. For each attribute a rule will be executed.

The rule creation function offers 2 arguments, the first being the `attributes` and the second the `events`.

You can use a logical expression for each test and perform an action you want, or you can use the `when` and `then` event to test and perform an action based on the result. This is a good option for dynamic testing.

After creating an instance and registering the rules, you can simply execute the run method by passing the rules defined as a parameter. At the end of the tests, if there is no error that interrupts the flow of the tests, a Boolean value will be returned.

- `true` all conditions have passed.
- `false` one or all of the conditions failed.

<br>

```ts
// ... Previous code

// Create Rules
const rules: IRules<IUser> = ({ id, name }, { when }) => ({
  id: when(id.diff(1)).then(() => {
    throw new Error('User not allowed.')
  }),
  name: name.in(['foo', 'test']),
})

// Enroll rules
grule.run(rules)
```

You can also simplify the previous flow in a cleaner way. (Example of final code)

```ts
// Import Engine
import { Grule } from 'grule'

// Create an type
type IUser = {
  id: number
  name: string
}

// Create instance
new Grule<IUser>({
  id: 3,
  name: 'test',
}).run(({ id, name }, { when }) => ({
  id: when(id.diff(1)).then(() => {
    throw new Error('User not allowed.')
  }),
  name: name.in(['foo', 'test']),
}))
```

## Available methods

### For Attributes

Each attribute has 9 methods available for the tests that are.

- **less**

```ts
// Type: less(value: ILess): boolean
// Acceptable: ['number', 'bigint']
```

- **lessOrEqual**

```ts
// Type: lessOrEqual(value: ILess): boolean
// Acceptable: ['number', 'bigint']
```

- **greater**

```ts
// Type: greater(value: IGreater): boolean
// Acceptable: ['number', 'bigint']
```

- **greaterOrEqual**

```ts
// Type: greaterOrEqual(value: IGreater): boolean
// Acceptable: ['number', 'bigint']
```

- **equal**

```ts
// Type: equal(value: IEqual): boolean
// Acceptable: ['bigint', 'boolean', 'number', 'string', 'date']
```

- **diff**

```ts
// Type: diff(value: IEqual): boolean
// Acceptable: ['bigint', 'boolean', 'number', 'string', 'date']
```

- **in**

```ts
// Type: in(value: In): boolean
// Acceptable: ['bigint', 'boolean', 'number', 'string', 'array']
```

- **notIn**

```ts
// Type: notIn(value: In): boolean
// Acceptable: ['bigint', 'boolean', 'number', 'string', 'array']
```

- **eval**

```ts
// Type: eval(operator: IOperatorsList, arg1: A): boolean
// Acceptable: [Idle]
```

### For Events

Grule currently has only one event than `when`. It returns a promise with a boolean result from the test performed.

- **when**

```ts
// Type: when(test: boolean): Promise<boolean>
// Acceptable: ['boolean']
```

# Contributing

Grule is in an initial version without many features yet, but you can feel free to send your suggestion or open a PR.

<br>

<div align="center">
<a target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/hiukky">
<img width="250" alt="buy me a coffee" src="./assets/coffe.svg"/>
</a>
</div>

<br>

<div align="center">
<a href="https://github.com/hiukky/grule/blob/master/LICENSE">
<img alt="GitHub license" src="https://img.shields.io/github/license/hiukky/grule?color=1F2630&style=for-the-badge&colorA=1F2630" />
</a>
</div>
