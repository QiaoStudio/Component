<template>
  <div :style="(themesType === 'dp-theme-dark') ? 'background: #000;' : ''">
    <div :class="[themesType, nationalType]">
      <dp-navbar :brand="brand"
                 :items="items"
                 :is-fixed="isFixed">
        <template slot="right">
          <dp-button
            :href="'/hk/review'"
            class="dp-button--ghost-primary dp-button--sm">
            <span>用戶評價</span>
            <i class="dp-button__icon--right fa fa-pencil dp-hidden__mobile"></i>
          </dp-button>
          <dp-button
            :href="'/hk/login'"
            class="dp-button--primary dp-button--sm">
            <span>登入</span>
          </dp-button>
        </template>
      </dp-navbar>
    </div>
  </div>
</template>
<script>
const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}

const brandMode = {
  'Default': '',
  'Blog': 'blog'
}

const navbarItems = [
  {
    'label': '保險',
    'active': false,
    'url': '',
    'megamenu': [
      {
        'title': '比較 保險',
        'type': 'link',
        'layout': 'two-column',
        'items': [
          {
            'iconType': 'product',
            'iconCategory': 'travel-insurance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '旅遊保險',
            'url': '/hk/travel-insurance',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'home-insurance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '家居保險',
            'url': '/hk/home-insurance',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'health-insurance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '醫療保險',
            'url': '/hk/health-insurance',
            'target': ''
          }
        ]
      },
      {
        'title': '最新產品',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/hk/promotion',
            'title': '比較最適合你的家居保險',
            'description': '比較最適合你的家居保險 比較最適合你的家居保險',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': '信用卡',
    'url': 'https://www.xxxxxx.com/hk/credit-card',
    'active': false,
    'megamenu': [
      {
        'title': '比較 信用卡',
        'type': 'link',
        'layout': 'two-column',
        'items': [
          {
            'iconType': 'brand',
            'iconCategory': 'promotion',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '飛行里數信用卡',
            'url': '/hk/promotion',
            'target': ''
          },
          {
            'iconType': 'brand',
            'iconCategory': 'reward',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '餐飲優惠信用卡',
            'url': '/hk/reward',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'ewallet',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '學生信用卡',
            'url': '/hk/ewallet',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'robofinance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '迎新禮品信用卡',
            'url': '/hk/robofinance',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'stocks',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '娛樂優惠信用卡',
            'url': '/hk/stocks',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'bonds',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '餐飲優惠信用卡',
            'url': '/hk/bonds',
            'target': ''
          }
        ]
      },
      {
        'title': '獨家優惠',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/hk/credit-cards',
            'title': '一分鐘比較出最適合港股交易戶口',
            'description': '一分鐘比較出最適合港股交易戶口, 一分鐘比較出最適合港股交易戶口',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': '貸款',
    'active': false,
    'url': '',
    'megamenu': [
      {
        'title': '比較 貸款',
        'type': 'link',
        'layout': '',
        'items': [
          {
            'iconType': 'product',
            'iconCategory': 'personal-loan',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '私人貸款',
            'url': '/hk/personal-loan',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'home-loan',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '按揭',
            'url': '/hkhome-loan',
            'target': ''
          }
        ]
      },
      {
        'title': '最新優惠',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/hk/promotion',
            'title': '2018 稅務貸款計劃比較',
            'description': '什麼是分期貸款？什麼是循環貸款?',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': '理財戶口',
    'active': false,
    'url': '',
    'megamenu': [
      {
        'title': '比較 理財戶口',
        'type': 'link',
        'layout': 'two-column',
        'items': [
          {
            'iconType': 'product',
            'iconCategory': 'savings-account',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '出糧戶口',
            'url': '/hk/savings-account',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'fixed-deposit',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '定期存款',
            'url': '/hk/fixed-deposit',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'ewallet',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '電子錢包',
            'url': '/hk/ewallet',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'robofinance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '強積金',
            'url': '/hk/robofinance',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'stocks',
            'iconDisplay': 'dp-icon--sm-only',
            'label': '港股戶口',
            'url': '/hk/stocks',
            'target': ''
          }
        ]
      },
      {
        'title': '獨家優惠',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/hk/promotion',
            'title': '香港行山攻略',
            'description': '鳳凰徑行山＋減肥全攻略',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': 'Blog',
    'url': 'https://www.xxxxxx.com/hk/blog',
    'active': false,
    'megamenu': []
  }
]

export default {
  data() {
    return {
      themesType: select('Theme Type', themesMode, ''),
      nationalType: 'dp-theme-hk',
      brand: {
        'country': 'hk',
        'type': select('Type', brandMode, ''),
        'fallbackLogo': text('Logo fallback', 'https://picsum.photos/121/36'),
        'fallbackTagline': text('Tagline fallback', 'https://picsum.photos/121/11')
      },
      items: array('Items', navbarItems),
      isFixed: boolean('Is Fixed?', false)
    }
  }
}
</script>
