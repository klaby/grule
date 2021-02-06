import { Idle, IOperator } from './interfaces'

/**
 * @function $less
 * @desc Expression (a < b)
 * @param a
 * @param b
 */
export const $less = <A = IOperator.ILess>(a: A, b: A): IOperator.IBuilder => ({
  method: '$less',
  result: a < b,
  values: { a, b },
})

/**
 * @function $lessOrEqual
 * @desc Expression (a <= b)
 * @param a
 * @param b
 */
export const $lessOrEqual = <A = IOperator.ILess>(
  a: A,
  b: A,
): IOperator.IBuilder => ({
  method: '$lessOrEqual',
  result: a <= b,
  values: { a, b },
})

/**
 * @function $greater
 * @desc Expression (a > b)
 * @param a
 * @param b
 */
export const $greater = <A = IOperator.IGreater>(
  a: A,
  b: A,
): IOperator.IBuilder => ({
  method: '$greater',
  result: a > b,
  values: { a, b },
})

/**
 * @function $greaterOrEqual
 * @desc Expression (a >= b)
 * @param a
 * @param b
 */
export const $greaterOrEqual = <A = IOperator.IGreater>(
  a: A,
  b: A,
): IOperator.IBuilder => ({
  method: '$greaterOrEqual',
  result: a >= b,
  values: { a, b },
})

/**
 * @function $equal
 * @desc Expression (a === b)
 * @param a
 * @param b
 */
export const $equal = <A = IOperator.IEqual>(
  a: A,
  b: A,
): IOperator.IBuilder => ({
  method: '$equal',
  result: a === b,
  values: { a, b },
})

/**
 * @function $diff
 * @desc Expression (a !== b)
 * @param a
 * @param b
 */
export const $diff = <A = IOperator.IEqual>(
  a: A,
  b: A,
): IOperator.IBuilder => ({
  method: '$diff',
  result: a !== b,
  values: { a, b },
})

/**
 * @function $diff
 * @desc Expression (a.includes(b))
 * @param a
 * @param b
 */
export const $in = <A = IOperator.In>(
  a: A,
  b: IOperator.IEqual,
): IOperator.IBuilder => ({
  method: '$in',
  result: (a as Idle).includes(b),
  values: { a, b },
})

/**
 * @function $notIn
 * @desc Expression (!a.includes(b))
 * @param a
 * @param b
 */
export const $notIn = <A = IOperator.In>(
  a: A,
  b: IOperator.IEqual,
): IOperator.IBuilder => ({
  method: '$notIn',
  result: !(a as Idle).includes(b),
  values: { a, b },
})
