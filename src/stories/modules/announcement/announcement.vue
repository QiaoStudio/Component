<template>
  <div style="padding: 20px;" :style="'background-color:' + inverseBackground">
    <dp-announcement
      :label-text="labelText"
      :label-color="labelColor"
      :label-size="labelSize"
      :content="content"
      :is-linked="isLinked"
      :target="target"
      :is-inverse="isInverse">
    </dp-announcement>
  </div>
</template>
<script>
const labelColorMode = {
  'Green': '',
  'Red': 'dp-label--red',
  'Orange': 'dp-label--orange',
  'Gray': 'dp-label--gray'
}

const labelSizeMode = {
  'Small': '',
  'Medium': 'dp-label--md',
  'Large': 'dp-label--lg'
}

export default {
  data () {
    return {
      labelText: text('Label', 'New'),
      labelColor: select('Label Color', labelColorMode, ''),
      labelSize: select('Label Size', labelSizeMode, ''),
      content: text('Content', 'Get an awesome Thai Milk Tea!'),
      isLinked: text('Is linked?', ''),
      target: boolean('Target', false),
      isInverse: boolean('Is inverse?', false)
    }
  },
  computed: {
    inverseBackground() {
      let bg = 'transparent'
      if (this.isInverse) {
        bg = '#000;'
      }
      return bg
    }
  }
}
</script>
