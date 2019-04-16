
export const listeners = {}

const track = el => {
  let previousTracked = getData(el, 'lastPosition')
  setData(el, 'lastPosition', el.scrollTop)
  if (!previousTracked || isNaN(Number.parseInt(previousTracked))) {
    return 0
  }
  return Number.parseInt(previousTracked)
}

const setData = (el, prop, val) => {
  if (el.dataset) {
    el.dataset[prop] = val
  } else if (el.body) {
    el.body.dataset[prop] = val
  }
  return val
}

const getData = (el, prop) => {
  if (el.dataset) {
    return Number.parseInt(el.dataset[prop])
  } else if (el.body) {
    return Number.parseInt(el.body.dataset[prop])
  }
  return null
}

const onScroll = (viewport, el) => {
  let previousTracked = track(viewport)
  let scrollDirection = previousTracked < viewport.scrollTop ? 'down' : 'up'
  let diff = (previousTracked - viewport.scrollTop)
  switch (scrollDirection) {
    case 'down':
      let elHeight = el.clientHeight
      let viewportHeight = viewport.clientHeight
      if (viewportHeight < elHeight) {
        if (getData(el, 'top') + diff > viewportHeight - elHeight) {
          setData(el, 'top', getData(el, 'top') + diff)
        } else {
          setData(el, 'top', viewportHeight - elHeight)
        }
        el.style.top = getData(el, 'top') + 'px'
      } else {
        el.style.top = 0
        setData(el, 'top', 0)
      }
      break
    case 'up':
      if (getData(el, 'top') + diff < 0) {
        setData(el, 'top', getData(el, 'top') + diff)
        el.style.top = getData(el, 'top') + 'px'
      } else {
        el.style.top = 0
        setData(el, 'top', 0)
      }
  }
}
export default {
  inserted(el) {
    el.style.position = 'sticky'
    let scroll = (e) => {
      onScroll(e.target, el)
    }
    listeners[el] = scroll
    document.addEventListener('scroll', scroll, true)
  },
  unbind(el) {
    let scroll = listeners[el]
    delete listeners[el]
    document.removeEventListener('scroll', scroll, true)
  }
}
