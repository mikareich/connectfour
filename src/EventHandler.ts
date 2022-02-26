interface EventListener<Event> {
  event: Event
  callback(...params: any[]): void
}

class EventHandler<Event> {
  private _listeners: EventListener<Event>[] = []

  public addEventListener(event: Event, callback: (...params: any[]) => void) {
    this._listeners.push({ event, callback })
  }

  public removeEventListener(
    event: Event,
    callback: (...params: any[]) => void
  ) {
    this._listeners = this._listeners.filter(
      (listener) => listener.event !== event && listener.callback !== callback
    )
  }

  public dispatchEvent(event: Event, ...params: any[]) {
    this._listeners.forEach((listener) => {
      if (listener.event === event) listener.callback(...params)
    })
  }
}

export default EventHandler
