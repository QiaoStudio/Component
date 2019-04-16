import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComHeroReadme from './basic.md'
import ComHeroFixedHeaderReadme from './with-fixed-header.md'
import { withDocs } from 'storybook-readme'
import Hero from './hero'
import HeroWithFixedHeader from './with-fixed-header'

storiesOf('Elements/Hero', module)
  .addDecorator(withDocs(ComHeroReadme))
  .addDecorator(withKnobs({
    escapeHTML: false
  }))
  .add('Basic Hero', () => {
    return Hero
  })

storiesOf('Elements/Hero', module)
  .addDecorator(withDocs(ComHeroFixedHeaderReadme))
  .addDecorator(withKnobs({
    escapeHTML: false
  }))
  .add('Hero with Fixed Header', () => {
    return HeroWithFixedHeader
  })
