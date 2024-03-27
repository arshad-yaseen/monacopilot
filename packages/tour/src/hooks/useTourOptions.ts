import {TourOptions} from '../types/options';

// This hook is to provide default values for the tour options if they are not provided
const useTourOptions = (tourOptions?: TourOptions): Required<TourOptions> => {
  const highlightTarget = tourOptions?.highlightTarget ?? true;
  const preventCloseOnClickOutside =
    tourOptions?.preventCloseOnClickOutside ?? false;
  const showNavigation = tourOptions?.showNavigation ?? true;
  const showProgress = tourOptions?.showProgress ?? true;

  return {
    highlightTarget,
    preventCloseOnClickOutside,
    showNavigation,
    showProgress,
  };
};

export default useTourOptions;
