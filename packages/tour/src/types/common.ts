export interface FloatingCoords {
  left: number;
  top: number;
}

export interface FloatingRect
  extends Pick<DOMRect, 'top' | 'left' | 'width' | 'height'> {}

export type FloatingPosition =
  | 'top-center'
  | 'bottom-center'
  | 'left-center'
  | 'right-center'
  | 'window-center';

export type ClassValue =
  | string
  | undefined
  | null
  | false
  | {[key: string]: boolean}
  | ClassValue[];
