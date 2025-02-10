import {CompletionRequestBody, RegisterCompletionOptions} from '.';
import type {
    CursorPosition,
    EditorKeyboardEvent,
    EditorModel,
    Monaco,
} from './monaco';

export type EditorCompletionState = {
    /** Whether the current completion suggestion has been accepted by the user */
    isCompletionAccepted: boolean;
    /** Whether a completion suggestion is currently being shown */
    isCompletionVisible: boolean;
    /** Whether completion was explicitly triggered by user action (vs automatic) */
    isExplicitlyTriggered: boolean;
    /** Whether the current completion suggestion was rejected by the user */
    hasRejectedCurrentCompletion: boolean;
};

export type FetchCompletionItemHandler = (
    params: FetchCompletionItemParams,
) => Promise<FetchCompletionItemReturn>;

export type FetchCompletionItemReturn = {
    completion: string | null;
};

export interface FetchCompletionItemParams {
    endpoint: string;
    body: CompletionRequestBody;
}

export interface ConstructCompletionMetadataParams {
    mdl: EditorModel;
    pos: CursorPosition;
    options: RegisterCompletionOptions;
}

export interface CompletionKeyEventHandlerParams {
    monaco: Monaco;
    event: EditorKeyboardEvent;
    state: EditorCompletionState;
    options: RegisterCompletionOptions;
}
