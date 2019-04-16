<template>
  <div :class="[nationalType]">
    <dp-logo-title
      :insurer-name="insurerName"
      :target="target"
      :href="href"
      :plan-name="planName">
    </dp-logo-title>
  </div>
</template>

<script>

const nationalMode = {
  'Default': '',
  'TH': 'dp-theme-th'
}

export default {
  data () {
    return {
      nationalType: select('National Type', nationalMode, ''),
      insurerName: text('Insurer Name', 'FWD'),
      planName: text('Plan Name', 'Premium Assurance Authorised Workshop'),
      target: text('Target', '_blank'),
      href: text('Href', 'https://xxxxxx.com')
    }
  }
}
</script>

