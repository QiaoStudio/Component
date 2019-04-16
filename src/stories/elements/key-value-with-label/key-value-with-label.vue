<template>
  <dp-key-value-with-label
    :top-label="topLabel"
    :value-from="valueFrom"
    :value-to="valueTo"
    :asterisk-visible="asteriskVisible"
    :bottom-label="bottomLabel"
    :align-mobile="alignMobile"
    :align-desktop="alignDesktop"
  ></dp-key-value-with-label>
</template>

<script>
const alignOptions = {
  left: 'left',
  right: 'right',
  center: 'center'
}
export default {
  data () {
    return {
      topLabel: {
        visible: boolean('Is top label visible?', true),
        content: text('Text of top label', 'You might get up to')
      },
      valueFrom: number('Value From', 200),
      valueTo: number('Value To', 300),
      asteriskVisible: boolean('Is asterisk visible?', true),
      bottomLabel: {
        visible: boolean('Is bottom label visible?', true),
        content: text('Text of bottom label', 'million dong at year 15 when the plan is mature')
      },
      alignMobile: select('Text alignment on mobile (left, right or center)', alignOptions, 'center'),
      alignDesktop: select('Text alignment on desktop (left, right or center)', alignOptions, 'left')
    }
  }
}
</script>
