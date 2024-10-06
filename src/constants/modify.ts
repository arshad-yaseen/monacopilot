import {className} from '../utils';

export const DEFAULT_MODIFY_PLACEHOLDER =
  'Describe your desired modifications to the selected code... (Press Enter to submit)';

export const MODIFY_WIDGET_CLASS = className('modify-widget');
export const MODIFY_WIDGET_PROMPT_CONTAINER_CLASS = className(
  'modify-widget-prompt-container',
);
export const MODIFY_WIDGET_PROMPT_TEXTAREA_CLASS = className(
  'modify-widget-prompt-textarea',
);

export const MODIFY_WIDGET_PROMPT_SUBMIT_BUTTON_CLASS = className(
  'modify-widget-prompt-submit-button',
);

export const MODIFY_WIDGET_ACCEPT_REJECT_CONTAINER_CLASS = className(
  'modify-widget-accept-reject-container',
);

export const MODIFY_WIDGET_ACCEPT_BUTTON_CLASS = className(
  'modify-widget-accept-button',
);
export const MODIFY_WIDGET_REJECT_BUTTON_CLASS = className(
  'modify-widget-reject-button',
);

export const FETCHING_MODIFIED_CODE_CLASS = className('fetching-modified-code');
