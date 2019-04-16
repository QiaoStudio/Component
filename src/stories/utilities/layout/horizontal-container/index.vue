<template>
  <div class="dp-horizontal-container" :class="{'dp-horizontal-container--proximity': proximity}">
    <div
      v-for="i in 10"
      :key="i"
      class="dp-horizontal-container__item"
      :style="space ? 'min-width: calc(100% - ' + space + 'px' : ''"
    >
      <dp-panel
        class="dp-panel--linked"
        panel-image="https://picsum.photos/696/400"
        :is-image-full-width="false"
        panel-maintitle="City Cash Back Card"
        announcement-label-text="Offer"
        announcement-content="Get awesome Thai Milk"
        button-linked="#"
        button-text="Apply Now"
        button-type="dp-button--primary"
        button-size="dp-button--sm"
      ></dp-panel>
    </div>
  </div>
</template>

<script>
import Panel from 'modules/panel'
export default {
  data() {
    return {
      proximity: boolean('Proximity', true),
      space: number('Show preview of next card (px)', 0)
    }
  },
  components: {
    [Panel.name]: Panel
  }
}
</script>
