<template>
  <div>
    <dp-search-bar
      @select-option="callBack"
      :error-status="errorStatus"
      :error-message="errorMessage"
      :class="[size]"
      :label="textlabel"
      :options="options"
      :pill="pill"
    ></dp-search-bar>
  </div>
</template>

<script>
import { action } from '@storybook/addon-actions'
const options = [{ text: 'ba al', url: 'baal' }, { text: 'Blgeria', url: 'apple' }, { text: 'Albania', url: 'banana' }, { text: 'Abal', url: 'Abal' }, { text: 'afghanistan', url: 'Cherry' }, { text: 'Blgeria2', url: 'Lemon' }, { text: 'Blgeria3', url: 'Pear' }, { text: 'Blgeria4', url: 'Orange' }, { text: 'Blgeria5', url: 'Mango' }]
const size = {
  'Default': '',
  'Large': 'dp-field--large'
}

export default {
  data() {
    return {
      errorStatus: boolean('errorStatus', false),
      errorMessage: text('errorMessage', 'Please enter text.'),
      size: select('Size', size, ''),
      options: options,
      textlabel: text('Label', 'Search a topic or question'),
      pill: boolean('Is Rounded (Pill)', false)
    }
  },
  methods: {
    callBack: action('select option!')
  }
}
</script>

