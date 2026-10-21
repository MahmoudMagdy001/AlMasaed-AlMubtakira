import { Node, mergeAttributes } from '@tiptap/core'

export type CalloutType = 'info' | 'tip' | 'warning' | 'safety'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      setCallout: (attributes?: { type?: CalloutType }) => ReturnType
      toggleCallout: (attributes?: { type?: CalloutType }) => ReturnType
    }
  }
}

export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      type: {
        default: 'info',
        parseHTML: (element) => element.getAttribute('data-callout-type') || 'info',
        renderHTML: (attributes) => ({
          'data-callout-type': attributes.type,
          class: `callout-box callout-${attributes.type} p-4 rounded-control border-s-4 my-4`,
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-callout-type]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setCallout:
        (attributes) =>
        ({ commands }) => {
          return commands.wrapIn(this.name, attributes)
        },
      toggleCallout:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleWrap(this.name, attributes)
        },
    }
  },
})
