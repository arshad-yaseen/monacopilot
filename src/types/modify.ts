export type EditorModifyState = {
  isWidgetVisible: boolean;
  widgets: Set<string>;
};

export type ModifyRegistration = {
  deregister: () => void;
};

export type RegisterModifyOptions = {
  endpoint: string;
  onError?: (error: Error) => void;
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

export enum OverlayWidgetPositionPreference {
  /**
   * Position the overlay widget in the top right corner
   */
  TOP_RIGHT_CORNER = 0,
  /**
   * Position the overlay widget in the bottom right corner
   */
  BOTTOM_RIGHT_CORNER = 1,
  /**
   * Position the overlay widget in the top center
   */
  TOP_CENTER = 2,
}
