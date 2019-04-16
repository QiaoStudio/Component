<template>
  <div class="dp-exclusive">
    <span>
      {{ messageTip }}
    </span>
    <span>
      <i class="fa fa-crown"></i>
    </span>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/exclusive';
</style>
<script>
export default {
  name: 'dp-exclusive',
  props: {
    messageTip: {
      type: String
    }
  }
}
</script>
