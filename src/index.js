import { markdownRenderer } from 'inkdrop'
import { remarkSpoiler } from './remark-spoiler';

export default {
  activate() {
    if (markdownRenderer) {
      markdownRenderer.remarkPlugins.push(remarkSpoiler)
    }
  },
  deactivate() {
    if (markdownRenderer) {
      markdownRenderer.remarkPlugins = markdownRenderer.remarkPlugins.filter(
        plugin => {
          return plugin !== remarkSpoiler
        }
      )
    }
  }
}