<template>
  <div>
    <dp-progress-bar
      :percent="percent"
      :height="height"
      :indicator-on-mobile="indicatorOnMobile"
      :indicator-on-desktop="indicatorOnDesktop"
    ></dp-progress-bar>
    <br>
    <br>
    <div style="text-align: left;">
      <p>--- Test transition ---</p>
      <button name="add percent" type="button" @click="add" class="btn btn-primary">Add percent</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      percentToAdd: number('Percent to add (to test transition)', 10),
      percent: number('Progress percent:', 79),
      height: number('Progress height:', 6),
      indicatorOnMobile: boolean('Show indicator on mobile', false),
      indicatorOnDesktop: boolean('Show indicator on desktop', true)
    }
  },
  methods: {
    add() {
      this.percent += this.percentToAdd
    }
  }
}
</script>
