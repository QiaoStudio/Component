<template>
  <div>
    <p :class="textAlignment">The quick brown fox jumps over the lazy dog.</p>
  </div>
</template>

<script>
const alignment = {
  'Left': 'dp-text-align-left',
  'Center': 'dp-text-align-center',
  'Right': 'dp-text-align-right'
}
export default {
  data() {
    return {
      textAlignment: select('Alignment', alignment, 'dp-text-align-left')
    }
  }
}
</script>
