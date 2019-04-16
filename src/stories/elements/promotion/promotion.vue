<template>
  <div :class="[nationalType]">
    <dp-promotion
      :promotion-summary="promotionSummary"
      :is-use-custom-option="isUseCustomOption"
      :promotion-type="promotionType"
      :action-label="actionLabel"
      :flip-position="flipPositionValue"
      :popover-title="popoverTitle"
      :popover-content="popoverContents"
    ></dp-promotion>
  </div>
</template>

<script>

const nationalMode = {
  'Default': '',
  'TH': 'dp-theme-th'
}

const PromoPopoverProType = {
  'Default': '',
  'Only with text (single promo)': 'singlePromoWithtext',
  'Only with text (multiple promos)': 'multiplePromoWithtext',
  'With image (single promos)': 'singlePromoWithImg',
  'With image (multiple promos)': 'multiplePromoWithImg'
}

export default {
  data () {
    return {
      nationalType: select('National Type', nationalMode, ''),
      promotionSummaryText: text('Promotion Text', 'Airport lounge access / Wifi voucher'),
      actionLabel: text('Call to Action Label', 'More'),
      flipPositionArray: array('flipPositionArray', ['top', 'left', 'right', 'bottom']),
      flipPositionString: text('flipPositionString', 'flip'),
      isUseFlipPositionArray: boolean('use flipPositionArray?', false),
      isUseCustomOption: boolean('use cumstom option?', false),
      promotionPopoverContent: select('proTypes of promo pop over', PromoPopoverProType, ''),
      promotionType: text('Promotion Type', 'grid-view')
    }
  },
  computed: {
    // national type is th
    isTHNational() {
      return this.nationalType === 'dp-theme-th'
    },
    flipPositionValue() {
      return this.isUseFlipPositionArray ? this.flipPositionArray : this.flipPositionString
    },
    // promotion
    promotionSummary() {
      if (typeof window !== 'undefined') {
        let bodyClass = document.querySelector('body').classList
        this.isTHNational ? bodyClass.add('dp-theme-th') : bodyClass.remove('dp-theme-th')
      }
      return this.isTHNational ? 'ต้อนรับวันแม่ ซิกน่าให้รวมค่าเบี้ยได้' : 'Airport lounge access / Wifi voucher'
    },
    popoverTitle() {
      return this.isTHNational ? 'โปรโมชั่น' : 'popver title'
    },
    popoverContents() {
      let promotionList
      switch (this.promotionPopoverContent) {
        case 'singlePromoWithtext' :
          promotionList = this.isTHNational ? [{
            'title': '5 บาท = 1 ไมล์ + Starbucks สูงสุด 500',
            'content': 'รับมูลค่า 50 เหรียญจาก CapitaVouchers พร้อมประกันภัยการเดินทางประจำปี FWD ทุกประเภท (ขึ้นอยู่กับเบี้ยประกันภัยขั้นต่ำ 250 เหรียญ)',
            'time': 'วันนี้ - 30 พ.ย. 61'
          }] : [{
            'title': '5 baht = 1 mile + Starbucks maximum 500',
            'content': 'Receive $ 50 worth of CapitaVouchers With all annual FWD travel insurance (depending on the minimum insurance premium of $ 250) ',
            'time': '12 30 2016'
          }]
          break
        case 'multiplePromoWithtext':
          promotionList = this.isTHNational ? [{
            'title': '5 บาท = 1 ไมล์ + Starbucks สูงสุด 500',
            'content': 'รับมูลค่า 50 เหรียญจาก CapitaVouchers พร้อมประกันภัยการเดินทางประจำปี FWD ทุกประเภท (ขึ้นอยู่กับเบี้ยประกันภัยขั้นต่ำ 250 เหรียญ)',
            'time': 'วันนี้ - 30 พ.ย. 61'
          }, {
            'title': '5 บาท = 1 ไมล์ + Starbucks สูงสุด 500',
            'content': 'รับมูลค่า 50 เหรียญจาก CapitaVouchers พร้อมประกันภัยการเดินทางประจำปี FWD ทุกประเภท (ขึ้นอยู่กับเบี้ยประกันภัยขั้นต่ำ 250 เหรียญ)',
            'time': 'วันนี้ - 30 พ.ย. 61'
          }] : [{
            'title': '5 baht = 1 mile + Starbucks maximum 500',
            'content': 'Receive $ 50 worth of CapitaVouchers With all annual FWD travel insurance (depending on the minimum insurance premium of $ 250) ',
            'time': '12 30 2016'
          }, {
            'title': '5 baht = 1 mile + Starbucks maximum 500',
            'content': 'Receive $ 50 worth of CapitaVouchers With all annual FWD travel insurance (depending on the minimum insurance premium of $ 250) ',
            'time': '12 30 2016'
          }]
          break
        case 'singlePromoWithImg':
          promotionList = this.isTHNational ? [{
            'title': '5 บาท = 1 ไมล์ + Starbucks สูงสุด 500',
            'image': {
              'href': 'https://picsum.photos/200',
              'alt': 'promotion'
            },
            'content': 'รับมูลค่า 50 เหรียญจาก CapitaVouchers พร้อมประกันภัยการเดินทางประจำปี FWD ทุกประเภท (ขึ้นอยู่กับเบี้ยประกันภัยขั้นต่ำ 250 เหรียญ)'
          }] : [{
            'title': '5 baht = 1 mile + Starbucks maximum 500',
            'image': {
              'href': 'https://picsum.photos/200',
              'alt': 'promotion'
            },
            'content': 'Receive $ 50 worth of CapitaVouchers With all annual FWD travel insurance (depending on the minimum insurance premium of $ 250) '
          }]
          break
        case 'multiplePromoWithImg':
          promotionList = this.isTHNational ? [{
            'title': '5 บาท = 1 ไมล์ + Starbucks สูงสุด 500',
            'image': {
              'href': 'https://picsum.photos/200',
              'alt': 'promotion'
            },
            'content': 'รับมูลค่า 50 เหรียญจาก CapitaVouchers พร้อมประกันภัยการเดินทางประจำปี FWD ทุกประเภท (ขึ้นอยู่กับเบี้ยประกันภัยขั้นต่ำ 250 เหรียญ)'
          }, {
            'title': '5 บาท = 1 ไมล์ + Starbucks สูงสุด 500',
            'image': {
              'href': 'https://picsum.photos/200',
              'alt': 'promotion'
            },
            'content': 'รับมูลค่า 50 เหรียญจาก CapitaVouchers พร้อมประกันภัยการเดินทางประจำปี FWD ทุกประเภท (ขึ้นอยู่กับเบี้ยประกันภัยขั้นต่ำ 250 เหรียญ)'
          }] : [{
            'title': '5 baht = 1 mile + Starbucks maximum 500',
            'image': {
              'href': 'https://picsum.photos/200',
              'alt': 'promotion'
            },
            'content': 'Receive $ 50 worth of CapitaVouchers With all annual FWD travel insurance (depending on the minimum insurance premium of $ 250) '
          }, {
            'title': '5 baht = 1 mile + Starbucks maximum 500',
            'image': {
              'href': 'https://picsum.photos/200',
              'alt': 'promotion'
            },
            'content': 'Receive $ 50 worth of CapitaVouchers With all annual FWD travel insurance (depending on the minimum insurance premium of $ 250) '
          }]
          break
        default:
          promotionList = this.isTHNational ? [{
            'title': '5 บาท = 1 ไมล์ + Starbucks สูงสุด 500',
            'image': {
              'href': 'https://picsum.photos/200',
              'alt': 'promotion'
            },
            'content': 'รับมูลค่า 50 เหรียญจาก CapitaVouchers พร้อมประกันภัยการเดินทางประจำปี FWD ทุกประเภท (ขึ้นอยู่กับเบี้ยประกันภัยขั้นต่ำ 250 เหรียญ)',
            'time': 'วันนี้ - 30 พ.ย. 61'
          }, {
            'title': '5 บาท = 1 ไมล์ + Starbucks สูงสุด 500',
            'content': 'รับเลย!! สิทธิพิเศษ 2 ต่อ ต่อ 1 เบี้ยทุก 5 บาท แลกรับ 1 ROP Mile หรือ 1 BIG Point ต่อ 2 เบี้ยทุก 500 บาท รับ Starbucks e-Coupon 100 บาท สูงสุด 500 บาท** '
          }] : [{
            'title': '5 baht = 1 mile + Starbucks maximum 500',
            'image': {
              'href': 'https://picsum.photos/200',
              'alt': 'promotion'
            },
            'content': 'Receive $ 50 worth of CapitaVouchers With all annual FWD travel insurance (depending on the minimum insurance premium of $ 250) '
          }]
      }
      return promotionList
    }
  },
  created () {
    this.promotionSummaryText = text('Promotion Text', this.promotionSummary)
  }
}
</script>
