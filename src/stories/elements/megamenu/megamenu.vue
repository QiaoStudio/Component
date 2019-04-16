<template>
  <dp-megamenu :columns="columns"></dp-megamenu>
</template>

<script>
const columns = [
  {
    'title': 'Compare insurance',
    'type': 'link',
    'layout': 'two-column',
    'items': [
      {
        'iconType': 'product',
        'iconCategory': 'travel-insurance',
        'iconDisplay': 'dp-icon--sm-only',
        'label': 'Travel Insurance',
        'url': '/sg/travel-insurance',
        'target': ''
      },
      {
        'iconType': 'product',
        'iconCategory': 'car-insurance',
        'iconDisplay': 'dp-icon--sm-only',
        'label': 'Car Insurance',
        'url': '/sg/car-insurance',
        'target': ''
      },
      {
        'iconType': 'product',
        'iconCategory': 'health-insurance',
        'iconDisplay': 'dp-icon--sm-only',
        'label': 'Driver & Passenger\' Personal Accident',
        'url': '/sg/personal-accident',
        'target': ''
      }
    ]
  },
  {
    'title': 'Promotion',
    'type': 'article',
    'layout': '',
    'items': [
      {
        'imgUrl': 'https://picsum.photos/120',
        'url': '/sg/promotion',
        'title': 'Learn a bunch of stuff here',
        'description': 'Don\'t miss the exclusive campaign because you don\'t want to.',
        'target': '_self'
      }
    ]
  }
]

export default {
  data () {
    return {
      columns: array('Columns', columns)
    }
  }
}
</script>
