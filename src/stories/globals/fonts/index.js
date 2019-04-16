import {
  storiesOf
} from '@storybook/vue'
import {
  withKnobs
} from '@storybook/addon-knobs'
import {
  withDocs
} from 'storybook-readme'
import FontsReadMe from './index.md'

storiesOf('Globals', module)
  .addDecorator(withDocs(FontsReadMe))
  .addDecorator(withKnobs)
  .add('Fonts', () => ({
    template: `<div style="text-align: left;">
    <div style="font-size:1.8rem;">
      <h4 class="dp-title dp-title--lead">Alleyn regular (400) --</h4>
      <p style="font-family:'Alleyn';font-weight:400;">The easiest way to find what you really need</p>
      <h4 class="dp-title dp-title--lead">Alleyn medium (500) --</h4>
      <p style="font-family:'Alleyn';font-weight:500;">The easiest way to find what you really need</p>
      <h4 class="dp-title dp-title--lead">Alleyn bold (700) --</h4>
      <p style="font-family:'Alleyn';font-weight:700;">The easiest way to find what you really need</p>
    </div>
    <div style="font-size:1.8rem;">
      <h4 class="dp-title dp-title--lead">Open Sans regular (400)  --</h4>
      <p style="font-family:'Open Sans';font-weight:400;">The easiest way to find what you really need</p>
      <h4 class="dp-title dp-title--lead">Open Sans semibold (600)  --</h4>
      <p style="font-family:'Open Sans';font-weight:600;">The easiest way to find what you really need</p>
      <h4 class="dp-title dp-title--lead">Open Sans bold (700)  --</h4>
      <p style="font-family:'Open Sans';font-weight:700;">The easiest way to find what you really need</p>
    </div>
    <div style="font-size:1.8rem;">
      <h4 class="dp-title dp-title--lead">Open Sans w/ vn glyphs regular (400)  --</h4>
      <p style="font-family:'Open Sans w/vn glyphs';font-weight:400;">Cách đơn giản nhất để tìm thứ bạn cần.</p>
      <h4 class="dp-title dp-title--lead">Open Sans w/ vn glyphs semibold (600)  --</h4>
      <p style="font-family:'Open Sans w/vn glyphs';font-weight:600;">Cách đơn giản nhất để tìm thứ bạn cần.</p>
      <h4 class="dp-title dp-title--lead">Open Sans w/ vn glyphs bold (700)  --</h4>
      <p style="font-family:'Open Sans w/vn glyphs';font-weight:700;">Cách đơn giản nhất để tìm thứ bạn cần.</p>
    </div>
    <div style="font-size:2.4rem;">
      <h4 class="dp-title dp-title--lead">DBAdmanRoundedX regular (400)  --</h4>
      <p style="font-family:'DBAdmanRoundedX';font-weight:400;">ค้นหา - เปรียบเทียบ - เลือกข้อเสนอที่ใช่! 3 ขั้นตอนให้คุณเลือกได้เอง!</p>
      <h4 class="dp-title dp-title--lead">DBAdmanRoundedX bold (700)  --</h4>
      <p style="font-family:'DBAdmanRoundedX';font-weight:700;">ค้นหา - เปรียบเทียบ - เลือกข้อเสนอที่ใช่! 3 ขั้นตอนให้คุณเลือกได้เอง!</p>
    </div>
    <div style="font-size:2.4rem;">
    <h4 class="dp-title dp-title--lead">THSarabun regular (400) --</h4>
    <p style="font-family:'THSarabunNew';font-weight:400;">ค้นหา - เปรียบเทียบ - เลือกข้อเสนอที่ใช่! 3 ขั้นตอนให้คุณเลือกได้เอง!</p>
    <h4 class="dp-title dp-title--lead">THSarabun bold (700) --</h4>
    <p style="font-family:'THSarabunNew';font-weight:700;">ค้นหา - เปรียบเทียบ - เลือกข้อเสนอที่ใช่! 3 ขั้นตอนให้คุณเลือกได้เอง!</p>
  </div>
  </div>`
  }))
