<template>
  <dp-badge
    :value="value"
    :max="max">
  </dp-badge>
</template>

<script>
export default {
  data () {
    return {
      value: number('Value', 10),
      max: number('Max', 9)
    }
  }
}
</script>

