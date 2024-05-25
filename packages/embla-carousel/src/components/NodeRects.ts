export type NodeRectType = {
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
}

export type NodeRectsType = {
  measure: (node: HTMLElement) => NodeRectType
}

export function NodeRects(): NodeRectsType {
  function measure(node: HTMLElement): NodeRectType {
    const {
      offsetTop, // 要素の上端から親要素の上端までの距離
      offsetLeft, // 要素の左端から親要素の左端までの距離
      offsetWidth, // 要素の幅
      offsetHeight // 要素の高さ
    } = node
    const offset: NodeRectType = {
      top: offsetTop, // 要素の上端からその親要素の上端までの距離
      right: offsetLeft + offsetWidth, // 要素の右端からその親要素の左端までの距離
      bottom: offsetTop + offsetHeight, // 要素の下端からその親要素の上端までの距離
      left: offsetLeft, // 要素の左端からその親要素の左端までの距離
      width: offsetWidth, // 要素の幅
      height: offsetHeight // 要素の高さ
    }

    return offset
  }

  const self: NodeRectsType = {
    measure
  }
  return self
}
