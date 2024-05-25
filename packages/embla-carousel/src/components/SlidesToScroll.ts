import { AxisType } from './Axis'
import { NodeRectType } from './NodeRects'
import {
  arrayKeys,
  arrayLast,
  arrayLastIndex,
  isNumber,
  mathAbs
} from './utils'

export type SlidesToScrollOptionType = 'auto' | number

export type SlidesToScrollType = {
  groupSlides: <Type>(array: Type[]) => Type[][]
}

/**
 * スライドをスクロールするためのグルーピングを作成します。
 * @param {AxisType} axis - 軸情報オブジェクト。
 * @param {number} viewSize - ビューサイズ。
 * @param {SlidesToScrollOptionType} slidesToScroll - スクロールするスライド数または 'auto'。
 * @param {boolean} loop - ループするかどうか。
 * @param {NodeRectType} containerRect - コンテナの矩形情報。
 * @param {NodeRectType[]} slideRects - スライドの矩形情報の配列。
 * @param {number} startGap - スタートギャップ。
 * @param {number} endGap - エンドギャップ。
 * @param {number} pixelTolerance - ピクセル許容値。
 * @returns {SlidesToScrollType} スライドグループオブジェクト。
 */
export function SlidesToScroll(
  axis: AxisType,
  viewSize: number,
  slidesToScroll: SlidesToScrollOptionType,
  loop: boolean,
  containerRect: NodeRectType,
  slideRects: NodeRectType[],
  startGap: number,
  endGap: number,
  pixelTolerance: number
): SlidesToScrollType {
  const {
    startEdge, // "left"
    endEdge, // "right"
    direction // 1
  } = axis
  const groupByNumber = isNumber(slidesToScroll) // 1

  /**
   * 配列を指定されたグループサイズで分割します。
   * @param {Type[]} array - 元の配列。
   * @param {number} groupSize - グループサイズ。
   * @returns {Type[][]} グループ分けされた配列。
   */
  function byNumber<Type>(array: Type[], groupSize: number): Type[][] {
    return arrayKeys(array)
      .filter((i) => i % groupSize === 0)
      .map((i) => array.slice(i, i + groupSize))
  }

  /**
   * 配列を自動的に適切なグループに分割します。
   * @param {Type[]} array - 元の配列。
   * @returns {Type[][]} グループ分けされた配列。
   */
  function bySize<Type>(array: Type[]): Type[][] {
    if (!array.length) return []

    return (
      arrayKeys(array)
        .reduce(
          (
            groups: number[], // accumulator
            rectB, // currentValue
            index // 配列のインデックス
          ) => {
            // 現在のグループの最後の要素 rectA と、追加予定の要素 rectB のエッジ位置を計算します。
            const rectA = arrayLast(groups) || 0
            const isFirst = rectA === 0
            const isLast = rectB === arrayLastIndex(array)

            const edgeA =
              containerRect[startEdge] - slideRects[rectA][startEdge]
            const edgeB = containerRect[startEdge] - slideRects[rectB][endEdge]

            // 最初の要素や最後の要素に対して、開始ギャップと終了ギャップを適用します。
            // ただし、ループが有効でない場合のみです。
            const gapA = !loop && isFirst ? direction(startGap) : 0
            const gapB = !loop && isLast ? direction(endGap) : 0

            // 新しい要素を追加した場合のチャンクサイズを計算し、そのサイズがビューサイズとピクセル許容値を超える場合、新しいグループとして現在の要素を追加します。
            // また、配列の最後の要素である場合もグループを完了させます。
            const chunkSize = mathAbs(edgeB - gapB - (edgeA + gapA))

            if (index && chunkSize > viewSize + pixelTolerance)
              groups.push(rectB)
            if (isLast) groups.push(array.length)
            return groups
          },
          []
        )
        // グループインデックスに基づいて配列をスライスし、グループ化された2次元配列を生成します。
        .map((currentSize, index, groups) => {
          const previousSize = Math.max(groups[index - 1] || 0)
          return array.slice(previousSize, currentSize)
        })
    )
  }

  /**
   * スライドを適切なグループに分割します。
   * @param {Type[]} array - スライドの配列。
   * @returns {Type[][]} グループ分けされたスライドの配列。
   */
  function groupSlides<Type>(array: Type[]): Type[][] {
    return groupByNumber ? byNumber(array, slidesToScroll) : bySize(array)
  }

  const self: SlidesToScrollType = {
    groupSlides
  }
  return self
}
