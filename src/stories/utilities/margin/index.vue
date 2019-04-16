<template>
  <div class="utility-margin">
    <template v-if="!noMargin">
      <div v-if="thickness === ''"
           :class="`dp-margin-${position}-${size + onScreen}`">
        <span>.dp-margin-{{ position }}-{{ size + onScreen }}</span>
      </div>
      <div v-else
           :class="`dp-margin-${position}-${size}-${thickness + onScreen}`">
        <span>.dp-margin-{{ position }}-{{ size }}-{{ thickness + onScreen }}</span>
      </div>
    </template>
    <template v-else>
      <div :class="`dp-margin-${position}-none`">
        <span>.dp-margin-{{ position }}-none</span>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.utility-margin {
  border: 1px solid #00b84b;
  margin: 1em 0;
  padding: 0;
  font-size: 1.6rem;
  background-color: #00b84b;

  &>div{
    background-color: #ffffff;

    span {
      display: block;
      padding: 0.5rem;
      text-transform: lowercase;
    }
  }
}
</style>

<script>
const thickness = {
  'Thin': 'thin',
  'Default': '',
  'Fat': 'fat'
}
const sizes = {
  'Extra Small': 'xs',
  'Small': 'sm',
  'Medium': 'md',
  'Large': 'lg',
  'Extra Large': 'xl'
}
const positions = {
  'All': 'all',
  'Left & Right': 'x',
  'Top & Bottom': 'y',
  'Top': 'top',
  'Right': 'right',
  'Bottom': 'bottom',
  'Left': 'left'
}
const screen = {
  'none': '',
  'Only mobile and tablet': '--only-mobile-and-tablet',
  'Only tablet': '--only-tablet',
  'Only tablet up': '--only-tablet-up',
  'Only desktop': '--only-desktop',
  'Only desktop large': '--only-desktop-up'
}
export default {
  data() {
    return {
      position: select('Position', positions, 'all'),
      thickness: select('Thickness', thickness, ''),
      size: select('Size', sizes, 'xs'),
      onScreen: select('Only screen', screen, ''),
      noMargin: boolean('No Margin?', false)
    }
  }
}
</script>
