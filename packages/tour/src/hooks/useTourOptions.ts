import {useTourState} from '..';

/** This hook is to provide default values for the tour options if they are not provided */
const useTourOptions = () => {
  const {activeTour} = useTourState();
  const options = activeTour?.options;

  const highlightTarget = options?.highlightTarget ?? true;

  const preventCloseOnClickOutside =
    options?.preventCloseOnClickOutside ?? false;

  const showNavigation = options?.showNavigation ?? true;

  const showProgress = options?.showProgress ?? true;

  return {
    highlightTarget,
    preventCloseOnClickOutside,
    showNavigation,
    showProgress,
  };
};

export default useTourOptions;
