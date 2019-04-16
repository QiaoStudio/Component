<template>
  <div>
    <dp-navbar :brand="brand"
               :items="items"
               :is-fixed="false">
      <template slot="right">
        <dp-button
          :href="'/sg/review'"
          class="dp-button--ghost-primary dp-button--sm">
          <span>Review</span>
          <i class="dp-button__icon--right fa fa-pencil dp-hidden__mobile"></i>
        </dp-button>
        <dp-button
          :href="'/sg/login'"
          class="dp-button--primary dp-button--sm">
          <span>Log In</span>
        </dp-button>
      </template>
    </dp-navbar>
    <main>
      <dp-hero
        :is-curved="isCurved"
        :curve-color="curveColor"
        :image-url="imageUrl"
        :image-alt="imageAlt"
        :size="size"
        :overlay-opacity="overlayOpacity">
        <template slot="content">
          <div v-html="content"></div>
        </template>
      </dp-hero>
    </main>
  </div>
</template>

<script>
const sizeOptions = {
  'Default': '',
  'Large': 'large',
  'Medium': 'medium',
  'Small': 'small'
}
const opacityOptions = {
  '0%': '0',
  '10%': '0.1',
  '20%': '0.2',
  '30%': '0.3',
  '40%': '0.4',
  '50%': '0.5',
  '60%': '0.6',
  '70%': '0.7',
  '80%': '0.8',
  '90%': '0.9'
}
const navbarItems = [
  {
    'label': 'Insurance',
    'active': false,
    'url': '',
    'megamenu': [
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
            'description': 'Don\'t miss the exclusive campaign because you don\'t want to',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': 'Loans',
    'active': false,
    'url': '',
    'megamenu': [
      {
        'title': 'Compare loans',
        'type': 'link',
        'layout': '',
        'items': [
          {
            'iconType': 'product',
            'iconCategory': 'personal-loan',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Personal Loan',
            'url': '/sg/personal-loan',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'home-loan',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Home Loan',
            'url': '/sg/home-loan',
            'target': ''
          }
        ]
      },
      {
        'title': 'GoBear TV',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/sg/promotion',
            'title': 'EP 22: Top 5 personal loan myths',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': 'Banking',
    'active': false,
    'url': '',
    'megamenu': [
      {
        'title': 'Compare banking products',
        'type': 'link',
        'layout': 'two-column',
        'items': [
          {
            'iconType': 'product',
            'iconCategory': 'savings-account',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Saving account',
            'url': '/sg/savings-account',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'fixed-deposit',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Fixed deposit',
            'url': '/sg/fixed-deposit',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'ewallet',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Ewallet',
            'url': '/sg/ewallet',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'robofinance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Robofinance',
            'url': '/sg/robofinance',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'stocks',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Stocks',
            'url': '/sg/stocks',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'bonds',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Bonds',
            'url': '/sg/bonds',
            'target': ''
          }
        ]
      },
      {
        'title': 'Blog',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/sg/promotion',
            'title': 'Learn a bunch of stuff here',
            'description': 'Don\'t miss the exclusive campaign because you don\'t want to',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': 'Promotions',
    'url': 'https://www.xxxxxx.com/sg/promotions',
    'active': false,
    'megamenu': []
  },
  {
    'label': 'Blog',
    'url': 'https://www.xxxxxx.com/sg/blog',
    'active': false,
    'megamenu': []
  }
]
const brand = {
  'country': '',
  'type': '',
  'fallbackLogo': 'https://picsum.photos/121/36',
  'fallbackTagline': 'https://picsum.photos/121/11'
}
export default {
  data () {
    return {
      isCurved: boolean('isCurved', true),
      curveColor: text('curveColor', '#FFFFFF'),
      size: select('size', sizeOptions, ''),
      imageUrl: text('imageUrl', 'https://picsum.photos/1440/500?random'),
      imageAlt: text('imageAlt', 'My Hero Image'),
      overlayOpacity: select('overlayOpacity', opacityOptions, ''),
      items: array('Items', navbarItems),
      content: text('Content Slot', '<div class="container-fluid"><div class="row"><div class="col-xs-6 col-xs-offset-3"><h1 class="dp-title dp-title--light" style="text-align: center;">Hello, World!</h1></div></div></div>'),
      brand: brand
    }
  }
}
</script>
