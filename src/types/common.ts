export interface FloatingCoords {
  translateX: number;
  translateY: number;
}

export type FloatingRect = DOMRect;

export type FloatingPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, unknown>;
export type ClassArray = ClassValue[];
