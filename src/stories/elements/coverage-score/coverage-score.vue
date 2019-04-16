<template>
  <div :class="[nationalType]">
    <dp-coverage-score
      :score="score"
      :score-base="scoreBase"
      :total-score="totalScore"></dp-coverage-score>
  </div>
</template>

<script>

const nationalMode = {
  'Default': '',
  'TH': 'dp-theme-th'
}

export default {
  data () {
    return {
      nationalType: select('NationalType', nationalMode, ''),
      score: number('Score', 4),
      totalScore: number('Total Score', 20),
      scoreBase: number('Score Base', 10)
    }
  }
}
</script>

