<template>
  <div class="dp-theme-blog" style="max-width: 700px; margin:auto;">
    <p class="dp-p--text">
      Lorem ipsum dolor sit amet, accumsan quia. Congue placerat a, conubia pharetra ornare at lacus suspendisse,
      eros viverra, semper lorem in, sit sed magna. Placerat et sem, etiam qui id, ut sapien mi bibendum quisque.
      Pretium vitae sed non, sed suscipit aliquam egestas, massa maecenas consectetuer. Suspendisse nam, odio
      maecenas et proin id, ligula ultricies nibh nec massa, mollis dolor, fermentum neque. Cursus vitae lobortis
      amet nam, penatibus neque arcu nunc, velit ultrices tempus dapibus libero. Condimentum posuere vitae enim,
      velit montes nulla parturient, ut pellentesque odio convallis etiam nec et, diam amet fusce sed, dictum
      purus amet. Bibendum scelerisque purus quis scelerisque, egestas justo vestibulum pellentesque felis auctor
      nam, vestibulum vitae morbi vestibulum sodales. Proin viverra ornare illo mauris nulla nec.
    </p>
    <dp-image-with-caption style="margin-top: 43px" :size-image="sizeImage">
      <img slot="image" alt="image's alt text" src="https://picsum.photos/2000/600">
      <p slot="caption" class="dp-image-with-caption__text--center">Image credit: example.com</p>
    </dp-image-with-caption>
    <p class="dp-p--text" style="margin-top: 43px">
      Lorem ipsum dolor sit amet, accumsan quia. Congue placerat a, conubia pharetra ornare at lacus suspendisse,
      eros viverra, semper lorem in, sit sed magna. Placerat et sem, etiam qui id, ut sapien mi bibendum quisque.
      Pretium vitae sed non, sed suscipit aliquam egestas, massa maecenas consectetuer. Suspendisse nam, odio
      maecenas et proin id, ligula ultricies nibh nec massa, mollis dolor, fermentum neque. Cursus vitae lobortis
      amet nam, penatibus neque arcu nunc, velit ultrices tempus dapibus libero. Condimentum posuere vitae enim,
      velit montes nulla parturient, ut pellentesque odio convallis etiam nec et, diam amet fusce sed, dictum
      purus amet. Bibendum scelerisque purus quis scelerisque, egestas justo vestibulum pellentesque felis auctor
      nam, vestibulum vitae morbi vestibulum sodales. Proin viverra ornare illo mauris nulla nec.
    </p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      sizeImage: number('Image size (percent)', 100)
    }
  },
  computed: {
    isDesktop() {
      return this.$screen.resize && this.$screen.desktop()
    }
  }
}
</script>
