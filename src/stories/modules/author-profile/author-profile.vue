<template>
  <div>
    <dp-author-profile
      :author="author"
      :link-button-text="linkButtonText"
      :link-url="linkUrl"
      :alt = "alt"
      :author-avatar="authorAvatar"
      :description="description">
    </dp-author-profile>
  </div>
</template>
<script>

export default {
  data() {
    return {
      author: text('Author', 'Ander Hesselink'),
      description: text('Description', 'Dutchman Andre Hesselink may be well-versed in the online and travel scene today, but it was Japanese rice crackers that gave him his first taste of business.'),
      authorAvatar: text('authorAvatar', 'https://picsum.photos/62'),
      linkButtonText: text('linkButtonText', 'MORE POST'),
      linkUrl: text('linkUrl', 'www.google.com'),
      alt: text('Image Alt Message', 'author avatar')
    }
  }
}
</script>
