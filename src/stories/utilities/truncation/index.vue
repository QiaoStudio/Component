<template>
  <div style="text-align: left;">
    <p class="dp-text-overflow"
       :style="`width: ${textContainerWidth}px;`">{{ text }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: text('Text', 'Add dp-text-overflow to any element and truncates the text depending on element width'),
      textContainerWidth: number('Text Container Width', 300)
    }
  }
}
</script>
