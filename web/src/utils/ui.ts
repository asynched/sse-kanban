interface PreventDefault {
  preventDefault: () => void
}

interface StopPropagation {
  stopPropagation: () => void
}

export const preventDefault = <Event extends PreventDefault>(
  fn?: (event: Event) => unknown
) => {
  return (event: Event) => {
    event.preventDefault()

    if (fn) {
      fn(event)
    }
  }
}

export const stopPropagation = <Event extends StopPropagation>(
  fn?: (event: Event) => unknown
) => {
  return (event: Event) => {
    event.stopPropagation()

    if (fn) {
      fn(event)
    }
  }
}
