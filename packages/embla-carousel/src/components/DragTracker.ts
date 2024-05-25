import { AxisOptionType, AxisType } from './Axis'
import { isMouseEvent, mathAbs, WindowType } from './utils'

type PointerCoordType = keyof Touch | keyof MouseEvent
export type PointerEventType = TouchEvent | MouseEvent

export type DragTrackerType = {
  pointerDown: (evt: PointerEventType) => number
  pointerMove: (evt: PointerEventType) => number
  pointerUp: (evt: PointerEventType) => number
  readPoint: (evt: PointerEventType, evtAxis?: AxisOptionType) => number
}

/**
 * ドラッグトラッカーを作成します。
 * @param {AxisType} axis - 軸情報オブジェクト。
 * @param {WindowType} ownerWindow - ウィンドウオブジェクト。
 * @returns {DragTrackerType} ドラッグトラッカーオブジェクト。
 */
export function DragTracker(
  axis: AxisType,
  ownerWindow: WindowType
): DragTrackerType {
  const logInterval = 170

  let startEvent: PointerEventType
  let lastEvent: PointerEventType

  /**
   * イベントのタイムスタンプを読み取ります。
   * @param {PointerEventType} evt - ポインターイベント。
   * @returns {number} タイムスタンプ。
   */
  function readTime(evt: PointerEventType): number {
    return evt.timeStamp
  }

  /**
   * イベントの座標を読み取ります。
   * @param {PointerEventType} evt - ポインターイベント。
   * @param {AxisOptionType} [evtAxis] - 軸オプション。
   * @returns {number} 座標値。
   */
  function readPoint(evt: PointerEventType, evtAxis?: AxisOptionType): number {
    const property = evtAxis || axis.scroll
    const coord: PointerCoordType = `client${property === 'x' ? 'X' : 'Y'}`
    return (isMouseEvent(evt, ownerWindow) ? evt : evt.touches[0])[coord]
  }

  /**
   * ポインターダウンイベントを処理します。
   * @param {PointerEventType} evt - ポインターイベント。
   * @returns {number} 座標値。
   */
  function pointerDown(evt: PointerEventType): number {
    startEvent = evt
    lastEvent = evt
    return readPoint(evt)
  }

  /**
   * ポインタームーブイベントを処理します。
   * @param {PointerEventType} evt - ポインターイベント。
   * @returns {number} 座標差異。
   */
  function pointerMove(evt: PointerEventType): number {
    const diff = readPoint(evt) - readPoint(lastEvent)
    const expired = readTime(evt) - readTime(startEvent) > logInterval

    lastEvent = evt
    if (expired) startEvent = evt
    return diff
  }

  /**
   * ポインターアップイベントを処理します。
   * @param {PointerEventType} evt - ポインターイベント。
   * @returns {number} フリックの力。
   */
  function pointerUp(evt: PointerEventType): number {
    if (!startEvent || !lastEvent) return 0
    const diffDrag = readPoint(lastEvent) - readPoint(startEvent)
    const diffTime = readTime(evt) - readTime(startEvent)
    const expired = readTime(evt) - readTime(lastEvent) > logInterval
    const force = diffDrag / diffTime
    const isFlick = diffTime && !expired && mathAbs(force) > 0.1

    return isFlick ? force : 0
  }

  const self: DragTrackerType = {
    pointerDown,
    pointerMove,
    pointerUp,
    readPoint
  }
  return self
}
