/** FloatingCoords is a pair of coordinates that represent the position of a floating element */
export interface FloatingCoords {
  left: number;
  top: number;
}

/** FloatingRect is a rectangle that represents the position and size of a floating element */
export interface FloatingRect
  extends Pick<DOMRect, 'top' | 'left' | 'width' | 'height'> {}

export type FloatingPosition =
  | 'top-center'
  | 'bottom-center'
  | 'left-center'
  | 'right-center'
  | 'window-center';
