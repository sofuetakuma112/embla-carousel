import { AxisType } from './Axis'
import { NodeRectType } from './NodeRects'
import { arrayIsLastIndex, arrayLast, mathAbs, WindowType } from './utils'

export type SlideSizesType = {
  slideSizes: number[]
  slideSizesWithGaps: number[]
  startGap: number
  endGap: number
}

/**
 * スライドのサイズ情報を計算します。
 * @param {AxisType} axis - 軸情報オブジェクト。
 * @param {NodeRectType} containerRect - コンテナの矩形情報。
 * @param {NodeRectType[]} slideRects - スライドの矩形情報。
 * @param {HTMLElement[]} slides - スライド要素の配列。
 * @param {boolean} readEdgeGap - エッジギャップを読み取るかどうか。
 * @param {WindowType} ownerWindow - ウィンドウオブジェクト。
 * @returns {SlideSizesType} スライドサイズ情報オブジェクト。
 */
export function SlideSizes(
  axis: AxisType,
  containerRect: NodeRectType,
  slideRects: NodeRectType[],
  slides: HTMLElement[],
  readEdgeGap: boolean, // デフォルトは恐らくtrue
  ownerWindow: WindowType
): SlideSizesType {
  const {
    measureSize, // 引数のnodeRectの幅を返す
    startEdge, // "left"
    endEdge // "right"
  } = axis
  const withEdgeGap = slideRects[0] && readEdgeGap
  const startGap = measureStartGap()
  const endGap = measureEndGap()
  const slideSizes = slideRects.map(measureSize) // 要素自身の幅のみ
  const slideSizesWithGaps = measureWithGaps() // 要素自身の幅 + padding（先頭と、末尾の要素の場合はpaddingの代わりにviewportとの隙間分）

  /**
   * 始端のギャップを測定します。
   * @returns {number} 始端のギャップのサイズ。
   */
  function measureStartGap(): number {
    if (!withEdgeGap) return 0
    const slideRect = slideRects[0]
    // viewportの左端と、先頭のスライド要素の左端の差を取得
    return mathAbs(containerRect[startEdge] - slideRect[startEdge])
  }

  /**
   * 終端のギャップを測定します。
   * @returns {number} 終端のギャップのサイズ。
   */
  function measureEndGap(): number {
    if (!withEdgeGap) return 0
    const style = ownerWindow.getComputedStyle(arrayLast(slides))
    return parseFloat(style.getPropertyValue(`margin-${endEdge}`))
  }

  /**
   * ギャップを含めたスライドサイズを測定します。
   * @returns {number[]} ギャップを含めたスライドのサイズ。
   */
  function measureWithGaps(): number[] {
    return slideRects
      .map((rect, index, rects) => {
        const isFirst = !index // index === 0の時のみtrue
        const isLast = arrayIsLastIndex(rects, index)
        if (isFirst) return slideSizes[index] + startGap // 先頭のスライド要素の場合は、viewportとの隙間分を加算
        if (isLast) return slideSizes[index] + endGap // 末尾のスライド要素の場合は、viewportとの隙間分を加算
        return rects[index + 1][startEdge] - rect[startEdge] // 要素自身のwidth + 要素の左側のpaddingの合計（先頭のカルーセル要素を除いて、全てのカルーセル要素の左側にのみpaddingを適用する場合）
      })
      .map(mathAbs)
  }

  const self: SlideSizesType = {
    slideSizes,
    slideSizesWithGaps,
    startGap,
    endGap
  }
  return self
}
