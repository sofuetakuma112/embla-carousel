import { Limit } from './Limit'
import { mathAbs } from './utils'

export type CounterType = {
  get: () => number
  set: (n: number) => CounterType
  add: (n: number) => CounterType
  clone: () => CounterType
}

/**
 * カウンターを作成します。
 * @param {number} max - カウンターの最大値。
 * @param {number} start - 初期値。
 * @param {boolean} loop - ループするかどうか。
 * @returns {CounterType} カウンターオブジェクト。
 */
export function Counter(
  max: number,
  start: number,
  loop: boolean
): CounterType {
  const { constrain } = Limit(0, max)
  const loopEnd = max + 1
  let counter = withinLimit(start)

  /**
   * 数値を制限内に収めます。
   * @param {number} n - 数値。
   * @returns {number} 制限内の数値。
   */
  function withinLimit(n: number): number {
    return !loop ? constrain(n) : mathAbs((loopEnd + n) % loopEnd)
  }

  /**
   * カウンターの現在値を取得します。
   * @returns {number} カウンターの現在値。
   */
  function get(): number {
    return counter
  }

  /**
   * カウンターの値を設定します。
   * @param {number} n - 新しいカウンターの値。
   * @returns {CounterType} カウンターオブジェクト。
   */
  function set(n: number): CounterType {
    counter = withinLimit(n)
    return self
  }

  /**
   * カウンターの値を加算します。
   * @param {number} n - 加算する値。
   * @returns {CounterType} 新しいカウンターオブジェクト。
   */
  function add(n: number): CounterType {
    return clone().set(get() + n)
  }

  /**
   * カウンターオブジェクトをクローンします。
   * @returns {CounterType} クローンされたカウンターオブジェクト。
   */
  function clone(): CounterType {
    return Counter(max, get(), loop)
  }

  const self: CounterType = {
    get,
    set,
    add,
    clone
  }
  return self
}
