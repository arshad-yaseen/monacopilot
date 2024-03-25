import { useEffect, useRef } from "react"

/**
 * This hook allows for detecting clicks outside of a specified element (the one that the returned ref is attached to).
 * It uses the 'pointerdown' event to handle all pointing device inputs uniformly, making it more accessible and inclusive.
 *
 * @param callback - A function to be called when a click outside is detected.
 * @returns A ref object that should be attached to the element you want to detect outside clicks for.
 */
const useClickOutside = <T extends HTMLElement>(callback: () => void) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [callback])

  return ref
}

export default useClickOutside
