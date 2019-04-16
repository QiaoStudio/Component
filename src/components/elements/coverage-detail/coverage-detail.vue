<template>
  <table :class="viewTypeClass">
    <tbody class="dp-coverage-detail__body">
      <tr v-for="item in coverage"
          :key="item.title"
          class="dp-coverage-detail__row">
        <td class="dp-coverage-detail__cell-title">{{ item.title }}</td>
        <td class="dp-coverage-detail__cell-content"><strong>{{ item.content }}</strong></td>
      </tr>
    </tbody>
  </table>
</template>
<style lang="scss">
@import '~assets/css/elements/coverage-detail';
</style>
<script>
export default {
  name: 'dp-coverage-detail',
  props: {
    coverage: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    },
    viewType: {
      type: String,
      default: 'grid',
      validator: function(value) {
        return ['grid', 'list'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    viewTypeClass() {
      return this.viewType === 'list' ? 'dp-coverage-detail--list' : 'dp-coverage-detail'
    }
  }
}
</script>
