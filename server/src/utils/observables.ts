type Subscriber<T> = (value: T) => unknown

export class Observable<T> {
  private subscribers: Subscriber<T>[] = []

  subscriberCount() {
    return this.subscribers.length
  }

  subscribe(subscriber: Subscriber<T>) {
    this.subscribers.push(subscriber)

    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== subscriber)
    }
  }

  next(value: T) {
    this.subscribers.forEach((subscriber) => subscriber(value))
  }
}
