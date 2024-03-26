import React from "react"
import ReactDOM from "react-dom"
import { useClickOutside, useFocusTrap } from "../../hooks"
import {
  Coords,
  PopoverContextType,
  PopoverProps,
  Position,
  Rect,
} from "../../types"
import { getFloatingPosition } from "../../utils/positioning"

const PopoverContext = React.createContext<PopoverContextType | null>(null)
PopoverContext.displayName = "PopoverContext"

const usePopover = (): PopoverContextType => {
  const context = React.useContext(PopoverContext)
  if (!context) {
    throw new Error("usePopover must be used within a Popover component")
  }
  return context
}

const _DEFAULT_POSITION: Position = "bottom-center"
const _POPOVER_Z_INDEX = 10000

const Popover = ({
  children,
  open,
  preferredPosition = _DEFAULT_POSITION,
  target,
  onClickOutside,
  shouldMaskTarget = true,
}: PopoverProps) => {
  if (!target) return null

  return (
    <PopoverContext.Provider
      value={{
        open,
        preferredPosition,
        target,
        onClickOutside,
        shouldMaskTarget,
      }}
    >
      {children}
    </PopoverContext.Provider>
  )
}

const PopoverContent = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { open, target, preferredPosition, onClickOutside, shouldMaskTarget } =
    usePopover()

  const ref = React.useRef<HTMLDivElement>(null)
  const [coords, setCoords] = React.useState<Coords>({ left: 0, top: 0 })
  const [targetRect, setTargetRect] = React.useState<Rect | null>(null)

  // Updates the target element's bounding rectangle
  React.useEffect(() => {
    if (!target) return
    const rect = target.getBoundingClientRect()
    setTargetRect(rect)
  }, [target])

  // Calculates new position for the Popover
  // Applies a temporary zIndex to the target element if shouldMaskTarget is true
  React.useLayoutEffect(() => {
    if (!open || !ref.current || !targetRect) return

    const floatingRect = ref.current.getBoundingClientRect()
    const newCoords = getFloatingPosition(
      targetRect,
      floatingRect,
      preferredPosition
    )
    setCoords(newCoords)

    const previousZIndex = target?.style.zIndex
    if (shouldMaskTarget && target) {
      // Temporarily elevates the target's zIndex to ensure it's above the overlay
      target.style.zIndex = `${_POPOVER_Z_INDEX + 1}`
    }

    // Cleanup function to revert the target's zIndex to its original value
    return () => {
      if (shouldMaskTarget && target) {
        target.style.zIndex = previousZIndex || ""
      }
    }
  }, [open, targetRect, preferredPosition, shouldMaskTarget, target])

  useFocusTrap(ref)
  useClickOutside(ref, () => onClickOutside?.())

  if (!open) return null

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: _POPOVER_Z_INDEX,
        width: "100%",
        height: "100%",
        backgroundColor: shouldMaskTarget
          ? "rgba(0, 0, 0, 0.05)"
          : "transparent",
      }}
    >
      <div
        {...props}
        ref={ref}
        style={{
          ...props.style,
          position: "fixed",
          left: `${coords.left}px`,
          top: `${coords.top}px`,
          zIndex: _POPOVER_Z_INDEX + 2,
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}

Popover.Content = PopoverContent

export default Popover
