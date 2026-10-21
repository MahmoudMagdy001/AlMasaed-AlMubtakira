import { Node, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    faqItem: {
      insertFaqItem: (options?: { question?: string; answer?: string }) => ReturnType
    }
  }
}

export const FaqItem = Node.create({
  name: 'faqItem',
  group: 'block',
  content: 'paragraph+',
  defining: true,

  addAttributes() {
    return {
      question: {
        default: 'السؤال المتكرر هنا...',
        parseHTML: (element) => element.getAttribute('data-faq-question') || '',
        renderHTML: (attributes) => ({
          'data-faq-question': attributes.question,
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-faq-item]',
        getAttrs: (element) => {
          if (typeof element === 'string') return {}
          return {
            question: element.getAttribute('data-faq-question') || '',
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-faq-item': 'true',
        class: 'faq-item p-4 rounded-control border border-surface-border bg-surface-soft my-4 space-y-2',
      }),
      [
        'h4',
        {
          class: 'faq-question font-bold text-sm text-brand-900 border-b border-surface-border/60 pb-2',
          'data-faq-question': HTMLAttributes['data-faq-question'],
        },
        HTMLAttributes['data-faq-question'] || 'السؤال المتكرر',
      ],
      ['div', { class: 'faq-answer text-xs text-content-body pt-1' }, 0],
    ]
  },

  addCommands() {
    return {
      insertFaqItem:
        (options) =>
        ({ commands }) => {
          const q = options?.question || 'سؤال شائع عن المصاعد؟'
          const a = options?.answer || 'إجابة مفصلة تشرح التفاصيل والمواصفات الفنية...'
          return commands.insertContent({
            type: this.name,
            attrs: { question: q },
            content: [{ type: 'paragraph', content: [{ type: 'text', text: a }] }],
          })
        },
    }
  },
})
