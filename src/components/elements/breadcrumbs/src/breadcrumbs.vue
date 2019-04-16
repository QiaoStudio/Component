<template>
  <div class="dp-breadcrumbs">
    <template>
      <span v-for="(item, index) in arrayToBeDisplayed" :key="item.text">
        <span class="" :class="{ 'dp-breadcrumbs__link': !item.isLast, 'dp-breadcrumbs__text': item.isLast }">
          <a :href="item.link" v-if="!item.isLast">
            {{ item.text }}
          </a>
          <template v-if="item.isLast">{{ item.text }}</template>
        </span>
        <span v-if="index !== arrayToBeDisplayed.length - 1">
          <i class="fa fa-angle-right"></i>
        </span>
      </span>
    </template>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/breadcrumbs';
</style>
<script>
export default {
  name: 'dp-breadcrumbs',
  props: {
    levels: {
      type: Array,
      default() {
        return [
          {
            text: '',
            link: '',
            isVisible: true
          }
        ]
      }
    }
  },
  computed: {
    arrayToBeDisplayed() {
      const tmpArr = []
      if (this.levels.length > 0) {
        let tmpElem = null
        for (let i = 0; i < this.levels.length; i++) {
          tmpElem = this.levels[i]
          if (tmpElem.isVisible === undefined) {
            tmpElem.isVisible = true
          }
          if (tmpElem.isVisible) {
            if (i === this.levels.length - 1) {
              tmpElem.isLast = true
              tmpElem.link = ''
            } else {
              tmpElem.isLast = false
            }
            tmpArr.push(tmpElem)
          }
        }
      }
      return tmpArr
    }
  }
}
</script>
