<template>
  <div :style="containerStyle"
       :class="{dropup: false}">
    <p class="dp-field__select-holder"
       role="button"
       aria-haspopup="true"
       aria-expanded="show"
       @click.prevent="toggle()">
      <slot name="prepend"></slot>
      <span v-html="displayItem"></span>
    </p>
    <div class="dp-field__dropdown-menu"
         :style="style"
         :class="{open: show}">
      <ul :style="style"
          :class="{'right' : position == 'right'}"
          aria-labelledby="dLabel">
        <li v-for="(item, index) in list"
            :key="index"
            :class="{'disabled':item.disabled ,'selected':validSelected(item)}">
          <a @click.stop.prevent="select(item,$event)"
             :class="item.class">
            <span class="dp-field__col--two"
                  v-html="item.text"></span>
            <link class="rippleJS">
          </a>
        </li>
      </ul>
    </div>
    <select style="display:none"
            :id="id"
            :name="name"
            :value="item">
      <option v-for="(option, index) in list"
              :key="index"
              :value="option.key"
              v-html="option.text"></option>
    </select>
  </div>
</template>

<script>
import _ from 'lodash'
import { attachEvent } from 'utilities/event-helper'

const keyCodeMap = {
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  59: ';',
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  96: '0',
  97: '1',
  98: '2',
  99: '3',
  100: '4',
  101: '5',
  102: '6',
  103: '7',
  104: '8',
  105: '9'
}

