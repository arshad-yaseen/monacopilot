/**
 * A generic queue implementation with a maximum size.
 * Uses a circular buffer for efficient space utilization.
 */
export class Queue<T> {
  private buffer: (T | undefined)[];
  private head: number = 0;
  private tail: number = 0;
  private size: number = 0;

  constructor(private readonly capacity: number) {
    this.buffer = new Array(capacity);
  }

  /**
   * Adds an item to the queue. If the queue is full, the oldest item is removed.
   * @param item - The item to be added to the queue.
   * @returns The item that was removed if the queue was full, undefined otherwise.
   */
  enqueue(item: T): T | undefined {
    let removedItem: T | undefined;

    if (this.size === this.capacity) {
      removedItem = this.dequeue();
    }

    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    this.size++;

    return removedItem;
  }

  /**
   * Removes and returns the oldest item from the queue.
   * @returns The removed item, or undefined if the queue is empty.
   */
  dequeue(): T | undefined {
    if (this.size === 0) return undefined;

    const item = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.size--;

    return item;
  }

  /**
   * Returns all items in the queue without removing them.
   * @returns An array of all items in the queue, in order from oldest to newest.
   */
  getAll(): T[] {
    return this.buffer.filter((item): item is T => item !== undefined);
  }

  /**
   * Clears all items from the queue.
   */
  clear(): void {
    this.buffer = new Array(this.capacity);
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }

  /**
   * Returns the current number of items in the queue.
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Checks if the queue is empty.
   * @returns True if the queue is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Checks if the queue is full.
   * @returns True if the queue is full, false otherwise.
   */
  isFull(): boolean {
    return this.size === this.capacity;
  }
}
