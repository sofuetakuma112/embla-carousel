import { NodeRectType } from './NodeRects'

export type AxisOptionType = 'x' | 'y'
export type AxisDirectionOptionType = 'ltr' | 'rtl'
type AxisEdgeType = 'top' | 'right' | 'bottom' | 'left'

export type AxisType = {
  scroll: AxisOptionType
  cross: AxisOptionType
  startEdge: AxisEdgeType
  endEdge: AxisEdgeType
  measureSize: (nodeRect: NodeRectType) => number
  direction: (n: number) => number
}

/**
 * 軸オブジェクトを作成します。
 * @param {AxisOptionType} axis - 軸オプション。
 * @param {AxisDirectionOptionType} contentDirection - コンテンツの方向。
 * @returns {AxisType} 軸オブジェクト。
 */
export function Axis(
  axis: AxisOptionType,
  contentDirection: AxisDirectionOptionType
): AxisType {
  const isRightToLeft = contentDirection === 'rtl'
  const isVertical = axis === 'y'
  const scroll = isVertical ? 'y' : 'x' // "x"
  const cross = isVertical ? 'x' : 'y' // "y"
  const sign = !isVertical && isRightToLeft ? -1 : 1 // 1
  const startEdge = getStartEdge() // "left"
  const endEdge = getEndEdge() // "right"

  /**
   * 要素のサイズを測定します。
   * @param {NodeRectType} nodeRect - 要素の矩形情報。
   * @returns {number} 要素の幅または高さ。
   */
  function measureSize(nodeRect: NodeRectType): number {
    const { height, width } = nodeRect
    return isVertical ? height : width
  }

  /**
   * 要素の開始エッジを取得します。
   * @returns {AxisEdgeType} 開始エッジ。
   */
  function getStartEdge(): AxisEdgeType {
    if (isVertical) return 'top'
    return isRightToLeft ? 'right' : 'left'
  }

  /**
   * 要素の終了エッジを取得します。
   * @returns {AxisEdgeType} 終了エッジ。
   */
  function getEndEdge(): AxisEdgeType {
    if (isVertical) return 'bottom'
    return isRightToLeft ? 'left' : 'right'
  }

  /**
   * 数値の方向を返します。
   * @param {number} n - 数値。
   * @returns {number} 方向が処理された数値。
   */
  function direction(n: number): number {
    return n * sign
  }

  const self: AxisType = {
    scroll,
    cross,
    startEdge,
    endEdge,
    measureSize,
    direction
  }
  return self
}
