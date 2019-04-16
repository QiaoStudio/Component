<template>
  <div>
    <dp-button
      class="dp-button--primary"
      @click="onOpenAlert">Confirm</dp-button>
    <dp-modal-confirmation
      :is-open.sync="showAlert"
      :icon="icon"
      :title="titleData"
      :ok-text="okText"
      :cancel-text="cancelTextData"
      :content="content">
    </dp-modal-confirmation>
  </div>
</template>
<script>
const icons = {
  Warning: 'warning',
  Eye: 'eye',
  Calendar: 'calendar',
  Lightbulb: 'lightbulb',
  'Question Circle': 'question',
  Check: 'check',
  Times: 'times',
  Star: 'star',
  Info: 'info',
  'Eye Slash': 'eye-slash'
}
export default {
  data() {
    return {
      icon: select('Icon', icons, 'warning'),
      title: text('Title', 'Sure to close?'),
      okText: text('Ok', 'Yep, I’m sure'),
      cancelText: text('Cancel', 'Let’s keep going'),
      content: text(
        'Content',
        'Are you sure to end the process half way here?'
      ),
      showCancelBtn: boolean('Show Cancel button', true),
      showTitle: boolean('Show Title', true),
      showAlert: false
    }
  },
  computed: {
    cancelTextData() {
      return this.showCancelBtn ? this.cancelText : ''
    },
    titleData() {
      return this.showTitle ? this.title : ''
    }
  },
  beforeMount() {
    let Modal = document.querySelector('.dp-modal')
    if (Modal) {
      Modal.remove()
    }
  },
  methods: {
    onOpenAlert() {
      this.showAlert = true
    }
  }
}
</script>
