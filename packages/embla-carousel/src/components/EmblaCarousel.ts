import { Engine, EngineType } from './Engine'
import { EventStore } from './EventStore'
import { EventHandler, EventHandlerType } from './EventHandler'
import { defaultOptions, EmblaOptionsType, OptionsType } from './Options'
import { OptionsHandler } from './OptionsHandler'
import { PluginsHandler } from './PluginsHandler'
import { EmblaPluginsType, EmblaPluginType } from './Plugins'
import { isString, WindowType } from './utils'

export type EmblaCarouselType = {
  canScrollNext: () => boolean
  canScrollPrev: () => boolean
  containerNode: () => HTMLElement
  internalEngine: () => EngineType
  destroy: () => void
  off: EventHandlerType['off']
  on: EventHandlerType['on']
  emit: EventHandlerType['emit']
  plugins: () => EmblaPluginsType
  previousScrollSnap: () => number
  reInit: (options?: EmblaOptionsType, plugins?: EmblaPluginType[]) => void
  rootNode: () => HTMLElement
  scrollNext: (jump?: boolean) => void
  scrollPrev: (jump?: boolean) => void
  scrollProgress: () => number
  scrollSnapList: () => number[]
  scrollTo: (index: number, jump?: boolean) => void
  selectedScrollSnap: () => number
  slideNodes: () => HTMLElement[]
  slidesInView: () => number[]
  slidesNotInView: () => number[]
}

