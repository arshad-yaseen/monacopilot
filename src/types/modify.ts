export type EditorWidgetState = {
  isModifyWidgetVisible: boolean;
  widgets: Set<string>;
};

export type SelectionActionsRegistration = {
  deregister: () => void;
};

export type SelectionAction = 'modify';

export type RegisterSelectionActionsOptions = {
  actions: SelectionAction[];
  modify: ModifyOptions;
  onError?: (error: Error) => void;
};

export type ModifyOptions = {
  endpoint: string;
  placeholder?: string;
  requestHandler?: ModifyRequestHandler;
};

export type ModifyRequestHandler = (
  endpoint: string,
  payload: ModifyRequestPayload,
) => Promise<ModifyResponse>;

export type ModifyRequestPayload = {
  originalCode: string;
  prompt: string;
};

export type ModifyResponse = {
  modifiedCode: string;
};

export enum ContentWidgetPositionPreference {
  /**
   * Place the content widget exactly at a position
   */
  EXACT = 0,
  /**
   * Place the content widget above a position
   */
  ABOVE = 1,
  /**
   * Place the content widget below a position
   */
  BELOW = 2,
}
