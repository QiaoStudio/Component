import { withDocs } from 'storybook-readme'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import TextAlignReadme from './text-align/index.md'
import TextAlignTemplate from './text-align/index.vue'
import TextLinkReadme from './text-link/index.md'
import TextLinkTemplate from './text-link/index.vue'
import TextLinkAuthorReadme from './text-link/author-profile/index.md'
import TextLinkAuthorTemplate from './text-link/author-profile/index.vue'
import TextLinkBlogReadme from './text-link/blog/index.md'
import TextLinkBlogTemplate from './text-link/blog/index.vue'
import TitleReadme from './headings/index.md'
import TitleTemplate from './headings/index.vue'
import TitleArticleReadme from './headings/article/index.md'
import TitleArticleTemplate from './headings/article/index.vue'
import TitleBlogReadme from './headings/blog/index.md'
import TitleBlogTemplate from './headings/blog/index.vue'
import SubtitleReadme from './subtitle/index.md'
import SubtitleTemplate from './subtitle/index.vue'
import ParagraphSpanReadme from './paragraph-span/index.md'
import ParagraphSpanTemplate from './paragraph-span/index.vue'

storiesOf('Utilities/Text', module)
  .addDecorator(withDocs(TextAlignReadme))
  .addDecorator(withKnobs)
  .add('Alignment', () => TextAlignTemplate)

storiesOf('Utilities/Text/Text Link', module)
  .addDecorator(withDocs(TextLinkReadme))
  .addDecorator(withKnobs)
  .add('Default', () => TextLinkTemplate)

storiesOf('Utilities/Text/Text Link', module)
  .addDecorator(withDocs(TextLinkAuthorReadme))
  .addDecorator(withKnobs)
  .add('in Author Profile', () => TextLinkAuthorTemplate)

storiesOf('Utilities/Text/Text Link', module)
  .addDecorator(withDocs(TextLinkBlogReadme))
  .addDecorator(withKnobs)
  .add('in Blog', () => TextLinkBlogTemplate)

storiesOf('Utilities/Text/Headings', module)
  .addDecorator(withDocs(TitleReadme))
  .addDecorator(withKnobs)
  .add('Default', () => TitleTemplate)

storiesOf('Utilities/Text/Headings', module)
  .addDecorator(withDocs(TitleArticleReadme))
  .addDecorator(withKnobs)
  .add('in Article', () => TitleArticleTemplate)

storiesOf('Utilities/Text/Headings', module)
  .addDecorator(withDocs(TitleBlogReadme))
  .addDecorator(withKnobs)
  .add('in Blog', () => TitleBlogTemplate)

storiesOf('Utilities/Text', module)
  .addDecorator(withDocs(SubtitleReadme))
  .addDecorator(withKnobs)
  .add('Subtitle', () => SubtitleTemplate)

storiesOf('Utilities/Text', module)
  .addDecorator(withDocs(ParagraphSpanReadme))
  .addDecorator(withKnobs)
  .add('Paragraph & Span', () => ParagraphSpanTemplate)
