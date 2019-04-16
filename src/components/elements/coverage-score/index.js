import CoverageScore from './coverage-score.vue'

CoverageScore.install = function (Vue) {
  Vue.component(CoverageScore.name, CoverageScore)
}

export default CoverageScore
