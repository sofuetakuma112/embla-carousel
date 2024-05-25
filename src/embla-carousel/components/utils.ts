import { PointerEventType } from './DragTracker'

export type WindowType = Window & typeof globalThis

/**
 * 変数が数値かどうかを調べます。
 * @param {unknown} subject - 調べる対象。
 * @returns {subject is number} 数値であればtrue、それ以外はfalse。
 */
export function isNumber(subject: unknown): subject is number {
  return typeof subject === 'number'
}

/**
 * 変数が文字列かどうかを調べます。
 * @param {unknown} subject - 調べる対象。
 * @returns {subject is string} 文字列であればtrue、それ以外はfalse。
 */
export function isString(subject: unknown): subject is string {
  return typeof subject === 'string'
}

/**
 * 変数がブール値かどうかを調べます。
 * @param {unknown} subject - 調べる対象。
 * @returns {boolean} ブール値であればtrue、それ以外はfalse。
 */
export function isBoolean(subject: unknown): subject is boolean {
  return typeof subject === 'boolean'
}

/**
 * 変数がオブジェクトかどうかを調べます。
 * @param {unknown} subject - 調べる対象。
 * @returns {subject is Record<string, unknown>} オブジェクトであればtrue、それ以外はfalse。
 */
export function isObject(subject: unknown): subject is Record<string, unknown> {
  return Object.prototype.toString.call(subject) === '[object Object]'
}

/**
 * 数値の絶対値を返します。
 * @param {number} n - 数値。
 * @returns {number} 数値の絶対値。
 */
export function mathAbs(n: number): number {
  return Math.abs(n)
}

/**
 * 数値の符号を返します。
 * @param {number} n - 数値。
 * @returns {number} 数値の符号。
 */
export function mathSign(n: number): number {
  return Math.sign(n)
}

/**
 * 二つの値の差の絶対値を返します。
 * @param {number} valueB - 値B。
 * @param {number} valueA - 値A。
 * @returns {number} 差の絶対値。
 */
export function deltaAbs(valueB: number, valueA: number): number {
  return mathAbs(valueB - valueA)
}

/**
 * 二つの値の比率の絶対値を返します。
 * @param {number} valueB - 値B。
 * @param {number} valueA - 値A。
 * @returns {number} 比率の絶対値。
 */
export function factorAbs(valueB: number, valueA: number): number {
  if (valueB === 0 || valueA === 0) return 0
  if (mathAbs(valueB) <= mathAbs(valueA)) return 0
  const diff = deltaAbs(mathAbs(valueB), mathAbs(valueA))
  return mathAbs(diff / valueB)
}

/**
 * 配列のキーを返します。
 * @param {Type[]} array - 配列。
 * @returns {number[]} 配列のキー。
 */
export function arrayKeys<Type>(array: Type[]): number[] {
  return objectKeys(array).map(Number)
}

/**
 * 配列の最後の要素を返します。
 * @param {Type[]} array - 配列。
 * @returns {Type} 配列の最後の要素。
 */
export function arrayLast<Type>(array: Type[]): Type {
  return array[arrayLastIndex(array)]
}

/**
 * 配列の最後のインデックスを返します。
 * @param {Type[]} array - 配列。
 * @returns {number} 最後のインデックス。
 */
export function arrayLastIndex<Type>(array: Type[]): number {
  return Math.max(0, array.length - 1)
}

/**
 * 与えられたインデックスが配列の最後のインデックスかどうかを確認します。
 * @param {Type[]} array - 配列。
 * @param {number} index - インデックス。
 * @returns {boolean} 最後のインデックスであればtrue、それ以外はfalse。
 */
export function arrayIsLastIndex<Type>(array: Type[], index: number): boolean {
  return index === arrayLastIndex(array)
}

/**
 * 指定した数から配列を生成します。
 * @param {number} n - 数。
 * @param {number} [startAt=0] - 開始位置。
 * @returns {number[]} 生成された配列。
 */
export function arrayFromNumber(n: number, startAt: number = 0): number[] {
  return Array.from(Array(n), (_, i) => startAt + i)
}

/**
 * オブジェクトのキーを返します。
 * @param {Type} object - オブジェクト。
 * @returns {string[]} オブジェクトのキー。
 */
export function objectKeys<Type extends object>(object: Type): string[] {
  return Object.keys(object)
}

/**
 * 2つのオブジェクトを深くマージします。
 * @param {Record<string, unknown>} objectA - オブジェクトA。
 * @param {Record<string, unknown>} objectB - オブジェクトB。
 * @returns {Record<string, unknown>} マージされたオブジェクト。
 */
export function objectsMergeDeep(
  objectA: Record<string, unknown>,
  objectB: Record<string, unknown>
): Record<string, unknown> {
  return [objectA, objectB].reduce((mergedObjects, currentObject) => {
    objectKeys(currentObject).forEach((key) => {
      const valueA = mergedObjects[key]
      const valueB = currentObject[key]
      const areObjects = isObject(valueA) && isObject(valueB)

      mergedObjects[key] = areObjects
        ? objectsMergeDeep(valueA, valueB)
        : valueB
    })
    return mergedObjects
  }, {})
}

/**
 * イベントがマウスイベントかどうかを確認します。
 * @param {PointerEventType} evt - ポインターイベント。
 * @param {WindowType} ownerWindow - ウィンドウオブジェクト。
 * @returns {evt is MouseEvent} マウスイベントであればtrue、それ以外はfalse。
 */
export function isMouseEvent(
  evt: PointerEventType,
  ownerWindow: WindowType
): evt is MouseEvent {
  return (
    typeof ownerWindow.MouseEvent !== 'undefined' &&
    evt instanceof ownerWindow.MouseEvent
  )
}