function EmblaCarousel(
  root: HTMLElement, // viewport
  userOptions?: EmblaOptionsType,
  userPlugins?: EmblaPluginType[]
): EmblaCarouselType {
  const ownerDocument = root.ownerDocument // ルートの要素
  const ownerWindow = <WindowType>ownerDocument.defaultView
  const optionsHandler = OptionsHandler(ownerWindow)
  const pluginsHandler = PluginsHandler(optionsHandler)
  const mediaHandlers = EventStore() // イベントリスナーを管理するストア
  const eventHandler = EventHandler()
  const { mergeOptions, optionsAtMedia, optionsMediaQueries } = optionsHandler
  const { on, off, emit } = eventHandler
  const reInit = reActivate

  let destroyed = false
  let engine: EngineType
  let optionsBase = mergeOptions(defaultOptions, EmblaCarousel.globalOptions)
  let options = mergeOptions(optionsBase)
  let pluginList: EmblaPluginType[] = []
  let pluginApis: EmblaPluginsType

  let container: HTMLElement
  let slides: HTMLElement[]

  function storeElements(): void {
    const { container: userContainer, slides: userSlides } = options

    // userContainer が文字列（セレクタ）である場合は、root 要素内でセレクタを使って指定された要素を検索します。
    // 文字列でない場合（既に要素が直接指定されている場合）は、その要素自体を使います。
    const customContainer = isString(userContainer)
      ? root.querySelector(userContainer)
      : userContainer
    // customContainer が存在する場合、それを container として設定します。
    // 存在しない場合は、root の最初の子要素を container として設定します。
    container = <HTMLElement>(customContainer || root.children[0])

    // userSlides が文字列（セレクタ）である場合は、container 要素内でセレクタを使ってスライド要素を全て検索します。
    // 文字列でない場合（既に要素の配列が直接指定されている場合）は、その配列自体を使います。
    const customSlides = isString(userSlides)
      ? container.querySelectorAll(userSlides)
      : userSlides
    // customSlides が存在する場合、それを Array.prototype.slice.call を使って配列形式に変換します。
    // 存在しない場合は、container の全子要素を配列形式に変換して slides として保存します。
    slides = <HTMLElement[]>[].slice.call(customSlides || container.children)
  }

  function createEngine(options: OptionsType): EngineType {
    const engine = Engine(
      root,
      container, // カスタムコンテナを指定しない限りはviewport（refを渡したDOM）が渡される
      slides,
      ownerDocument,
      ownerWindow,
      options,
      eventHandler
    )

    if (options.loop && !engine.slideLooper.canLoop()) {
      const optionsWithoutLoop = Object.assign({}, options, { loop: false })
      return createEngine(optionsWithoutLoop)
    }
    return engine
  }

  function activate(
    withOptions?: EmblaOptionsType,
    withPlugins?: EmblaPluginType[]
  ): void {
    if (destroyed) return

    optionsBase = mergeOptions(optionsBase, withOptions)
    options = optionsAtMedia(optionsBase)
    pluginList = withPlugins || pluginList

    storeElements()

    engine = createEngine(options)

    optionsMediaQueries([
      optionsBase,
      ...pluginList.map(({ options }) => options)
    ]).forEach((query) => mediaHandlers.add(query, 'change', reActivate))

    if (!options.active) return

    engine.translate.to(engine.location.get())
    engine.animation.init()
    engine.slidesInView.init()
    engine.slideFocus.init()
    engine.eventHandler.init(self)
    engine.resizeHandler.init(self)
    engine.slidesHandler.init(self)

    if (engine.options.loop) engine.slideLooper.loop()
    if (container.offsetParent && slides.length) engine.dragHandler.init(self)

    pluginApis = pluginsHandler.init(self, pluginList)
  }

  // emblaApiがインスタンス化された後に、useEffectで呼ばれる
  function reActivate(
    withOptions?: EmblaOptionsType,
    withPlugins?: EmblaPluginType[]
  ): void {
    const startIndex = selectedScrollSnap()
    deActivate()
    activate(mergeOptions({ startIndex }, withOptions), withPlugins) // ここでEngineの初期化も行なっている
    eventHandler.emit('reInit')
  }

  function deActivate(): void {
    engine.dragHandler.destroy()
    engine.eventStore.clear()
    engine.translate.clear()
    engine.slideLooper.clear()
    engine.resizeHandler.destroy()
    engine.slidesHandler.destroy()
    engine.slidesInView.destroy()
    engine.animation.destroy()
    pluginsHandler.destroy()
    mediaHandlers.clear()
  }

  function destroy(): void {
    if (destroyed) return
    destroyed = true
    mediaHandlers.clear()
    deActivate()
    eventHandler.emit('destroy')
    eventHandler.clear()
  }

  function scrollTo(index: number, jump?: boolean, direction?: number): void {
    if (!options.active || destroyed) return
    engine.scrollBody
      .useBaseFriction()
      .useDuration(jump === true ? 0 : options.duration)
    engine.scrollTo.index(index, direction || 0)
  }

  function scrollNext(jump?: boolean): void {
    const next = engine.index.add(1).get()
    scrollTo(next, jump, -1)
  }

  function scrollPrev(jump?: boolean): void {
    const prev = engine.index.add(-1).get()
    scrollTo(prev, jump, 1)
  }

  function canScrollNext(): boolean {
    const next = engine.index.add(1).get()
    return next !== selectedScrollSnap()
  }

  function canScrollPrev(): boolean {
    const prev = engine.index.add(-1).get()
    return prev !== selectedScrollSnap()
  }

  function scrollSnapList(): number[] {
    return engine.scrollSnapList
  }

  function scrollProgress(): number {
    return engine.scrollProgress.get(engine.location.get())
  }

  function selectedScrollSnap(): number {
    return engine.index.get()
  }

  function previousScrollSnap(): number {
    return engine.indexPrevious.get()
  }

  function slidesInView(): number[] {
    return engine.slidesInView.get()
  }

  function slidesNotInView(): number[] {
    return engine.slidesInView.get(false)
  }

  function plugins(): EmblaPluginsType {
    return pluginApis
  }

  function internalEngine(): EngineType {
    return engine
  }

  function rootNode(): HTMLElement {
    return root
  }

  function containerNode(): HTMLElement {
    return container
  }

  function slideNodes(): HTMLElement[] {
    return slides
  }

  const self: EmblaCarouselType = {
    canScrollNext,
    canScrollPrev,
    containerNode,
    internalEngine,
    destroy,
    off,
    on,
    emit,
    plugins,
    previousScrollSnap,
    reInit,
    rootNode,
    scrollNext,
    scrollPrev,
    scrollProgress,
    scrollSnapList,
    scrollTo,
    selectedScrollSnap,
    slideNodes,
    slidesInView,
    slidesNotInView
  }

  activate(userOptions, userPlugins)
  setTimeout(() => eventHandler.emit('init'), 0)
  return self
}

EmblaCarousel.globalOptions = <EmblaOptionsType | undefined>undefined

export default EmblaCarousel
