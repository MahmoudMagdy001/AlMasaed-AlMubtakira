import { Extension } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    direction: {
      setDirection: (direction: 'rtl' | 'ltr' | 'auto') => ReturnType
      toggleDirection: () => ReturnType
    }
  }
}

export const Direction = Extension.create({
  name: 'direction',

  addOptions() {
    return {
      types: ['paragraph', 'heading', 'blockquote', 'listItem', 'taskItem'],
      defaultDirection: 'auto',
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          dir: {
            default: this.options.defaultDirection,
            parseHTML: (element) => element.getAttribute('dir') || null,
            renderHTML: (attributes) => {
              if (!attributes.dir || attributes.dir === 'auto') {
                return {}
              }
              return { dir: attributes.dir }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setDirection:
        (direction) =>
        ({ commands }) => {
          return this.options.types.every((type: string) =>
            commands.updateAttributes(type, { dir: direction }),
          )
        },
      toggleDirection:
        () =>
        ({ editor, commands }) => {
          const currentDir = editor.getAttributes('paragraph')?.dir || 'rtl'
          const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl'
          return this.options.types.every((type: string) =>
            commands.updateAttributes(type, { dir: nextDir }),
          )
        },
    }
  },
})
