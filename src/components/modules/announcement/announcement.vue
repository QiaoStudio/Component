<template>
  <div class="dp-announcement"
       :class=
         "{
           'dp-announcement--linked': isLinked,
           'dp-announcement--inverse': isInverse,
           'dp-announcement--empty': !content
         }"
  >
    <template v-if="isLinked">
      <a :href="isLinked"
         :target="target ? '_blank' : '_self'">
        <dp-label
          :class="[labelColor, labelSize]"
          class="dp-announcement__label">
          {{ labelText }}
        </dp-label>
        <span class="dp-announcement__content"
              v-html="content"></span>
      </a>
    </template>
    <template v-else>
      <dp-label
        :class="[labelColor, labelSize]"
        class="dp-announcement__label">
        {{ labelText }}
      </dp-label>
      <span class="dp-announcement__content"
            v-html="content"></span>
    </template>
  </div>
</template>
<style lang="scss">
@import '~assets/css/modules/announcement';
</style>
<script>
import Label from 'elements/label/label.vue'
export default {
  name: 'dp-announcement',
  components: {
    [Label.name]: Label
  },
  props: {
    labelText: { type: String, default: 'New' },
    content: { type: String, default: '' },
    labelColor: { type: String, default: '' },
    labelSize: { type: String, default: '' },
    isLinked: { type: String, default: '' },
    target: { type: Boolean, default: false },
    isInverse: { type: Boolean, default: false }
  }
}
</script>
