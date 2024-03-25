import React, {
  cloneElement,
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { useClickOutside, useFocusTrap } from "src/hooks"
import { Position, Rect } from "src/types"
import mergeRefs from "src/utils/mergeRefs"
import { getFloatingPosition } from "src/utils/positioning"

const defaultRect: Rect = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
}

const PopoverContext = createContext<{
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
  preferredPosition: Position
  triggerRect: Rect
  setTriggerRect: Dispatch<SetStateAction<Rect>>
}>({
  isShow: false,
  setIsShow: () => {
    throw new Error("PopoverContext setIsShow should be used under provider")
  },
  preferredPosition: "bottom-center",
  triggerRect: defaultRect,
  setTriggerRect: () => {
    throw new Error(
      "PopoverContext setTriggerRect should be used under provider"
    )
  },
})

export default function Popover({
  children,
  preferredPosition = "bottom-center",
}: {
  children: ReactNode
  preferredPosition: Position
}) {
  const [isShow, setIsShow] = useState(false)
  const [triggerRect, setTriggerRect] = useState(defaultRect)

  const contextValue = {
    isShow,
    setIsShow,
    preferredPosition,
    triggerRect,
    setTriggerRect,
  }

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  )
}

function Trigger({ children }: { children: ReactElement }) {
  const { setIsShow, setTriggerRect } = useContext(PopoverContext)

  const ref = useRef<HTMLElement>(null)

  const onClick = (e: MouseEvent) => {
    const element = ref.current
    if (element == null) {
      return
    }

    const rect = element.getBoundingClientRect()
    setTriggerRect(rect)
    setIsShow((isShow) => !isShow)
  }

  const childrenToTriggerPopover = cloneElement(children, {
    onClick, // TODO: we better merge the onClick
    ref, // TODO: we better merge the ref
  })

  return childrenToTriggerPopover
}

function Content({ children }: { children: ReactNode }) {
  const { isShow } = useContext(PopoverContext)

  if (!isShow) {
    return null
  }

  return <ContentInternal>{children}</ContentInternal>
}

function ContentInternal({ children }: { children: ReactNode }) {
  const { triggerRect, preferredPosition, setIsShow } =
    useContext(PopoverContext)
  const ref = useRef<HTMLDialogElement>(null)
  const [coords, setCoords] = useState({
    left: 0,
    top: 0,
  })

  useLayoutEffect(() => {
    const element = ref.current
    if (element == null) {
      return
    }

    const rect = element.getBoundingClientRect()

    const coords = getFloatingPosition(triggerRect, rect, preferredPosition)
    setCoords(coords)
  }, [])

  const refFocusTrap = useFocusTrap()

  const dismiss = useCallback(() => {
    setIsShow(false)
  }, [])

  const refClickOutside = useClickOutside(dismiss)

  const mergedRef = mergeRefs(ref, refFocusTrap, refClickOutside)

  return (
    <dialog
      open={true}
      ref={mergedRef}
      style={{
        position: "fixed",
        left: `${coords.left}px`,
        top: `${coords.top}px`,
        margin: 0,
      }}
    >
      {children}
    </dialog>
  )
}

Popover.Trigger = Trigger
Popover.Content = Content
