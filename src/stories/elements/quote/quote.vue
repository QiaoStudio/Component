<template>
  <dp-quote :type="type">{{ text }}</dp-quote>
</template>

<script>

const pulltype = {
  '': '',
  'pull': 'pull'
}

const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}

export default {
  data () {
    return {
      themesType: select('ThemesType', themesMode, ''),
      text: text('Text', '“Always compare between different policies to see if the coverage is right for what you’re doing.”'),
      type: select('type', pulltype, '')
    }
  }
}
</script>

