import { isString } from './utils'

export type AlignmentOptionType =
  | 'start'
  | 'center'
  | 'end'
  | ((viewSize: number, snapSize: number, index: number) => number)

export type AlignmentType = {
  measure: (n: number, index: number) => number
}

/**
 * アラインメント（配置）を計算するための関数を生成します。
 * @param {AlignmentOptionType} align - アラインメントオプション。'start'、'center'、'end'、またはカスタム関数。
 * @param {number} viewSize - ビューのサイズ。
 * @returns {AlignmentType} アラインメントオブジェクト。
 */
export function Alignment(
  align: AlignmentOptionType,
  viewSize: number
): AlignmentType {
  const predefined = { start, center, end }

  /**
   * 開始位置を返します。
   * @returns {number} 開始位置（常に0）。
   */
  function start(): number {
    return 0
  }

  /**
   * 中央位置を計算します。
   * @param {number} n - 要素のサイズ。
   * @returns {number} 中央位置。
   */
  function center(n: number): number {
    return end(n) / 2
  }

  /**
   * 終了位置を計算します。
   * @param {number} n - 要素のサイズ。
   * @returns {number} 終了位置。
   */
  function end(n: number): number {
    return viewSize - n
  }

  /**
   * 要素の位置を計算します。
   * @param {number} n - 要素のサイズ。
   * @param {number} index - 要素のインデックス。
   * @returns {number} 要素の位置。
   */
  function measure(n: number, index: number): number {
    if (isString(align)) return predefined[align](n)
    return align(viewSize, n, index) // スライド要素の表示位置をカスタマイズしたい時に使う？
  }

  const self: AlignmentType = {
    measure
  }
  return self
}
