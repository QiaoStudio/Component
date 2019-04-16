<template>
  <a class="dp-link dp-link--author-profile"
     :href="linkUrl"
     :target="linkTarget">
    {{ linkText }}
  </a>
</template>

<script>
const linkTargetMode = {
  'Open in a new tab': '_blank',
  'Open in the same frame as it was clicked': '_self',
  'Open in the parent frame(current tab)': '_parent',
  'Open in the full body of the window(current tab)': '_top'
}
export default {
  data () {
    return {
      linkText: text('Text of link', 'more posts'),
      linkUrl: text('URL of link', 'https://xxxxxx.com'),
      linkTarget: select('Where open the link', linkTargetMode, '_blank')
    }
  }
}
</script>
