<template>
  <transition-group name="dp-shuffle"
                    v-bind="$attrs">
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  name: 'dp-shuffle-transition'
}
</script>
