import {FloatingPosition} from './common';
import {TourControls, TourState} from './tour';

export interface TourContextType extends TourState, TourControls {}

export interface PopoverContextType {
  open: boolean;
  preferredPosition: FloatingPosition;
  target: HTMLElement | null;
  onClickOutside?: () => void;
  shouldHighlightTarget?: boolean;
}
