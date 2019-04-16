<template>
  <div :style="(themesType === 'dp-theme-dark') ? 'background: #000;' : ''">
    <div :class="[themesType, nationalType]">
      <dp-navbar :brand="brand"
                 :items="items"
                 :is-fixed="isFixed">
        <template slot="right">
          <dp-button
            :href="'/th/review'"
            class="dp-button--ghost-primary dp-button--sm">
            <span>รีวิว</span>
            <i class="dp-button__icon--right fa fa-pencil dp-hidden__mobile"></i>
          </dp-button>
          <dp-button
            :href="'/th/login'"
            class="dp-button--primary dp-button--sm">
            <span>เข้าระบบ</span>
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
    'label': 'ประกัน',
    'active': false,
    'url': '',
    'megamenu': [
      {
        'title': 'ค้นหาประกัน',
        'type': 'link',
        'layout': 'two-column',
        'items': [
          {
            'iconType': 'product',
            'iconCategory': 'travel-insurance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'ประกันเดินทาง',
            'url': '/th/travel-insurance',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'car-insurance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'ประกันรถยนต์',
            'url': '/th/car-insurance',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'life-insurance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'ประกันชีวิตแมนูไลฟ์',
            'url': '/th/life-insurance',
            'target': ''
          }
        ]
      },
      {
        'title': 'โพสต์แนะนำ',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/th/promotion',
            'title': 'ต้องทำประกันการเดินทาง',
            'description': 'วีซ่าเชงเก็น ต้องทำประกันการเดินทาง อย่างไร? พี่หมีมีคำตอบครับ',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': 'บัตรเครดิต',
    'url': 'https://www.xxxxxx.com/th/credit-card',
    'active': false,
    'megamenu': [
      {
        'title': 'ค้นหาบัตรเครดิต',
        'type': 'link',
        'layout': 'two-column',
        'items': [
          {
            'iconType': 'brand',
            'iconCategory': 'promotion',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'ของแถมสมัครบัตร',
            'url': '/th/promotion',
            'target': ''
          },
          {
            'iconType': 'brand',
            'iconCategory': 'reward',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'บัตรสะสมแต้ม',
            'url': '/th/reward',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'airmiles',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'บัตรสะสมไมล์',
            'url': '/th/airmiles',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'dining',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'บัตรส่วนลดร้านอาหาร',
            'url': '/th/dining',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'grocery',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'บัตรส่วนลดซุปเปอร์มาร์เก็ต',
            'url': '/th/grocery',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'no-annual-fee',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'บัตรไม่มีค่าธรรมเนียม',
            'url': '/th/no-annual-fee',
            'target': ''
          }
        ]
      },
      {
        'title': 'โพสต์แนะนำ',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/sg/credit-cards',
            'title': 'ทำอย่างไรดี?',
            'description': 'สมัคร "บัตรเครดิต" เท่าไหร่ก็ไม่ผ่าน',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': 'สินเชื่อส่วนบุคคล',
    'active': false,
    'url': '',
    'megamenu': [
      {
        'title': 'ค้นหาสินเชื่อส่วนบุคคล',
        'type': 'link',
        'layout': '',
        'items': [
          {
            'iconType': 'product',
            'iconCategory': 'personal-loan',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'สินเชื่อเงินสด',
            'url': '/th/personal-loan',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'personal-loan',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'บัตรกดเงินสด',
            'url': '/th/personal-loan',
            'target': ''
          }
        ]
      },
      {
        'title': 'โปรโมชั่นสินเชื่อเงินหมุน',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/sg/promotion',
            'title': 'อย่าได้เกรงใจ!',
            'description': 'อย่าได้เกรงใจ! กฎเหล็ก 6 ข้อที่ต้องทำ เมื่อมีญาติมาขอกู้เงิน',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': 'บัญชีเงินฝาก',
    'active': false,
    'url': '',
    'megamenu': [
      {
        'title': 'ค้นหาบัญชีเงินฝาก',
        'type': 'link',
        'layout': '',
        'items': [
          {
            'iconType': 'product',
            'iconCategory': 'fixed-deposit',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'เงินฝากประจำ',
            'url': '/th/fixed-deposit',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'savings-account',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'เงินฝากออมทรัพย์',
            'url': '/th/bank-account',
            'target': ''
          }
        ]
      },
      {
        'title': 'บล๊อก',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/th/promotion',
            'title': 'ออมเงินยังไงให้อีก 10 ปีมีเงินก้อนใช้',
            'description': 'ชำแหละ 4 ประเภทบัญชีเงินฝาก แบบไหนเหมาะสมกับเรา?',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': 'บล๊อก',
    'url': 'https://www.xxxxxx.com/th/blog',
    'active': false,
    'megamenu': []
  }
]

export default {
  data() {
    return {
      themesType: select('Theme Type', themesMode, ''),
      nationalType: 'dp-theme-th',
      brand: {
        'country': 'th',
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
