import { MutableRefObject, Ref, RefCallback } from "react"

/**
 * Merges multiple refs into a single ref.
 */
const mergeRefs = <T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> => {
  return (el: T | null) => {
    refs.forEach((ref) => {
      if (ref == null) return

      if (typeof ref === "function") {
        ref(el)
      } else {
        ;(ref as MutableRefObject<T | null>).current = el
      }
    })
  }
}

export default mergeRefs
