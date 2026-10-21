import { Node, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    ctaBlock: {
      insertCtaBlock: (options?: {
        heading?: string
        text?: string
        buttonText?: string
        buttonLink?: string
      }) => ReturnType
    }
  }
}

export const CtaBlock = Node.create({
  name: 'ctaBlock',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      heading: {
        default: 'هل تبحث عن أفضل خدمات صيانة وتركيب المصاعد في جدة؟',
      },
      text: {
        default: 'فريقنا الهندسي جاهز لتقديم استشارة فنية مجانية وعرض سعر مخصص لمبناك.',
      },
      buttonText: {
        default: 'طلب عرض سعر سريع',
      },
      buttonLink: {
        default: '/contact',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-cta-block]',
        getAttrs: (element) => {
          if (typeof element === 'string') return {}
          return {
            heading: element.getAttribute('data-cta-heading') || '',
            text: element.getAttribute('data-cta-text') || '',
            buttonText: element.getAttribute('data-cta-button-text') || '',
            buttonLink: element.getAttribute('data-cta-button-link') || '',
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes({
        'data-cta-block': 'true',
        'data-cta-heading': HTMLAttributes.heading,
        'data-cta-text': HTMLAttributes.text,
        'data-cta-button-text': HTMLAttributes.buttonText,
        'data-cta-button-link': HTMLAttributes.buttonLink,
        class:
          'cta-article-block my-8 p-6 rounded-card bg-brand-900 text-white text-center space-y-3 shadow-md',
      }),
      [
        'h3',
        { class: 'text-base font-bold text-white' },
        HTMLAttributes.heading || 'طلب عرض سعر',
      ],
      [
        'p',
        { class: 'text-xs text-brand-100 max-w-xl mx-auto leading-relaxed' },
        HTMLAttributes.text || '',
      ],
      [
        'a',
        {
          href: HTMLAttributes.buttonLink || '/contact',
          class:
            'inline-flex items-center justify-center font-bold text-xs bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-control transition-colors shadow-xs mt-2',
        },
        HTMLAttributes.buttonText || 'تواصل معنا الآن',
      ],
    ]
  },

  addCommands() {
    return {
      insertCtaBlock:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options || {},
          })
        },
    }
  },
})
