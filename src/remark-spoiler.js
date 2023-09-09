import { visit, CONTINUE } from 'unist-util-visit'

const regex = /\|\|(\+1|[-\w]+)\|\|/g

export function remarkSpoiler() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      if (!regex.test(node.value)) return [CONTINUE]

      const value = node.value
      const slices = []
      regex.lastIndex = 0
      let match = regex.exec(value)
      let start = 0

      // 分割する処理
      while (match) {
        const text = (match[0])
        const position = match.index

        if (start !== position) {
          slices.push(value.slice(start, position))
        }

        slices.push(text)
        start = position + match[0].length
        match = regex.exec(value)
      }

      if (slices.length > 0) {
        slices.push(value.slice(start))
      }

      const children = slices.map((text) => {
        if (regex.test(text)){
          return {
            type: 'spoiler',
            children: [
              {
                type: 'text',
                value: text.substring(2, text.length - 2)
              }
            ],
            data: {
              hName: 'span',
              hProperties: {
                className: ['spoiler']
              }
            }
          }
        }else{
          return {
            type: "text",
            value: text
          }
        }
      })

      parent.children.splice(index, 1)

      children.reverse().forEach((item) => {
        parent.children.splice(index, 0, item)
      })
    })
  }
};