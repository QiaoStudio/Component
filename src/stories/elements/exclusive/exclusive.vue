<template>
  <div :class="[nationalType]">
    <dp-exclusive :message-tip="messageTip">
    </dp-exclusive>
  </div>
</template>

<script>

const nationalMode = {
  'Default': '',
  'TH': 'dp-theme-th'
}
export default {
  data() {
    return {
      nationalType: select('NationalType', nationalMode, ''),
      messageTip: text('Text', 'Available only on GoBear')
    }
  }
}
</script>

