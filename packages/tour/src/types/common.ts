/** Coords represents the left and top position of an element. */
export interface Coords {
  left: number
  top: number
}

/** Rect represents the position and size of an element. */
export interface Rect
  extends Pick<DOMRect, "top" | "left" | "width" | "height"> {}

/** Position represents the preferred position of a floating element. */
export type Position =
  | "top-center"
  | "bottom-center"
  | "left-center"
  | "right-center"
