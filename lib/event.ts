export class Event {
  constructor() {
    this.when = this.when.bind(this)
  }

  /**
   * @method when
   *
   * @desc When a condition is "true".
   *
   * @param result
   */
  when(result: boolean): Promise<boolean> {
    return Promise.resolve(result)
  }
}
