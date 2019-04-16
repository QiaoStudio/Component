import Hero from './hero.vue'

Hero.install = function (Vue) {
  Vue.component(Hero.name, Hero)
}

export default Hero
