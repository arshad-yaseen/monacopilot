import {Monaco} from './common';
import type {CompletionModel} from './completion';
import {
  Endpoint,
  ExternalContext,
  Filename,
  Technologies,
} from './monacopilot-props';

export interface CopilotOptions {
  model: CompletionModel | undefined;
}

export interface RegisterCopilotParams {
  monaco: Monaco;
  endpoint: Endpoint;
  language: string;
  filename?: Filename;
  technologies?: Technologies;
  externalContext?: ExternalContext;
}
