<template>
  <div>
    <div class="dp-field__select-holder">
      <slot name="prepend"></slot>
      <span v-html="text"></span>
    </div>
    <select :name="name"
            :disabled="disabled"
            :value="selectedValue"
            @change="change($event.target.value)"
            @blur="blur"
            @click="click"
            data-none-selected-text="">
      <option v-for='(item,index) in items'
              :value="item.key"
              :disabled="disabledItem(item)"
              :key="index">
        <span v-html="item.text"></span>
        <link class='rippleJS'>
      </option>
    </select>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'dp-select-mobile',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    value: [String, Number],
    name: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selectedValue() {
      let selectedItem = this.getSelectedItem()
      return selectedItem ? selectedItem.key : ''
    },
    text() {
      let selectedItem = this.getSelectedItem()
      if (selectedItem) {
        return selectedItem.displayText
          ? selectedItem.displayText
          : selectedItem.text
      }
      return ''
    }
  },
  updated() {
    this.$nextTick(() => {
      $(this.$el)
        .find('select')
        .val(this.value)
    })
  },
  methods: {
    change(newVal) {
      let selectedItem = this.getSelectedItem(newVal)
      this.$emit('change', selectedItem.key, this.value)
    },
    disabledItem(option) {
      if (option.disabled) {
        return option.disabled
      }
      let separator = '---------------------------------'
      if (option.text === separator) {
        return 'disabled'
      }
    },
    getSelectedItem(val) {
      if (!this.items || this.items.length <= 0) {
        return ''
      }
      let value = val
      if (!val) {
        value = this.value ? this.value.toString() : ''
      }
      let selectedItem = _.find(this.items, item => {
        return item.key && item.key.toString() === value
      })
      selectedItem = selectedItem || this.items[0]
      return selectedItem
    },
    blur(e) {
      this.$emit('select-mobile-blur')
    },
    click() {
      this.$emit('select-mobile-click')
    }
  }
}
</script>
