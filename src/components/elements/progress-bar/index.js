import ProgressBar from './src/progress-bar.vue'

ProgressBar.install = function (Vue) {
  Vue.component(ProgressBar.name, ProgressBar)
}

export default ProgressBar
