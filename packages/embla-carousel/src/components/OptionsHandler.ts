import { LooseOptionsType, CreateOptionsType } from './Options'
import { objectKeys, objectsMergeDeep, WindowType } from './utils'

type OptionsType = Partial<CreateOptionsType<LooseOptionsType>>

export type OptionsHandlerType = {
  mergeOptions: <TypeA extends OptionsType, TypeB extends OptionsType>(
    optionsA: TypeA,
    optionsB?: TypeB
  ) => TypeA
  optionsAtMedia: <Type extends OptionsType>(options: Type) => Type
  optionsMediaQueries: (optionsList: OptionsType[]) => MediaQueryList[]
}

/**
 * OptionsHandlerは、設定オプションを操作するための以下の関数群を提供します。
 * - mergeOptions: 2つのオプションオブジェクトをマージします
 * - optionsAtMedia: メディアクエリに基づいて適切なオプションを選択します
 * - optionsMediaQueries: 設定オプションリストからMediaQueryListを生成します
 *
 * @typedef {object} OptionsHandlerType
 * @property {<TypeA extends OptionsType, TypeB extends OptionsType>(
 * optionsA: TypeA, optionsB?: TypeB) => TypeA} mergeOptions - 2つのオプションを深くマージする。
 * @property {<Type extends OptionsType>(options: Type) => Type} optionsAtMedia - メディアクエリに
 * 基づいてマッチするオプションを選択する。
 * @property {(optionsList: OptionsType[]) => MediaQueryList[]} optionsMediaQueries - 複数のオプション
 * リストからMediaQueryListを生成する。
 *
 * @param {WindowType} ownerWindow - ウィンドウまたはその代替
 * @returns {OptionsHandlerType} - OptionsHandlerインスタンス
 */
export function OptionsHandler(ownerWindow: WindowType): OptionsHandlerType {
  /**
   * 深いマージを利用して2つのオプションオブジェクトをマージします。
   *
   * @template TypeA, TypeB
   * @param {TypeA} optionsA - 基本となるオプションオブジェクト
   * @param {TypeB} [optionsB] - マージする追加オプションオブジェクト
   * @returns {TypeA} - 深くマージされたオプションオブジェクト
   */
  function mergeOptions<TypeA extends OptionsType, TypeB extends OptionsType>(
    optionsA: TypeA,
    optionsB?: TypeB
  ): TypeA {
    return <TypeA>objectsMergeDeep(optionsA, optionsB || {})
  }

  /**
   * メディアクエリの条件に基づいて、与えられたオプションオブジェクトをマッチする
   * オプションで拡張します。
   *
   * @template Type
   * @param {Type} options - 元のオプションオブジェクト
   * @returns {Type} - メディアクエリ条件に基づいて拡張されたオプションオブジェクト
   */
  function optionsAtMedia<Type extends OptionsType>(options: Type): Type {
    const optionsAtMedia = options.breakpoints || {}
    const matchedMediaOptions = objectKeys(optionsAtMedia)
      .filter((media) => ownerWindow.matchMedia(media).matches)
      .map((media) => optionsAtMedia[media])
      .reduce((a, mediaOption) => mergeOptions(a, mediaOption), {})

    return mergeOptions(options, matchedMediaOptions)
  }

  /**
   * 設定オプションリストからすべてのメディアクエリを収集し、MediaQueryListを生成します。
   *
   * @param {OptionsType[]} optionsList - オプションオブジェクトのリスト
   * @returns {MediaQueryList[]} - 生成されたMediaQueryListの配列
   */
  function optionsMediaQueries(optionsList: OptionsType[]): MediaQueryList[] {
    return optionsList
      .map((options) => objectKeys(options.breakpoints || {}))
      .reduce((acc, mediaQueries) => acc.concat(mediaQueries), [])
      .map(ownerWindow.matchMedia)
  }

  const self: OptionsHandlerType = {
    mergeOptions,
    optionsAtMedia,
    optionsMediaQueries
  }
  return self
}
