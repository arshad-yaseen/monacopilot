export interface FloatingCoords {
  translateX: number;
  translateY: number;
}

export type FloatingRect = DOMRect;

export type FloatingPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

export type ClassValue =
  | string
  | undefined
  | null
  | false
  | {[key: string]: boolean}
  | ClassValue[];
