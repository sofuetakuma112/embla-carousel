import { mathAbs } from './utils'

export type LimitType = {
  min: number
  max: number
  length: number
  constrain: (n: number) => number
  reachedAny: (n: number) => boolean
  reachedMax: (n: number) => boolean
  reachedMin: (n: number) => boolean
  removeOffset: (n: number) => number
}

/**
 * 数値の範囲制限を作成します。
 * @param {number} [min=0] - 最小値。
 * @param {number} [max=0] - 最大値。
 * @returns {LimitType} 制限オブジェクト。
 */
export function Limit(min: number = 0, max: number = 0): LimitType {
  const length = mathAbs(min - max)

  /**
   * 数値が最小値を下回ったかを確認します。
   * @param {number} n - 数値。
   * @returns {boolean} 最小値を下回った場合はtrue、それ以外はfalse。
   */
  function reachedMin(n: number): boolean {
    return n < min
  }

  /**
   * 数値が最大値を超えたかを確認します。
   * @param {number} n - 数値。
   * @returns {boolean} 最大値を超えた場合はtrue、それ以外はfalse。
   */
  function reachedMax(n: number): boolean {
    return n > max
  }

  /**
   * 数値が最小値または最大値を超えているかを確認します。
   * @param {number} n - 数値。
   * @returns {boolean} 最小値または最大値を超えている場合はtrue、それ以外はfalse。
   */
  function reachedAny(n: number): boolean {
    return reachedMin(n) || reachedMax(n)
  }

  /**
   * 数値を制限内に収めます。
   * @param {number} n - 数値。
   * @returns {number} 制限内の数値。
   */
  function constrain(n: number): number {
    if (!reachedAny(n)) return n
    return reachedMin(n) ? min : max
  }

  /**
   * オフセットを取り除きます。
   * @param {number} n - 数値。
   * @returns {number} オフセットを取り除いた数値。
   */
  function removeOffset(n: number): number {
    if (!length) return n
    return n - length * Math.ceil((n - max) / length)
  }

  const self: LimitType = {
    length,
    max,
    min,
    constrain,
    reachedAny,
    reachedMax,
    reachedMin,
    removeOffset
  }
  return self
}
