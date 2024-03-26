import {Position} from './common';
import {TourControls, TourState} from './tour';

export interface TourContextType extends TourState, TourControls {}

export interface PopoverContextType {
  open: boolean;
  preferredPosition: Position;
  target: HTMLElement | null;
  onClickOutside?: () => void;
  shouldMaskTarget?: boolean;
}
