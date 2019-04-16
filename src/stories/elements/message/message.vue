<template>
  <div>
    <dp-message
      @click="messageAction"
      :class="className"
      :is-show-button="isShowButton">
      <div v-html="sampleContent"/>
    </dp-message>
  </div>
</template>

<script>

const colorMode = {
  'dp-message--yellow': 'dp-message--yellow',
  'dp-message--green': 'dp-message--green'
}

export default {
  data () {
    return {
      sampleContent: `<p>Please note that the results are based on people who are:</p>
      <ul style="list-style: disc; padding-left: 18px">
        <li><strong>Male</strong></li>
        <li><strong>age between 30 - 35 year-old</strong></li>
        <li><strong>500 dong sum assured</strong></li>
        <li><strong>18 year of policy tm</strong></li>
      </ul>
      <p>Click the <strong>"ENQUIRE"</strong> button if you'd like to get a more specific quote with insurer.</p>`,
      isShowButton: boolean('isShowButton', true),
      className: select('Color', colorMode, 'dp-message--yellow')
    }
  },
  methods: {
    messageAction() {
    }
  }
}
</script>

