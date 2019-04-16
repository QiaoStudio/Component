<template>
  <a class="dp-logo-title" :href="href" :target="target">
    <strong class="dp-logo-title__insure">{{ setInsurerName }}</strong><span class="dp-logo-title__plan">{{ planName }}</span>
  </a>
</template>
<style lang="scss">
@import '~assets/css/elements/logo-title';
</style>
<script>
import _ from 'lodash'
export default {
  name: 'dp-logo-title',
  props: {
    insurerName: {
      type: String
    },
    planName: {
      type: String
    },
    href: {
      type: String,
      default: 'javascript:;'
    },
    target: {
      type: String,
      validator: function (value) {
        return ['_blank', '_self', '_parent', '_top'].indexOf(value) !== -1
      },
      default: '_self'
    }
  },
  computed: {
    setInsurerName() {
      return _.trim(this.insurerName) !== '' ? this.insurerName + ', ' : ''
    }
  }
}
</script>

