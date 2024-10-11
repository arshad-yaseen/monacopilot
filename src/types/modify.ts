import {Context} from './context';
import {PromptData} from './copilot';
import {CursorPosition, EditorModel, EditorSelection} from './monaco';

export interface SelectionActionsRegistration {
  deregister: () => void;
}

export type SelectionAction = 'modify';

export interface RegisterSelectionActionsOptions {
  actions: SelectionAction[];
  modify: ModifyOptions;
  onError?: (error: Error) => void;
}

export interface ModifyOptions {
  /**
   * The API endpoint to fetch the modified text from.
   */
  endpoint: string;
  /**
   * The context object containing contextual information for generating relevant modifications.
   */
  context: Context;
  /**
   * The text to display as a placeholder in the text area where users input their modification instructions.
   */
  placeholder?: string;
  /**
   * Custom fetch modified text handler. This function overrides the default modified text fetch handler.
   * It allows you to customize how modified text requests are made and responses are processed.
   * You can implement your own logic for fetching and processing modified text.
   * The function should return either a string (the modified text to be replaced with the selected text) or null.
   * @param params - The parameters for the modified text request.
   * @param {string} params.endpoint - The endpoint to fetch the modified text from.
   * @param {ModifyApiRequestBody} params.body - The body of the modified text request.
   * @returns {Promise<{modifiedText: string | null}>} An object containing the modified text or null if no modified text is available.
   */
  requestHandler?: FetchModifiedTextHandler;
}

export interface ModifyMetadata {
  /**
   * The context object containing contextual information for generating relevant modifications.
   */
  context?: Context;
  /**
   * The full text of the current file.
   */
  fullText: string;
  /**
   * The selected text range in the file.
   */
  selection: EditorSelection | null;
  /**
   * The selected text.
   * This will be null if the user has a cursor position and no text is selected.
   */
  selectedText: string | null;
  /**
   * The current cursor position.
   */
  cursorPosition: CursorPosition | null;
  /**
   * The text before the cursor position.
   * This will be null if the user has selected text instead of having a cursor position.
   */
  textBeforeCursor: string | null;
  /**
   * The text after the cursor position.
   * This will be null if the user has selected text instead of having a cursor position.
   */
  textAfterCursor: string | null;
  /**
   * The user-provided instructions for modifying the selected text.
   */
  prompt: string;
}

export interface FetchModifiedTextParams {
  endpoint: string;
  body: ModifyApiRequestBody;
}

export interface FetchModifiedTextReturn {
  modifiedText: string | null;
}

export type FetchModifiedTextHandler = (
  params: FetchModifiedTextParams,
) => Promise<FetchModifiedTextReturn>;

export interface ModifyApiRequest {
  body: ModifyApiRequestBody;
  options?: ModifyApiRequestOptions;
}

export interface ModifyApiRequestOptions {
  /**
   * Custom headers to include in the request to the AI provider.
   */
  headers?: Record<string, string>;
  /**
   * Custom prompt generator function for the modify request.
   * This function allows you to override the default system and user prompts
   * used in the modify request, providing more control over the AI's context and behavior.
   *
   * @param metadata - Metadata about the current modify context
   * @returns An object containing custom 'system' and 'user' prompts
   */
  customPrompt?: ModifyCustomPrompt;
}

export type ModifyCustomPrompt = (
  metadata: ModifyMetadata,
) => Partial<PromptData>;

export interface ModifyApiRequestBody {
  metadata: ModifyMetadata;
}

export interface ModifyApiResponse {
  modifiedText: string | null;
  error?: string;
}

export interface ConstructModifyMetadataParams {
  mdl: EditorModel;
  pos: CursorPosition | null;
  selection: EditorSelection;
  prompt: string;
  options: ModifyOptions;
}

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
