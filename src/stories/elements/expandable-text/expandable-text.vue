<template>
  <div style="text-align: left; max-width:350px;">
    <dp-expandable-text
      :key="key"
      :content="content"
      :display-lines="displayLines"
      :font-size="fontSize"
      :line-height="lineHeight"
    ></dp-expandable-text>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: Math.random(),
      displayLines: number('Display Lines', 2),
      content: text('Content', 'We\'ve covered the many health reasons to curb your salt intake. '.repeat(5)),
      fontSize: number('Font Size (pixels): ', 12),
      lineHeight: number('Line Height (pixels):', 15)
    }
  },
  watch: {
    displayLines() {
      this.key = Math.random()
    },
    content() {
      this.key = Math.random()
    }
  }
}
</script>