const separator = '---------------------------------'
export default {
  name: 'dp-select-desktop',
  data() {
    return {
      show: false,
      style: {},
      containerStyle: {},
      dropup: false,
      focusItem: null,
      focusIndex: 0
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  computed: {
    displayItem() {
      // If zero show default message
      if ((this.returnObject && this.item && !this.item.text) || (!this.returnObject && this.item && this.item.length === 0) || this.forceDefault) {
        return this.defaultText
      }

      let displayText = ''
      // Show selected item
      if (this.returnObject && this.item) {
        displayText = this.item.displayText ? this.item.displayText : this.item.text
      }
      if (displayText) {
        return displayText
      }

      // Show text that coresponds to the item key
      if (!this.returnObject && this.item) {
        let result = this.item || ''
        this.list.forEach(item => {
          if (item.key !== undefined && this.item !== undefined) {
            if (item.key.toString() === this.item.toString()) {
              result = item.displayText ? item.displayText : item.text
            }
          }
        })
        return result
      }

      return this.list.length > 0 ? this.list[0].text : ''
    },
    list() {
      return this.items.map((option) => {
        if (option.text === separator) {
          option.disabled = true
          option.class = 'dp-field__select-option-line'
        }
        return option
      })
    },
    item() {
      if (this.list.length > 0 && this.value && !_.find(this.list, {key: this.value})) {
        return ''
      }
      return this.value
    }
  },
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    value: {
      type: [String, Number],
      required: false
    },
    items: {
      type: Array,
      default: function() {
        return []
      },
      required: true
    },
    dataSize: {
      type: Number,
      default: 6
    },
    dropupAuto: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'left'
    },
    defaultText: {
      type: String,
      default: 'Plase select one'
    },
    forceDefault: {
      type: Boolean,
      default: false
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    seed: {
      type: Number,
      default: 0
    }
  },
  methods: {
    toggle() {
      if (this.disabled) return
      this.show = !this.show
      if (this.show) {
        this.$nextTick(() => {
          let li = this.$el.querySelector('.dp-field__dropdown-menu ul > li')
          let menu = $(this.$el).find('.dp-field__dropdown-menu')
          menu.css({ 'margin-top': '' })
          if (li) {
            this.$set(this.style, 'max-height', (li.clientHeight * this.dataSize) + 'px')
            this.$nextTick(() => {
              // center the selected item
              let dropDown = $(this.$el).find('ul')
              let currentLi = $(dropDown).find('li.selected')
              if (currentLi.length > 0) {
                dropDown.scrollTop(0)
                let top = currentLi.position().top
                let height = dropDown.height()
                dropDown.scrollTop(top - (height / 2 - currentLi.height() / 2))
                let Mtop = $(this.$el).offset().top - currentLi.offset().top + ($(this.$el).height() - currentLi.height()) / 2
                let menuOffsetTop = menu.offset().top + Mtop
                let windownScrollTop = $(window).scrollTop()
                if (menuOffsetTop - windownScrollTop <= 0) {
                  Mtop = windownScrollTop - menuOffsetTop + Mtop + 10 // 10 is extra customized margin top
                  dropDown.scrollTop(top - (height / 2 - currentLi.height() / 2) + $(this.$el).height())
                }
                menu.css({ 'margin-top': Mtop })
              }
            })
          }

          if (this.dropupAuto) {
            let rect = this.$el.getBoundingClientRect()
            let top = rect.top
            let bottom = document.documentElement.clientHeight - rect.bottom
            let height = this.$el.clientHeight
            this.dropup = (top > bottom) && (bottom >= height)
          }
        })
      } else {
        if (this.focusItem) {
          this.focusItem.disabled = false
          this.select(this.focusItem, null)
          this.focusItem = null
          this.focusIndex = 0
        }
      }
    },
    select(item, e) {
      if (item.disabled) {
        e.preventDefault()
      } else {
        let newValue = this.returnObject ? item : item.key
        if (newValue !== this.value) {
          this.$emit('change', newValue, this.value)
          this.$nextTick(() => {
            let element = this.$el.querySelector('select')
            if ('createEvent' in document) {
              let evt = document.createEvent('HTMLEvents')
              evt.initEvent('change', true, true)
              element.dispatchEvent(evt)
            } else {
              element.fireEvent('onchange')
            }
          })
        }

        this.show = false
      }
    },
    validSelected(item) {
      let key = this.returnObject ? this.item.key : this.item
      let focusKey = this.focusItem ? this.focusItem.key : this.focusItem
      return item.key === key || item.key === focusKey
    },
    keyDownSearchSelectIndex(inputChar, options, option) {
      let validItems = _.filter(options, function(o) { return o.text.toLowerCase().indexOf(inputChar) === 0 })
      if (validItems.length < 1) {
        return
      }
      let lastItemText = validItems[validItems.length - 1].text
      let regex = new RegExp('^' + inputChar, 'i')
      let index = _.findIndex(options, it => {
        if (option && regex.test(option.text)) {
          return it.text === option.text
        }
        return regex.test(it.text)
      })
      if (index === -1) {
        return
      }
      // find second case options exist the same option
      if (option && index !== option.index && option.text.toLowerCase().indexOf(inputChar) === 0) {
        index = _.findLastIndex(options, function(it) {
          return it.text === option.text
        })
      }
      // find next option
      let targetItem = options[index]
      if (option && targetItem.text === option.text) {
        index = index + 1
      }
      // return first option
      if (lastItemText === targetItem.text && option && targetItem.text === option.text) {
        index = _.findIndex(options, it => {
          return regex.test(it.text)
        })
      }
      // find LastIndex option case options exist the same option
      let nextItem = options[index]
      if (nextItem.text.toLowerCase().indexOf(inputChar) !== 0 && option) {
        let validItemIndex = _.findIndex(validItems, ot => { return ot.text === option.text })
        let nextvalidItem = validItems[validItemIndex + 1]
        index = _.findLastIndex(options, function(o) { return o.text === nextvalidItem.text })
      }
      return index
    }
  },
  mounted() {
    let $self = this
    this.$nextTick(() => {
      $(document).on('click', (e) => {
        if (!this.$el.contains(e.target) && this.show) {
          this.focusIndex = 0
          if (this.focusItem) {
            this.focusItem.disabled = false
            this.select(this.focusItem, null)
          }
          this.focusItem = null
          this.show = false
        }
      })
      this.$set(this.containerStyle, 'width', (this.dataWidth && this.dataWidth !== 'fit') ? this.dataWidth : null)

      // TODO: SGP-11233 m6:When user selects country, user can not select countries quickly by inputting the first letter of countries.It is different with official website.
      attachEvent(this.$el, 'keydown', e => {
        let inputChar = keyCodeMap[e.keyCode]
        if (!inputChar) {
          return
        }
        let index = this.keyDownSearchSelectIndex(inputChar, $self.items, $self.focusItem)
        if (!index) {
          index = this.focusIndex
        }
        let targetItem = $self.items[index]
        $self.focusItem = targetItem
        $self.focusItem.index = index
        let container = this.$el.querySelector('.dp-field__dropdown-menu ul')
        let containerTop = container.getBoundingClientRect().bottom
        let target = container.querySelectorAll('li a')[index]
        if (target) {
          target.focus()
          let pos = target.getBoundingClientRect()
          let containerHeight = $(container).height()
          container.scrollTop += (pos.bottom - containerTop) + containerHeight / 2
        }
      })
    })
  },
  watch: {
    show: {
      handler(val) {
        if (val) {
          this.$emit('open-desktop-dropdown')
        } else {
          this.$emit('close-desktop-dropdown')
        }
      }
    },
    seed: {
      handler() {
        this.toggle()
      }
    }
  }
}

</script>
