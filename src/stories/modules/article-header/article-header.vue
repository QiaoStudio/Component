<template>
  <div class="dp-theme-bg-gray-1">
    <div class="container">
      <dp-article-header
        :levels="levels"
        :title="title"
        :image-alt="imageAlt"
        :image-url="imageUrl"
        :mobile-image-url="mobileImageUrl"
        :author="authorDetails">
      </dp-article-header>
    </div>
  </div>
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
        }
      ],
      title: text('title', '8 Tips to Save Money Everyday'),
      imageAlt: text('imageAlt', 'Image'),
      imageUrl: text('imageUrl', 'https://picsum.photos/1218/754'),
      mobileImageUrl: text('mobileImageUrl', 'https://picsum.photos/767/474'),
      authorDetails: {
        author: text('Author', 'Walter White'),
        href: text('Author text link', 'http://xxxxxx.com'),
        authorAvatar: text('Author Avatar', 'https://picsum.photos/62'),
        alt: text('Author Alt', 'Walter White'),
        time: date('last updated', new Date('2018-11-22')),
        maxW: number('Max Width', 40),
        maxH: number('Max Height', 40),
        isSpanWrap: boolean('Is Span SM Wrap', false),
        formatter: text('date formatter', 'DD MMM YYYY')
      }
    }
  }
}
</script>
