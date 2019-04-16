import {
  mount
} from 'dp-test'
import Emitter from 'src/utilities/mixins/emitter'
import sinon from 'sinon'

describe('src/utilities/mixins/emitter.js', () => {
  const emptyChildComponent = {
    name: 'empty-child-component',
    mixins: [Emitter],
    componentName: 'empty-child-component',
    template: `<div>test</div>`
  }
  const emptyComponent = {
    name: 'empty-component',
    componentName: 'empty-component',
    components: {
      emptyChildComponent
    },
    template: `<empty-child-component></empty-child-component>`
  }

  const emptyParentComponent = {
    name: 'empty-parent-component',
    componentName: 'empty-parent-component',
    components: {emptyComponent},
    template: '<empty-component></empty-component>'
  }
  let wrapper
  let sanbox
  beforeEach(() => {
    sanbox = sinon.createSandbox()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('dispatch when parent exist', () => {
    wrapper = mount(emptyComponent)
    expect(wrapper.emitted('input')).toBeFalsy()
    wrapper.vm.$children[0].dispatch('empty-component', 'input', true)
    expect(wrapper.emitted('input')).toBeTruthy()
  })

  it('dispatch when parent not exist', () => {
    wrapper = mount(emptyChildComponent)
    wrapper.vm.dispatch('empty-component', 'input', true)
    expect(wrapper.emitted('input')).toBeFalsy()
  })

  it('dispatch when parent is not empty-parent-component', () => {
    wrapper = mount(emptyParentComponent)
    expect(wrapper.emitted('input')).toBeFalsy()
    wrapper.vm.$children[0].$children[0].dispatch('empty-parent-component', 'input', true)
    expect(wrapper.emitted('input')).toBeTruthy()
  })
})
