<template>
  <dp-popover
    :title="title"
    :trigger="trigger"
    :width="width"
    :content="content"
    :placement="placement"
    :close-label="closeLabel"
    :always="always"
    :disabled="disabled"
    :flip-position="flipPositionValue"
    :append-to-body="appendToBody"
    :display="display"
  ></dp-popover>
</template>

<script>

const triggerMode = {
  'hover': 'hover',
  'click': 'click'
}

const placementMode = {
  'top': 'top',
  'topLeft': 'topLeft',
  'topRight': 'topRight',
  'left': 'left',
  'leftTop': 'leftTop',
  'leftBottom': 'leftBottom',
  'right': 'right',
  'rightTop': 'rightTop',
  'rightBottom': 'rightBottom',
  'bottom': 'bottom',
  'bottomLeft': 'bottomLeft',
  'bottomRight': 'bottomRight',
  'auto': 'auto'
}
export default {
  data () {
    return {
      trigger: select('Trigger', triggerMode, 'hover'),
      title: text('Title', '<i class="fa fa-lightbulb-o" aria-hidden="true"></i> Good to know'),
      content: text('Content', '<p>Some banks may have different limits on the loan amount based on your income. Make sure to double check with them.</p>'),
      width: number('Width', 0),
      placement: select('Placement', placementMode, 'top'),
      display: text('Display', '<i class="fa fa-question-circle" aria-hidden="true"></i>'),
      closeLabel: text('Close label', 'TAP TO DISMISS'),
      always: boolean('Is always?', false),
      disabled: boolean('Is disabled?', false),
      appendToBody: boolean('Append to body?', true),
      flipPositionArray: array('flipPositionArray', ['top', 'left', 'right', 'bottom']),
      flipPositionString: text('flipPositionString', 'flip'),
      isUseFlipPositionArray: boolean('use flipPositionArray?', false)
    }
  },
  computed: {
    flipPositionValue() {
      return this.isUseFlipPositionArray ? this.flipPositionArray : this.flipPositionString
    }
  }
}
</script>

