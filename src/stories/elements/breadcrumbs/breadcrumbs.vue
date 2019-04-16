<template>
  <dp-breadcrumbs :levels="levels">
  </dp-breadcrumbs>
</template>

<script>
export default {
  data() {
    return {
      levels: [
        {
          text: text('Text level 1', 'Blog'),
          link: text('Link level 1', 'https://www.xxxxxx.com'),
          isVisible: boolean('Is level 1 visible?', true)
        },
        {
          text: text('Text level 2', 'Budgeting'),
          link: text('Link level 2', 'https://www.xxxxxx.com'),
          isVisible: boolean('Is level 2 visible?', true)
        },
        {
          text: text('Text level 3', '8 Tips to Save Money Everyday'),
          link: text('Link level 3', 'https://www.xxxxxx.com'),
          isVisible: boolean('Is level 3 visible?', true)
        }
      ]
    }
  }
}
</script>

