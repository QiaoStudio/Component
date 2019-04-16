<template>
  <div ref="wrap"
       :class="['dp-slider', 'dp-slider--horizontal', disabledClass, { 'dp-slider-state-drag': this.flag }]"
       @click="wrapClick"
       tabindex="-1">
    <div ref="elem"
         aria-hidden="true"
         class="dp-slider__elem"
         :class="{'dp-slider__dot--dual': isRange}">
      <template v-if="isRange">
        <div ref="tooltip0" class="dp-slider__tooltip--wrap dp-slider__tooltip--left">
          <slot name="tooltip"
                :value="val[0]"
                :index="0"
                :disabled="disabled">
            <span class="dp-slider__tooltip">{{ formatter ? formatting(val[0]) : val[0] }}</span>
          </slot>
        </div>
        <div ref="tooltip1" class="dp-slider__tooltip--wrap dp-slider__tooltip--right">
          <slot name="tooltip"
                :value="val[1]"
                :index="1"
                :disabled="disabled">
            <span class="dp-slider__tooltip">{{ formatter ? formatting(val[1]) : val[1] }}</span>
          </slot>
        </div>
        <div ref="dot0"
             key="dot0"
             :class="[
               'dp-slider__dot',
               {
                 'dp-slider__dot--dragging': flag && currentSlider === 0,
                 'dp-slider__dot--disabled': disabled
               }
             ]"
             @mousedown="moveStart($event, 0)"
             @touchstart="moveStart($event, 0)">
        </div>
        <div ref="dot1"
             key="dot1"
             :class="[
               'dp-slider__dot',
               {
                 'dp-slider__dot--dragging': flag && currentSlider === 1,
                 'dp-slider__dot--disabled': disabled
               }
             ]"
             @mousedown="moveStart($event, 1)"
             @touchstart="moveStart($event, 1)">
        </div>
      </template>
      <template v-else>
        <div class="dp-slider__tooltip--wrap dp-slider__tooltip--single">
          <slot name="tooltip"
                :value="val">
            <span class="dp-slider__tooltip">{{ formatter ? formatting(val) : val }}</span>
          </slot>
        </div>
        <div ref="dot"
             key="dot"
             :class="[
               'dp-slider__dot',
               {
                 'dp-slider__dot--dragging': flag && currentSlider === 0
               }
             ]"
             @mousedown="moveStart"
             @touchstart="moveStart">
        </div>
      </template>
      <ul class="dp-slider--piecewise">
        <li v-for="(piecewiseObj, index) in piecewiseDotWrap"
            class="dp-slider--piecewise__item"
            :style="[piecewiseObj.style]"
            :key="index">
          <span v-if="piecewise" class="dp-slider--piecewise__dot"></span>
        </li>
      </ul>
      <div ref="process"
           class="dp-slider__process"
           @mousedown="moveStart($event, 0, true)"
           @touchstart="moveStart($event, 0, true)">
      </div>
      <input v-if="!isRange"
             class="dp-slider__sr-only"
             type="range"
             v-model="val"
             :min="min"
             :max="max" />
    </div>
  </div>
</template>
<script>
import { getKey, KEY_VALUES } from 'utilities/event-helper/key-event'
// Unsharp text [#166](https://github.com/NightCatSama/vue-slider-component/issues/166)
const roundToDPR = (function() {
  const r = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  return value => Math.round(value * r) / r
})()

const ACTION_SEED = {
  increase: 1,
  decrease: -1
}

