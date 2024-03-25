import { useCallback, useEffect, useRef } from "react"
import { FOCUSABLE_ELEMENTS } from "src/constants/browser"

/**
 * This hook traps focus within a specified element (the one that the returned ref is attached to).
 * It prevents the user from tabbing outside of the trapped area, looping the focus instead.
 * It also refocuses the triggering element when the trapped content is closed or the component unmounts.
 *
 * @returns A ref object that should be attached to the element you want to trap focus within.
 */
const useFocusTrap = () => {
  const refTrigger = useRef<HTMLElement | null>(
    document.activeElement as HTMLElement
  )
  const refContainer = useRef<HTMLElement | null>(null)

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    // Prevents focusing elements outside the trapped area when Tab is pressed.
    if (event.key !== "Tab" || !refContainer.current) return

    const focusables: HTMLElement[] = Array.from(
      refContainer.current.querySelectorAll(FOCUSABLE_ELEMENTS)
    )
    if (focusables.length === 0) return

    const firstElement = focusables[0]
    const lastElement = focusables[focusables.length - 1]
    const { activeElement } = document

    if (event.shiftKey && activeElement === firstElement) {
      // Moves focus to the last element if Shift+Tab is pressed on the first focusable element.
      lastElement.focus()
      event.preventDefault()
    } else if (!event.shiftKey && activeElement === lastElement) {
      // Moves focus to the first element if Tab is pressed on the last focusable element.
      firstElement.focus()
      event.preventDefault()
    }
  }, [])

  useEffect(() => {
    const container = refContainer.current
    if (!container) return

    const focusables: HTMLElement[] = Array.from(
      container.querySelectorAll(FOCUSABLE_ELEMENTS)
    )
    if (focusables[0]) {
      focusables[0].focus()
      console.log("Focusing first focusable element within the container.")
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)

      // Refocus the triggering element when the component unmounts or the trapped content is closed.
      if (
        refTrigger.current &&
        (document.activeElement === document.body ||
          container.contains(document.activeElement))
      ) {
        refTrigger.current.focus()
      }
    }
  }, [onKeyDown])

  return refContainer
}

export default useFocusTrap
