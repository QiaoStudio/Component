import Directive, {listeners} from 'src/directives/sticky-position'
import sinon from 'sinon'

describe('directives/sticky-position', () => {
  let sanbox, container, sidebar

  beforeEach(() => {
    container = document.createElement('div', {
      classes: ['container']
    })
    sidebar = document.createElement('div', {
      classes: ['sidebar']
    })
    sanbox = sinon.createSandbox()
    Directive.inserted(sidebar)
  })

  afterEach(() => {
    sanbox.restore()
    if (listeners[sidebar]) {
      Directive.unbind(sidebar)
    }
  })

  function setUpClientHeight({
    sidebarHeight,
    containerHeight
  }) {
    sanbox.stub(sidebar, 'clientHeight').get(() => sidebarHeight)
    sanbox.stub(container, 'clientHeight').get(() => containerHeight)
  }

  function scrollTo(scrollTop) {
    container.scrollTop = scrollTop
    listeners[sidebar]({target: container})
  }

  it('should remove listener while unbind the directive', () => {
    expect(typeof listeners[sidebar]).toBe('function')
    Directive.unbind(sidebar)
    expect(listeners[sidebar]).toBeUndefined()
  })

  it('should sticky position to target element', () => {
    expect(sidebar.style.position).toBe('sticky')
  })

  it('always set top to 0px when side bar is shorter than viewport', () => {
    setUpClientHeight({sidebarHeight: 100, containerHeight: 500})

    scrollTo(0)
    expect(sidebar.style.top).toBe('0px')

    scrollTo(400)
    expect(sidebar.style.top).toBe('0px')

    scrollTo(100)
    expect(sidebar.style.top).toBe('0px')
  })

  it('should set top to -100px when scrolling down and side bar is longer than viewport 100px', () => {
    setUpClientHeight({sidebarHeight: 600, containerHeight: 500})

    scrollTo(0)
    expect(sidebar.style.top).toBe('0px')

    scrollTo(300)
    expect(sidebar.style.top).toBe('-100px')

    scrollTo(100)
    expect(sidebar.style.top).toBe('0px')
  })

  it('should scroll smoothly when change scroll direction', () => {
    setUpClientHeight({sidebarHeight: 600, containerHeight: 500})

    scrollTo(0)
    expect(sidebar.style.top).toBe('0px')

    scrollTo(300)
    expect(sidebar.style.top).toBe('-100px')

    scrollTo(250)
    expect(sidebar.style.top).toBe('-50px')

    scrollTo(200)
    expect(sidebar.style.top).toBe('0px')

    scrollTo(230)
    expect(sidebar.style.top).toBe('-30px')
  })
})
