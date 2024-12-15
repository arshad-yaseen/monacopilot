import {
  CompoundEditorRecentChange,
  Disposable,
  EditorContentChange,
  EditorContentChangedEvent,
  EditorModel,
  EditorRecentChange,
  EditorStructuredRecentChange,
} from '../types';
import {Queue} from './queue';

const MAX_HISTORY_LENGTH = 20;
const BATCH_DEBOUNCE_MS = 600;
const MAX_BATCH_SIZE = 10;

export class RecentChangesTracker {
  private model: EditorModel;
  private changesQueue: Queue<EditorRecentChange>;
  private disposables: Disposable[] = [];
  private lastKnownValue: string;
  private pendingBatch: EditorStructuredRecentChange[] = [];
  private batchTimer: number | undefined;

  constructor(model: EditorModel) {
    this.model = model;
    this.changesQueue = new Queue<EditorRecentChange>(MAX_HISTORY_LENGTH);
    this.lastKnownValue = this.model.getValue();
    this.initialize();
  }

  private initialize() {
    this.disposables = [
      this.model.onDidChangeContent(event => this.handleContentChange(event)),
      // No cursor position tracking needed
    ];
  }

  private handleContentChange(event: EditorContentChangedEvent) {
    const oldValue = this.lastKnownValue;
    const changes = event.changes.map(change =>
      this.createChange(change, oldValue),
    );

    this.batchChanges(changes);
    this.lastKnownValue = this.model.getValue();
    this.resetBatchTimer();
  }

  private createChange(
    change: EditorContentChange,
    oldValue: string,
  ): EditorStructuredRecentChange {
    const oldText = this.model.getValueInRange(change.range);
    const type =
      change.text.length === 0
        ? 'delete'
        : oldText.length === 0
          ? 'insert'
          : 'replace';

    return {
      type,
      range: {...change.range},
      text: change.text,
      oldText,
      timestamp: Date.now(),
    };
  }

  private batchChanges(changes: EditorStructuredRecentChange[]) {
    for (const change of changes) {
      if (this.pendingBatch.length === 0) {
        this.pendingBatch.push(change);
        continue;
      }

      const lastChange = this.pendingBatch[this.pendingBatch.length - 1];
      if (this.canMergeChanges(lastChange, change)) {
        this.pendingBatch[this.pendingBatch.length - 1] = this.mergeChanges(
          lastChange,
          change,
        );
      } else {
        this.pendingBatch.push(change);
      }

      if (this.getBatchSize() >= MAX_BATCH_SIZE) {
        this.finalizeBatch();
      }
    }
  }

  private canMergeChanges(
    a: EditorStructuredRecentChange,
    b: EditorStructuredRecentChange,
  ): boolean {
    const maxLineDiff = 2;
    const lineDiff = Math.abs(a.range.endLineNumber - b.range.startLineNumber);
    const isNearby = lineDiff <= maxLineDiff;
    const isSameType = a.type === b.type;
    return isNearby && isSameType && a.type !== 'delete';
  }

  private mergeChanges(
    a: EditorStructuredRecentChange,
    b: EditorStructuredRecentChange,
  ): EditorStructuredRecentChange {
    return {
      type: a.type,
      range: {
        startLineNumber: Math.min(
          a.range.startLineNumber,
          b.range.startLineNumber,
        ),
        startColumn:
          a.range.startLineNumber <= b.range.startLineNumber
            ? a.range.startColumn
            : b.range.startColumn,
        endLineNumber: Math.max(a.range.endLineNumber, b.range.endLineNumber),
        endColumn:
          a.range.endLineNumber >= b.range.endLineNumber
            ? a.range.endColumn
            : b.range.endColumn,
      },
      text: a.text + b.text,
      oldText: a.oldText + b.oldText,
      timestamp: Date.now(),
    };
  }

  private getBatchSize(): number {
    return this.pendingBatch.reduce(
      (sum, change) => sum + change.text.length,
      0,
    );
  }

  private resetBatchTimer() {
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
    }
    this.batchTimer = window.setTimeout(
      () => this.finalizeBatch(),
      BATCH_DEBOUNCE_MS,
    );
  }

  private createDescription(change: EditorStructuredRecentChange): string {
    const location = `line ${change.range.startLineNumber}, column ${change.range.startColumn}`;
    switch (change.type) {
      case 'insert':
        return `Inserted "${change.text}" at ${location}`;
      case 'delete':
        return `Deleted "${change.oldText}" at ${location}`;
      case 'replace':
        return `Changed "${change.oldText}" to "${change.text}" at ${location}`;
    }
  }

  private finalizeBatch() {
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = undefined;
    }

    if (this.pendingBatch.length === 0) return;

    const compoundChange: CompoundEditorRecentChange = {
      type:
        this.pendingBatch.length === 1 ? this.pendingBatch[0].type : 'replace',
      range: {
        startLineNumber: Math.min(
          ...this.pendingBatch.map(c => c.range.startLineNumber),
        ),
        startColumn: Math.min(
          ...this.pendingBatch.map(c => c.range.startColumn),
        ),
        endLineNumber: Math.max(
          ...this.pendingBatch.map(c => c.range.endLineNumber),
        ),
        endColumn: Math.max(...this.pendingBatch.map(c => c.range.endColumn)),
      },
      text: this.pendingBatch.map(c => c.text).join(''),
      oldText: this.pendingBatch.map(c => c.oldText).join(''),
      timestamp: Date.now(),
      changes: this.pendingBatch,
    };

    const description: EditorRecentChange = {
      natural: this.pendingBatch.map(c => this.createDescription(c)).join(', '),
      structured: compoundChange,
    };

    this.changesQueue.enqueue(description);
    this.pendingBatch = [];
  }

  public getRecentChanges(): EditorRecentChange[] {
    return this.changesQueue.getAll() ?? [];
  }

  public dispose() {
    this.changesQueue.clear();
    this.disposables.forEach(d => d.dispose());
    this.disposables = [];
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
    }
  }
}
