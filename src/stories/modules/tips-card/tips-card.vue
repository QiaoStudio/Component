<template>
  <dp-tips-card
    :title="title"
    :content="mode === 'single' ? singleContent : [page1, page2, page3]"
    :alternate-text="alternateText"
    :image-url="imageUrl">
  </dp-tips-card>
</template>
<script>
import image from './yellow-light.png'

const bodyContent = [
  'A plan with this switch icon is convertible. It means the plan can be convert into another plan. A plan with this switch icon is convertible. It means the plan can be convert into another plan.' +
  ' For example, to a whole life plan A plan with this switch icon is convertible. It means the plan can be convert into another plan.',
  'It has survived not only five centuries, but also the leap into electronic typesetting, A plan with this switch icon is convertible. It means the plan can be convert into another plan.' +
  ' remaining essentially unchanged. I the 1960s with the release of Letraset',
  'If you are going to use a passage of Lorem Ipsum, A plan with this switch icon is convertible. It means the plan can be convert into another plan.' +
  'you need to be sure there isn\'t anything embarrassing hidden in the middle of text A plan with this switch icon is convertible. It means the plan can be convert into another plan.'
]

const contentMode = {
  'Multiple': 'multiple',
  'Single': 'single'
}
export default {
  data () {
    return {
      title: text('Title', 'GOBEAR TIPS'),
      mode: select('Mode', contentMode, 'multiple'),
      singleContent: text('Single Content', bodyContent[0]),
      page1: text('Page 1', bodyContent[0]),
      page2: text('Page 2', bodyContent[1]),
      page3: text('Page 3', bodyContent[2]),
      alternateText: text('Alternate Text', 'Image text'),
      imageUrl: text('Image Url', image)
    }
  }
}
</script>
