export class Queue<T> {
	private buffer: (T | undefined)[]
	private head = 0
	private tail = 0
	private size = 0

	constructor(private readonly capacity: number) {
		this.buffer = new Array(capacity)
	}

	enqueue(item: T): T | undefined {
		let removedItem: T | undefined

		if (this.size === this.capacity) {
			removedItem = this.dequeue()
		}

		this.buffer[this.tail] = item
		this.tail = (this.tail + 1) % this.capacity
		this.size++

		return removedItem
	}

	dequeue(): T | undefined {
		if (this.size === 0) return undefined

		const item = this.buffer[this.head]
		this.buffer[this.head] = undefined
		this.head = (this.head + 1) % this.capacity
		this.size--

		return item
	}

	getAll(): T[] {
		return this.buffer.filter((item): item is T => item !== undefined)
	}

	clear(): void {
		this.buffer = new Array(this.capacity)
		this.head = 0
		this.tail = 0
		this.size = 0
	}

	getSize(): number {
		return this.size
	}

	isEmpty(): boolean {
		return this.size === 0
	}

	isFull(): boolean {
		return this.size === this.capacity
	}
}
