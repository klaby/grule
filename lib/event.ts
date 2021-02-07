import { IEvent } from '../src/interfaces'

export class Event implements IEvent {
  status: boolean

  constructor() {
    this.status = true
    this.when = this.when.bind(this)
  }

  /**
   * @method when
   *
   * @desc When a condition is "true".
   *
   * @param result
   */
  when(result: boolean): this {
    this.status = result
    return this
  }

  /**
   * @method when
   *
   * @desc So do something.
   *
   * @param event
   */
  then(event: Function): boolean {
    if (this.status) {
      event(this.status)
    }

    return this.status
  }
}
