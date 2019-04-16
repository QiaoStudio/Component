<template>
  <div class="text-center">
    <div class="dp-field__launcher">
      <dp-tabs :is-tab-visible="false">
        <dp-tab-item label="tab 1">
          <div class="dp-field__group-wrap">
            <div class="dp-field__col">
              <dp-select
                :items="planItems"
                :error-style="'popover'"
                :value="'Single trip plan'">
                <template slot="label">
                  Plan type
                  <dp-popover
                    :title="popoverTitle"
                    :trigger="popoverTrigger"
                    :content="popoverContent"
                    :placement="popoverPlacement"
                    :close-label="popoverCloseLabel">
                    <div>
                      <i class="fa fa-question-circle-o"
                         aria-hidden="true"></i>
                    </div>
                  </dp-popover>
                </template>
              </dp-select>
            </div>
            <div class="dp-field__col hidden-xs">
              <dp-select
                :label="'Destination'"
                :error-style="'popover'"
                :items="destinationItems"
                :value="'Hong Kong'">
              </dp-select>
            </div>
            <div class="dp-field__col">
              <dp-select
                :label="'Number of travellers'"
                :error-style="'popover'"
                :items="travellersItems"
                :value="'2 persons'">
              </dp-select>
            </div>
          </div>
        </dp-tab-item>
      </dp-tabs>
      <div class="dp-button__cont">
        <dp-button class="dp-button--primary"><i class="fa fa-search"></i>SEARCH</dp-button>
      </div>
    </div>
    <br/>
    <br/>
    <div class="dp-field__launcher">
      <dp-tabs :is-tab-visible="isTabTwoVisible">
        <dp-tab-item label="Single trip plan">
          <div class="dp-field__group-wrap">
            <div class="dp-field__col">
              <dp-select
                :label="'Travel to'"
                :error-style="'popover'"
                :items="travelItems"
                :value="'Australis'">
              </dp-select>
            </div>
            <div class="dp-field__col visible-lg-block">
              <dp-date-picker
                :label="'Start form'"
                :error-style="'popover'"
                :value="dateValue">
              </dp-date-picker>
            </div>
            <div class="dp-field__col">
              <dp-select
                :label="'For'"
                :error-style="'popover'"
                :items="travellersItems"
                :value="'2 persons'">
              </dp-select>
            </div>
            <div class="dp-button__cont hidden-xs">
              <dp-button class="dp-button--primary"><i class="fa fa-search"></i>SEARCH</dp-button>
            </div>
          </div>
        </dp-tab-item>
        <dp-tab-item label="Annual plan">
          <div class="dp-field__group-wrap">
            <div class="dp-field__col">
              <dp-select
                :label="'Covers'"
                :error-style="'popover'"
                :items="coversItems"
                :value="'Worldwide'">
              </dp-select>
            </div>
            <div class="dp-field__col">
              <dp-select
                :label="'For'"
                :error-style="'popover'"
                :items="travellersItems"
                :value="'2 persons'">
              </dp-select>
            </div>
            <div class="dp-field__col hidden-xs">
              <dp-date-picker
                :label="'Start form'"
                :mode="'single'"
                :error-style="'popover'"
                :value="new Date('2018-01-09')">
              </dp-date-picker>
            </div>
            <div class="dp-button__cont hidden-xs">
              <dp-button class="dp-button--primary"><i class="fa fa-search"></i>SEARCH</dp-button>
            </div>
          </div>
        </dp-tab-item>
      </dp-tabs>
      <div class="dp-button__cont visible-xs-block">
        <dp-button class="dp-button--primary"><i class="fa fa-search"></i>SEARCH</dp-button>
      </div>
    </div>
    <br/>
    <br/>
    <div class="dp-field__launcher">
      <dp-tabs :is-tab-visible="false">
        <dp-tab-item label="Single trip plan">
          <div class="dp-field__group-wrap">
            <div class="dp-field__col hidden-xs">
              <dp-select
                :label="'I\'m looking for'"
                :error-style="'popover'"
                :items="travellersItems"
                :value="'2 persons'">
              </dp-select>
            </div>
            <div class="dp-field__col">
              <dp-select
                :label="'Travel to'"
                :error-style="'popover'"
                :items="travelItems"
                :value="'Australis'">
              </dp-select>
            </div>
            <div class="dp-field__col">
              <dp-select
                :label="'For'"
                :error-style="'popover'"
                :items="travellersItems"
                :value="'2 persons'">
              </dp-select>
            </div>
            <div class="dp-field__col visible-lg-block">
              <dp-date-picker
                :label="'Start form'"
                :error-style="'popover'"
                :value="dateValue">
              </dp-date-picker>
            </div>
            <div class="dp-button__cont hidden-xs">
              <dp-button class="dp-button--primary"><i class="fa fa-search"></i>SEARCH</dp-button>
            </div>
          </div>
        </dp-tab-item>
      </dp-tabs>
      <div class="dp-button__cont visible-xs-block">
        <dp-button class="dp-button--primary"><i class="fa fa-search"></i>SEARCH</dp-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '~assets/css/modules/formfield-launcher';
</style>
<script>
import SelectV2 from 'elements/select'
import Button from 'elements/button'
import Tabs from 'elements/tabs'
import DatePicker from 'elements/date-picker'

export default {
  name: 'formfield-launcher',
  components: {
    SelectV2,
    Button,
    Tabs,
    DatePicker
  },
  props: {
    isTabTwoVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      planItems: [
        { key: '1', text: 'Single trip plan' },
        { key: '2', text: 'Single trip plan2' }
      ],
      destinationItems: [
        { key: '1', text: 'Hong Kong' },
        { key: '2', text: 'China' }
      ],
      travellersItems: [
        { key: '1', text: '1 persons' },
        { key: '2', text: '2 persons' }
      ],
      travelItems: [
        { key: '1', text: 'Australis' },
        { key: '2', text: 'China' }
      ],
      coversItems: [
        { key: '1', text: 'Worldwide' },
        { key: '2', text: 'Worldwide 2' }
      ],
      dateValue: { start: new Date('2018-01-09'), end: new Date('2018-01-19') },
      popoverTitle:
        '<i class="fa fa-lightbulb-o" aria-hidden="true"></i> ประเทศปลายทาง',
      popoverTrigger: 'hover',
      popoverContent:
        'ประเทศใน Schengen มีดังนี้ ออสเตรีย เบลเยี่ยม เช็กรีพับลิค เดนมาร์ค ฟินแลนด์ เอสโทเนีย ฝรั่งเศส เยอรมัน กรีซ ฮังการี ไอร์แลนด์ อิตาลี ลัทเวีย ลิทัวเนีย ลักเซมเบิร์ก มัลตา เนเธอแลนด์ นอร์เวย์ โปแลนด์ โปรตุเกส สโลวาเกีย สโลเวเนีย สเปน สวีเดน และสวิสเซอแลนด์',
      popoverPlacement: 'right',
      popoverCloseLabel: 'ปิด'
    }
  },
  computed: {
    isMobile() {
      return this.$screen.mobile()
    }
  },
  methods: {}
}
</script>
