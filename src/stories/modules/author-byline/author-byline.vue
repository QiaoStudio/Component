<template>
  <div class="dp-theme-article">
    <dp-author-byline
      :author="author"
      :author-avatar="authorAvatar"
      :alt="alt"
      :time="time"
      :max-width="maxW"
      :max-height="maxH"
      :is-span-wrap="isSpanWrap"
      :formatter="formatter"
      :href="href">
    </dp-author-byline>
  </div>
</template>
<script>

export default {
  data() {
    return {
      author: text('Author', 'Walter White'),
      href: text('Author text link', 'http://xxxxxx.com'),
      authorAvatar: text('Author Avatar', 'https://picsum.photos/62'),
      alt: text('Author Alt', 'Walter White'),
      time: text('last updated', new Date('2018-11-22').toISOString()),
      maxW: number('Max Width', 40),
      maxH: number('Max Height', 40),
      isSpanWrap: boolean('Is Span SM Wrap', false),
      formatter: text('date formatter', 'DD MMM YYYY')
    }
  }
}
</script>
