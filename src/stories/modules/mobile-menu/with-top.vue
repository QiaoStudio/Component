<template>
  <div>
    <dp-navbar :brand="{
                 country: '',
                 type: '',
                 fallbackLogo: 'https://picsum.photos/121/36',
                 fallbackTagline: 'https://picsum.photos/121/11'
               }"
               :items="items"
               :is-fixed="false">
      <template slot="right">
        <dp-button
          :href="'/sg/review'"
          class="dp-button--ghost-primary dp-button--sm">
          <span>Review</span>
          <i class="dp-button__icon--right fa fa-pencil hidden__mobile"></i>
        </dp-button>
        <dp-button
          :href="'/sg/login'"
          class="dp-button--primary dp-button--sm">
          <span>Log In</span>
        </dp-button>
      </template>
    </dp-navbar>
    <dp-mobile-menu :title="title"
                    :home="home"
                    :items-title="itemsTitle"
                    :items="items">
      <template slot="top">
        <div class="mock-account-module">
          <dp-button
            :href="'/sg/login'"
            class="dp-button--primary dp-button--sm dp-button--block">
            <span>Login with Facebook</span>
          </dp-button>
          <dp-button
            :href="'/sg/login'"
            class="dp-button--ghost-primary-light dp-button--sm dp-button--block">
            <span>Login with Email</span>
          </dp-button>
        </div>
      </template>
    </dp-mobile-menu>
  </div>
</template>

<style lang="scss" scoped>
  .mock-account-module {
    a:first-child {
      margin-bottom: 16px;
    }
  }
</style>

<script>
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
    'label': 'Credit cards',
    'url': 'https://www.xxxxxx.com/sg/credit-card',
    'active': false,
    'megamenu': [
      {
        'title': 'Compare credit cards',
        'type': 'link',
        'layout': 'two-column',
        'items': [
          {
            'iconType': 'brand',
            'iconCategory': 'promotion',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Promotion',
            'url': '/sg/promotion',
            'target': ''
          },
          {
            'iconType': 'brand',
            'iconCategory': 'reward',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Reward',
            'url': '/sg/reward',
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
        'title': 'GoBear Credit cards',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/sg/credit-cards',
            'title': 'New Credit cards',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
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
    'label': 'Blog',
    'url': 'https://www.xxxxxx.com/sg/blog',
    'active': false,
    'megamenu': []
  }
]
export default {
  data() {
    return {
      title: text('Title', 'Menu'),
      home: {
        label: text('Home Label', 'Home'),
        url: text('Home URL', '/sg')
      },
      itemsTitle: text('Items Label', 'Compare:'),
      items: array('Items', navbarItems)
    }
  }
}
</script>
