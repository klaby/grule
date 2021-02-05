import { IEvents, IOperator } from './interfaces'
import { Exception } from './exception'

/**
 * @function $when
 * @desc Condition testing for rules.
 * @param condition
 * @param event
 */
export const $when = (
  condition: IOperator.IBuilder,
  event?: Function,
): IEvents.ISchema => ({
  condition,
  event,
})

/**
 * @function $throw
 * @desc Throw an error for a condition.
 * @param message
 */
export const $throw = (message: string) => (): never => {
  throw new Exception('Engine', message)
}
