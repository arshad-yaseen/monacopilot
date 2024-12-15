import {EditorRange} from './monaco';

/**
 * Represents a structured change made in the editor, capturing details about text modifications
 * like insertions, deletions, and replacements along with their location and timing information.
 */
export type EditorStructuredRecentChange = {
  /** The type of change - insert new text, delete existing text, or replace text */
  type: 'insert' | 'delete' | 'replace';
  /** The range in the editor where the change occurred */
  range: EditorRange;
  /** The new text that was inserted */
  text: string;
  /** The text that was deleted/replaced */
  oldText: string;
  /** Timestamp when the change occurred */
  timestamp: number;
};

export type CompoundEditorRecentChange = EditorStructuredRecentChange & {
  changes: EditorStructuredRecentChange[];
};

/**
 * Describes a change with both human-readable and structured representations
 */
export type EditorRecentChange = {
  /** Human-readable description of the change */
  natural: string;
  /** Structured representation of the change */
  structured: CompoundEditorRecentChange;
};