export default {
  name: 'dp-slider',
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    interval: {
      type: Number,
      default: 1
    },
    disabled: {
      type: [Boolean, Array],
      default: false
    },
    piecewise: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Array, Object],
      default: 0
    },
    formatter: [String, Function]
  },
  data() {
    return {
      flag: false,
      size: 0,
      focusSlider: 0,
      currentValue: 0,
      currentSlider: 0,
      isComponentExists: true,
      height: 2,
      dotSize: 12
    }
  },
  computed: {
    disabledClass() {
      return this.disabled ? 'dp-slider--disabled' : ''
    },
    isRange() {
      return Array.isArray(this.value)
    },
    slider() {
      return this.isRange ? [this.$refs.dot0, this.$refs.dot1] : this.$refs.dot
    },
    minimum() {
      return this.min
    },
    val: {
      get() {
        return this.currentValue
      },
      set(val) {
        this.currentValue = val
      }
    },
    maximum() {
      return this.max
    },
    multiple() {
      let decimals = `${this.interval}`.split('.')[1]
      return decimals ? Math.pow(10, decimals.length) : 1
    },
    total() {
      if (Math.floor((this.maximum - this.minimum) * this.multiple) %
          (this.interval * this.multiple) !==
        0
      ) {
        this.printError(
          'Prop[interval] is illegal, Please make sure that the interval can be divisible'
        )
      }
      return (this.maximum - this.minimum) / this.interval
    },
    gap() {
      return this.size / this.total
    },
    position() {
      return this.isRange
        ? [
          (this.currentValue[0] - this.minimum) / this.interval * this.gap,
          (this.currentValue[1] - this.minimum) / this.interval * this.gap
        ]
        : (this.currentValue - this.minimum) / this.interval * this.gap
    },
    limit() {
      return this.isRange
        ? [[0, this.position[1]], [this.position[0], this.size]]
        : [0, this.size]
    },
    valueLimit() {
      return this.isRange
        ? [
          [this.minimum, this.currentValue[1]],
          [this.currentValue[0], this.maximum]
        ]
        : [this.minimum, this.maximum]
    },
    idleSlider() {
      return this.currentSlider === 0 ? 1 : 0
    },
    piecewiseDotWrap() {
      if (!this.piecewise) {
        return false
      }
      let arr = []
      for (let i = 0; i <= this.total; i++) {
        let style = {
          left: `${this.gap * i - this.height / 2}px`,
          top: 0
        }
        arr.push({
          style
        })
      }
      return arr
    }
  },
  watch: {
    value(val) {
      this.flag || this.setValue(val, true)
    },
    max(val) {
      if (val < this.min) {
        return this.printError(
          'The maximum value can not be less than the minimum value.'
        )
      }

      let resetVal = this.limitValue(this.val)
      this.setValue(resetVal)
      this.refresh()
    },
    min(val) {
      if (val > this.max) {
        return this.printError(
          'The minimum value can not be greater than the maximum value.'
        )
      }

      let resetVal = this.limitValue(this.val)
      this.setValue(resetVal)
      this.refresh()
    }
  },
  methods: {
    bindEvents() {
      document.addEventListener('touchmove', this.moving, { passive: false })
      document.addEventListener('touchend', this.moveEnd, { passive: false })
      document.addEventListener('mousedown', this.blurSlider)
      document.addEventListener('mousemove', this.moving)
      document.addEventListener('mouseup', this.moveEnd)
      document.addEventListener('mouseleave', this.moveEnd)
      window.addEventListener('resize', this.refresh)

      this.bindKeyShortcuts()
    },
    unbindEvents() {
      document.removeEventListener('touchmove', this.moving)
      document.removeEventListener('touchend', this.moveEnd)
      document.removeEventListener('mousedown', this.blurSlider)
      document.removeEventListener('mousemove', this.moving)
      document.removeEventListener('mouseup', this.moveEnd)
      document.removeEventListener('mouseleave', this.moveEnd)
      window.removeEventListener('resize', this.refresh)
    },
    bindKeyShortcuts() {
      this.$el.querySelectorAll('.dp-slider__dot').forEach((dot, index) => {
        dot.tabIndex = 0
        dot.addEventListener('focusin', (e) => (this.onSliderDotFocus(e, index)))
      })

      this.$el.addEventListener('keyup', this.onKeyUp)
      this.$el.addEventListener('keydown', this.preventKeys)
    },
    onSliderDotFocus(e, index) {
      this.moveStart(e, index)
      this.flag = false
    },
    preventKeys(event) {
      const key = getKey(event)
      if (key === KEY_VALUES.ARROW_UP || key === KEY_VALUES.ARROW_DOWN) {
        event.preventDefault()
      }
    },
    onKeyUp(event) {
      if (!event.target.classList.contains('dp-slider__dot')) return

      const value = this.getFocusingValue(event, this.val)
      const key = getKey(event)

      switch (key) {
        case KEY_VALUES.ARROW_UP:
        case KEY_VALUES.ARROW_RIGHT:
          this.updateSliderValue(value, ACTION_SEED.increase)
          break
        case KEY_VALUES.ARROW_DOWN:
        case KEY_VALUES.ARROW_LEFT:
          this.updateSliderValue(value, ACTION_SEED.decrease)
          break
      }
    },
    getFocusingValue(event, val) {
      if (!this.isRange) return val

      let [start, end] = val
      if (this.currentSlider === 0) {
        if (start + this.interval > end) {
          this.currentSlider = 1
          event.target.nextElementSibling.focus()
        }
      } else {
        if (end - this.interval < start) {
          this.currentSlider = 0
          event.target.previousElementSibling.focus()
        }
      }

      return this.currentSlider === 0 ? start : end
    },
    updateSliderValue(currentValue, actionSeed) {
      const value = currentValue + (this.interval * actionSeed)
      this.setCurrentValue(this.inRange(value), false)
    },
    blurSlider(e) {
      let dot = this.isRange
        ? this.$refs[`dot${this.focusSlider}`]
        : this.$refs.dot
      if (!dot || dot === e.target) {
        return false
      }
    },
    formatting(value) {
      return typeof this.formatter === 'string'
        ? this.formatter.replace(/\{value\}/, value)
        : this.formatter(value)
    },
    getPos(e) {
      // this.realTime && this.getStaticData()
      return e.clientX - this.offset
    },
    wrapClick(e) {
      if (this.disabled) return false
      let pos = this.getPos(e)
      if (this.isRange) {
        if (!this.disabled) {
          this.currentSlider =
            pos > (this.position[1] - this.position[0]) / 2 + this.position[0]
              ? 1
              : 0
        } else {
          return false
        }
      }
      this.setValueOnPos(pos)
    },
    moveStart(e, index = 0, isProcess) {
      if (this.disabled) {
        return false
      }
      if (this.isRange) {
        this.currentSlider = index

        if (isProcess) {
          return false
        }
      }
      if (!isProcess) {
        this.focusSlider = index
      }
      this.flag = true
      this.$emit('drag-start', this)
    },
    moving(e) {
      if (!this.flag) return false
      e.preventDefault()
      if (e.targetTouches && e.targetTouches[0]) e = e.targetTouches[0]
      this.setValueOnPos(this.getPos(e), true)
    },
    moveEnd(e) {
      if (this.flag) {
        this.$emit('drag-end', this)
        if (this.lazy && this.isDiff(this.val, this.value)) {
          this.syncValue()
        }
      } else {
        return false
      }
      this.flag = false
      this.setPosition()
    },
    setValueOnPos(pos, isDrag) {
      let range = this.isRange ? this.limit[this.currentSlider] : this.limit
      let valueRange = this.isRange
        ? this.valueLimit[this.currentSlider]
        : this.valueLimit
      if (pos >= range[0] && pos <= range[1]) {
        this.setTransform(pos)
        let v = this.getValueByIndex(Math.round(pos / this.gap))
        this.setCurrentValue(v, isDrag)
      } else if (pos < range[0]) {
        this.setTransform(range[0])
        this.setCurrentValue(valueRange[0])
        if (
          !this.disabled &&
          this.currentSlider === 1
        ) {
          this.focusSlider = 0
          this.currentSlider = 0
        }
      } else {
        this.setTransform(range[1])
        this.setCurrentValue(valueRange[1])
        if (
          !this.disabled &&
          this.currentSlider === 0
        ) {
          this.focusSlider = 1
          this.currentSlider = 1
        }
      }
    },
    isDiff(a, b) {
      if (
        Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)
      ) {
        return true
      } else if (Array.isArray(a) && a.length === b.length) {
        return a.some((v, i) => v !== b[i])
      }
      return a !== b
    },
    setCurrentValue(val, isDrag) {
      let slider = this.currentSlider
      if (val < this.minimum || val > this.maximum) return false
      if (this.isRange) {
        if (this.isDiff(this.currentValue[slider], val)) {
          this.currentValue.splice(slider, 1, val)
          if (!this.lazy || !this.flag) {
            this.syncValue()
          }
        }
      } else if (this.isDiff(this.currentValue, val)) {
        this.currentValue = val
        if (!this.lazy || !this.flag) {
          this.syncValue()
        }
      }
      isDrag || this.setPosition()
    },
    getValueByIndex(index) {
      return (
        (this.interval * this.multiple * index + this.minimum * this.multiple) /
        this.multiple
      )
    },
    setValue(val, noCb) {
      if (this.isDiff(this.val, val)) {
        let resetVal = this.limitValue(val)
        this.val = this.isRange ? resetVal.concat() : resetVal
        this.syncValue(noCb)
      }
      this.$nextTick(() => this.setPosition())
    },
    setPosition() {
      if (this.isRange) {
        this.setTransform(this.position[0], this.currentSlider === 1)
        this.setTransform(this.position[1], this.currentSlider === 0)
      } else {
        this.setTransform(this.position)
      }
    },
    setTransform(val, isIdleSlider) {
      this.$nextTick(() => {
        let singleToolTip
        let singleToolTipValue

        let slider = isIdleSlider ? this.idleSlider : this.currentSlider
        let value = roundToDPR(val - this.dotSize / 2)
        let processSize = `${slider === 0 ? this.position[1] - val : val - this.position[0]}px`
        let processPos = `${slider === 0 ? val : this.position[0]}px`
        if (this.isRange) {
          this.slider[slider].style.left = `${value}px`
          this.$refs.process.style.width = processSize
          this.$refs.process.style['left'] = processPos
        } else {
          this.slider.style.left = `${value}px`
          this.$refs.process.style.width = `${val}px`
          this.$refs.process.style['left'] = 0
          singleToolTip = document.querySelector('.dp-slider__tooltip--single')
          singleToolTipValue = roundToDPR(val - singleToolTip.getBoundingClientRect().width / 2)
          singleToolTip.style.left = `${singleToolTipValue}px`
        }
      })
    },
    inRange(value) {
      if (value < this.min) {
        this.printError(
          `The value of the slider is ${value}, the minimum value is ${
            this.min
          }, the value of this slider can not be less than the minimum value`
        )
        return this.min
      } else if (value > this.max) {
        this.printError(
          `The value of the slider is ${value}, the maximum value is ${
            this.max
          }, the value of this slider can not be greater than the maximum value`
        )
        return this.max
      }
      return value
    },
    limitValue(val) {
      if (this.isRange) {
        return val.map(v => this.inRange(v))
      } else {
        return this.inRange(val)
      }
    },
    syncValue(noCb) {
      let val = this.isRange ? this.val.concat() : this.val
      this.$emit('input', val)
      noCb || this.$emit('callback', val)
    },
    getValue() {
      return this.val
    },
    getStaticData() {
      if (this.$refs.elem) {
        this.size = this.$refs.elem.offsetWidth
        this.offset = this.$refs.elem.getBoundingClientRect().left
      }
    },
    refresh() {
      if (this.$refs.elem) {
        this.getStaticData()
        this.setPosition()
      }
    },
    printError(msg) {
      console.error(`[VueSlider error]: ${msg}`)
    }
  },
  mounted() {
    this.isComponentExists = true
    this.$nextTick(() => {
      if (this.isComponentExists) {
        this.getStaticData()
        this.setValue(this.limitValue(this.value), true)
        this.bindEvents()
      }
    })
  },
  beforeDestroy() {
    this.isComponentExists = false
    this.unbindEvents()
  }
}
</script>

<style lang="scss">
@import '~assets/css/elements/slider';
</style>
