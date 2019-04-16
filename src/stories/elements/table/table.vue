<template>
  <div>
    <dp-table
      :headers="headers"
      :data="data"
      :header-style="headerStyle"
      :class="tableStyle"></dp-table>
  </div>
</template>

<script>

const headerStyle = {
  top: 'top',
  left: 'left'
}

const styleMode = {
  '': 'default',
  'dp-table--secondary-simple': 'Secondary Simple'
}

const data = [
  {
    groceryCashback: '- 1.6% \r\n - No cashback cap \r\n - No minimum spend required',
    otherRewards: '- 2 TREATS points for the equivalent of $1 spent on foreign currency transactions',
    creditCard: 'Citi Cash Back Card'
  },
  {
    groceryCashback: '- 7% in all Sheng Siong stores (capped at $70 per month)',
    creditCard: 'HSBC Cash Back Card',
    otherRewards: '- 5% cashback on Grab and taxi rides (capped at $20, minimum spend of $400 outside of Sheng Siong)'
  },
  {
    creditCard: 'TP Cash Back Card',
    groceryCashback: '- 1.6% \r\n - No cashback cap \r\n - No minimum spend required',
    otherRewards: '- 5% cashback on Grab and taxi rides (capped at $20, minimum spend of $400 outside of TP Bank)'
  }
]

const headers = [
  {
    fieldName: 'creditCard',
    label: 'Credit card'
  },
  {
    fieldName: 'groceryCashback',
    label: 'Grocery cashback'
  },
  {
    fieldName: 'otherRewards',
    label: 'Other rewards'
  }
]

export default {
  data() {
    return {
      tableStyle: select('Table Style', styleMode, 'dp-table--secondary-simple'),
      headerStyle: select('Header style', headerStyle, 'top'),
      headers: headers,
      data: data
    }
  }
}
</script>
