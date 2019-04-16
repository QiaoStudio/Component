<template>
  <div class="dp-table">
    <table :class="headerStyle === 'top'? 'dp-table--default-header':'dp-table--left-header'">
      <template v-if="headerStyle === 'top'">
        <tr>
          <th v-for="header in headers" :key="header.fieldName">{{ header.label }}</th>
        </tr>
        <tr v-for="(row, index) in data" :key="index">
          <td v-for="header in headers" :key="header.fieldName">{{ row[header.fieldName] }}</td>
        </tr>
      </template>
      <template v-if="headerStyle === 'left'">
        <tr v-for="header in headers" :key="header.fieldName">
          <th>{{ header.label }}</th>
          <td v-for="(row, index) in data" :key="index">{{ row[header.fieldName] }}</td>
        </tr>
      </template>
    </table>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/table';
</style>
<script>
export default {
  name: 'dp-table',
  props: {
    headerStyle: {
      type: String,
      default: 'top',
      validator: function (value) {
        return ['top', 'left'].includes(value) === true
      }
    },
    headers: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  }
}
</script>
