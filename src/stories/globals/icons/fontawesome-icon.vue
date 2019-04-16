<template>
  <div style="text-align: center; padding: 24px 0; display: flex; justify-content: center; font-size: 1.6rem;">
    <i aria-hidden="true"
       class="fa"
       :class="`fa-${iconName}`" />
  </div>
</template>

<script>
const iconMode = {
  'Calendar (Outlined)': 'calendar-o',
  'Facebook': 'facebook',
  'Google Plus': 'google-plus',
  'Twitter': 'twitter',
  'Instagram': 'instagram',
  'LinkedIn': 'linkedin',
  'Youtube': 'youtube',
  'Line': 'line-app',
  'Eye': 'eye',
  'Eye (Slash)': 'eye-slash',
  'Caret (Down)': 'caret-down',
  'Caret (Up)': 'caret-up',
  'Lightbulb (Outlined)': 'lightbulb-o',
  'Question Circle': 'question-circle',
  'Question Circle (Outlined)': 'fa-question-circle-o',
  'search': 'search',
  'Angle (Right)': 'angle-right',
  'Close': 'close',
  'Warning': 'warning',
  'Cloud Upload': 'cloud-upload',
  'Check': 'check',
  'Times': 'times',
  'File': 'file',
  'Camera': 'camera',
  'Trash': 'trash',
  'Star': 'star',
  'Star (Outlined)': 'star-o',
  'Info Circle': 'info-circle',
  'Plus': 'plus',
  'Megaphone': 'megaphone',
  'Crown': 'crown',
  'Edit': 'edit',
  'Filter': 'filter',
  'Arrow (Right)': 'arrow-right',
  'Pencil': 'pencil'
}

export default {
  data () {
    return {
      iconName: select('Icon Name', iconMode, 'calendar-o')
    }
  }
}
</script>
