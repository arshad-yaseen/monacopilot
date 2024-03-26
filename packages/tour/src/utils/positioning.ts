import { Position, Rect } from "../types"

/**
 * Get the floating position based on the trigger and floating element
 * @param triggerRect - The trigger element rect
 * @param floatingRect - The floating element rect
 * @param preferredPosition - The preferred position
 */
const getFloatingPosition = (
  triggerRect: Rect,
  floatingRect: Rect,
  preferredPosition: Position
): { top: number; left: number } => {
  const spacing = 10 // Spacing from the trigger element
  const viewPortMargin = 10 // Margin from the viewport edges

  let top = 0
  let left = 0

  switch (preferredPosition) {
    case "top-center":
      top = triggerRect.top - floatingRect.height - spacing
      left = triggerRect.left + triggerRect.width / 2 - floatingRect.width / 2
      break
    case "bottom-center":
      top = triggerRect.top + triggerRect.height + spacing
      left = triggerRect.left + triggerRect.width / 2 - floatingRect.width / 2
      break
    case "left-center":
      top = triggerRect.top + triggerRect.height / 2 - floatingRect.height / 2
      left = triggerRect.left - floatingRect.width - spacing
      break
    case "right-center":
      top = triggerRect.top + triggerRect.height / 2 - floatingRect.height / 2
      left = triggerRect.left + triggerRect.width + spacing
      break
  }

  // Adjustments for viewport bounds
  top = Math.max(
    viewPortMargin,
    Math.min(top, window.innerHeight - floatingRect.height - viewPortMargin)
  )
  left = Math.max(
    viewPortMargin,
    Math.min(left, window.innerWidth - floatingRect.width - viewPortMargin)
  )

  return { top, left }
}

export { getFloatingPosition }
