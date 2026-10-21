import React, { useState, useEffect, useRef } from 'react'
import { useEditor, EditorContent, type Content } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Youtube from '@tiptap/extension-youtube'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Table as TableIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Unlink,
  Youtube as YoutubeIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Maximize2,
  Minimize2,
  Undo2,
  Redo2,
  RemoveFormatting,
  CodeXml,
  HelpCircle,
  Megaphone,
  FileText,
  Rows,
  Columns,
  Trash2,
} from 'lucide-react'

import { Direction } from './extensions/Direction'
import { Callout, type CalloutType } from './extensions/Callout'
import { FaqItem } from './extensions/FaqItem'
import { CtaBlock } from './extensions/CtaBlock'
import { MediaPicker } from '@/components/admin'
import { Button, Dialog } from '@/components/ui'
import type { MediaRow } from '@/features/media/types'
import { getStoragePublicUrl } from '@/lib/media'

const lowlight = createLowlight(common)

export interface TipTapEditorProps {
  contentHtml?: string
  contentJson?: unknown
  onChange?: (html: string, json: unknown) => void
  placeholder?: string
  lang?: 'ar' | 'en'
}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({
  contentHtml = '',
  contentJson,
  onChange,
  placeholder = 'ابدأ كتابة محتوى المقال هنا أو اكتب / للوصول السريع للأدوات...',
  lang = 'ar',
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false)
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [isYoutubeDialogOpen, setIsYoutubeDialogOpen] = useState(false)
  const [isSourceDialogOpen, setIsSourceDialogOpen] = useState(false)
  const [isCalloutPickerOpen, setIsCalloutPickerOpen] = useState(false)

  // Link Dialog Form State
  const [linkUrl, setLinkUrl] = useState('')
  const [linkOpenInNewTab, setLinkOpenInNewTab] = useState(true)
  const [linkNofollow, setLinkNofollow] = useState(false)
  const [linkSponsored, setLinkSponsored] = useState(false)

  // YouTube Dialog State
  const [youtubeUrl, setYoutubeUrl] = useState('')

  // Source HTML dialog state
  const [sourceHtml, setSourceHtml] = useState('')

  const isInitialMount = useRef(true)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] }, // H1 is reserved for post title
        codeBlock: false, // Replaced by CodeBlockLowlight
      }),
      Underline,
      Subscript,
      Superscript,
      Direction.configure({
        types: ['paragraph', 'heading', 'blockquote', 'listItem', 'taskItem'],
        defaultDirection: lang === 'en' ? 'ltr' : 'rtl',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: lang === 'en' ? 'left' : 'right',
      }),
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-brand-600 underline font-medium hover:text-brand-800 transition-colors',
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: 'rounded-control mx-auto my-4 max-w-full h-auto shadow-xs',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'min-w-full border-collapse my-4 text-xs border border-surface-border',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'bg-surface-soft font-bold text-start p-2.5 border border-surface-border text-content-heading',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'p-2.5 border border-surface-border text-content-body',
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: 'space-y-1.5 my-3 list-none ps-0',
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'flex items-start gap-2',
        },
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: 'aspect-video rounded-control mx-auto my-6 w-full max-w-2xl shadow-sm',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'rounded-control bg-brand-950 text-brand-100 p-4 font-mono text-xs my-4 overflow-x-auto',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount,
      Callout,
      FaqItem,
      CtaBlock,
    ],
    content: (contentJson as Content) || contentHtml,
    editorProps: {
      attributes: {
        class: `prose max-w-none focus:outline-none min-h-[360px] p-6 text-sm text-content-body leading-relaxed ${
          lang === 'en' ? 'text-left' : 'text-right'
        }`,
        dir: lang === 'en' ? 'ltr' : 'rtl',
      },
    },
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML()
      const json = ed.getJSON()
      onChange?.(html, json)
    },
  })

  // Synchronize incoming content if it changes externally
  useEffect(() => {
    if (!editor) return
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
  }, [editor])

  // Clean full screen keyboard handler (Escape exits full screen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  // --- Link insertion ---
  const handleOpenLinkDialog = () => {
    if (!editor) return
    const prevUrl = editor.getAttributes('link').href || ''
    setLinkUrl(prevUrl)
    setLinkOpenInNewTab(true)
    setLinkNofollow(false)
    setLinkSponsored(false)
    setIsLinkDialogOpen(true)
  }

  const handleApplyLink = () => {
    if (!editor) return
    if (!linkUrl.trim()) {
      editor.chain().focus().unsetLink().run()
      setIsLinkDialogOpen(false)
      return
    }

    const relParts: string[] = []
    if (linkOpenInNewTab) relParts.push('noopener', 'noreferrer')
    if (linkNofollow) relParts.push('nofollow')
    if (linkSponsored) relParts.push('sponsored')

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({
        href: linkUrl.trim(),
        target: linkOpenInNewTab ? '_blank' : undefined,
        rel: relParts.length > 0 ? relParts.join(' ') : undefined,
      })
      .run()

    setIsLinkDialogOpen(false)
  }

  // --- YouTube Insertion ---
  const handleInsertYoutube = () => {
    if (!editor || !youtubeUrl.trim()) return
    editor.commands.setYoutubeVideo({
      src: youtubeUrl.trim(),
    })
    setYoutubeUrl('')
    setIsYoutubeDialogOpen(false)
  }

  // --- Media Picker Image Selection ---
  const handleSelectMedia = (selected: MediaRow | MediaRow[]) => {
    const item = Array.isArray(selected) ? selected[0] : selected
    if (!item || !editor) return
    const url = getStoragePublicUrl(item.storage_path)

    editor
      .chain()
      .focus()
      .setImage({
        src: url,
        alt: item.alt_text || item.title || 'صورة المقال',
      })
      .run()

    setIsMediaPickerOpen(false)
  }

  // --- Source View ---
  const handleOpenSource = () => {
    if (!editor) return
    setSourceHtml(editor.getHTML())
    setIsSourceDialogOpen(true)
  }

  const handleApplySource = () => {
    if (!editor) return
    editor.commands.setContent(sourceHtml)
    setIsSourceDialogOpen(false)
  }

  if (!editor) {
    return (
      <div className="border border-surface-border rounded-card p-12 text-center text-xs text-content-muted">
        جاري تهيئة محرّر المقالات...
      </div>
    )
  }

  const wordsCount = editor.storage.characterCount?.words() || 0
  const charsCount = editor.storage.characterCount?.characters() || 0
  const readingTime = Math.max(1, Math.ceil(wordsCount / 200))

  return (
    <div
      className={`border border-surface-border rounded-card bg-white shadow-xs overflow-hidden flex flex-col transition-all duration-200 ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none h-screen w-screen border-none'
          : 'relative min-h-[500px]'
      }`}
    >
      {/* Sticky Main Toolbar */}
      <div className="sticky top-0 z-20 bg-surface-soft border-b border-surface-border p-2 flex flex-wrap items-center gap-1 text-content-body select-none">
        {/* Formatting Group */}
        <div className="flex items-center gap-0.5 border-e border-surface-border pe-1.5 me-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('bold')
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="عريض (Ctrl+B)"
            aria-label="عريض"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('italic')
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="مائل (Ctrl+I)"
            aria-label="مائل"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('underline')
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="تسطير (Ctrl+U)"
            aria-label="تسطير"
          >
            <UnderlineIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('strike')
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="يتوسطه خط"
            aria-label="يتوسطه خط"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('highlight')
                ? 'bg-amber-300 text-amber-900'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="تمييز بلون أصفر"
            aria-label="تمييز"
          >
            <span className="font-bold text-[11px] underline decoration-amber-500 decoration-2">
              A
            </span>
          </button>
        </div>

        {/* Headings Group (H2, H3, H4) */}
        <div className="flex items-center gap-0.5 border-e border-surface-border pe-1.5 me-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="عنوان رئيسي (H2)"
            aria-label="عنوان رئيسي 2"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="عنوان فرعي (H3)"
            aria-label="عنوان فرعي 3"
          >
            <Heading3 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('heading', { level: 4 })
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="عنوان فرعي صغير (H4)"
            aria-label="عنوان فرعي 4"
          >
            <Heading4 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Direction & Alignment Group */}
        <div className="flex items-center gap-0.5 border-e border-surface-border pe-1.5 me-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().setDirection('rtl').run()}
            className="p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading text-[10px] font-bold"
            title="اتجاه النص من اليمين لليسار (RTL)"
          >
            RTL
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setDirection('ltr').run()}
            className="p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading text-[10px] font-bold"
            title="اتجاه النص من اليسار لليمين (LTR)"
          >
            LTR
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive({ textAlign: 'right' })
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="محاذاة لليمين"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive({ textAlign: 'center' })
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="توسيط"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive({ textAlign: 'left' })
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="محاذاة لليسار"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive({ textAlign: 'justify' })
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="ضبط النص"
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lists & Quotes Group */}
        <div className="flex items-center gap-0.5 border-e border-surface-border pe-1.5 me-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('bulletList')
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="قائمة نقطية"
          >
            <List className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('orderedList')
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="قائمة رقمية"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('taskList')
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="قائمة مهام"
          >
            <CheckSquare className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('blockquote')
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="اقتباس"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Table & Embeds Group */}
        <div className="flex items-center gap-0.5 border-e border-surface-border pe-1.5 me-1">
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
            className="p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading"
            title="إدراج جدول"
          >
            <TableIcon className="w-3.5 h-3.5" />
          </button>

          {editor.isActive('table') && (
            <>
              <button
                type="button"
                onClick={() => editor.chain().focus().addRowAfter().run()}
                className="p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading"
                title="إضافة صف"
              >
                <Rows className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                className="p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading"
                title="إضافة عمود"
              >
                <Columns className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().deleteTable().run()}
                className="p-1.5 rounded-control text-feedback-error hover:bg-feedback-error/10"
                title="حذف الجدول"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleOpenLinkDialog}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('link')
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="إدراج رابط"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>

          {editor.isActive('link') && (
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              className="p-1.5 rounded-control hover:bg-surface-border/60 text-feedback-error"
              title="إزالة الرابط"
            >
              <Unlink className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMediaPickerOpen(true)}
            className="p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading"
            title="إدراج صورة من مكتبة الوسائط"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsYoutubeDialogOpen(true)}
            className="p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading"
            title="إدراج فيديو يوتيوب"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 rounded-control transition-colors ${
              editor.isActive('codeBlock')
                ? 'bg-brand-600 text-white'
                : 'hover:bg-surface-border/60 text-content-heading'
            }`}
            title="كتلة كود برمجية"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Custom Elevator Blocks Group (Callout, FAQ, CTA) */}
        <div className="flex items-center gap-0.5 border-e border-surface-border pe-1.5 me-1">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCalloutPickerOpen((p) => !p)}
              className="px-2 py-1 rounded-control bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition-colors flex items-center gap-1"
              title="صندوق تنبيه أو نصيحة فنية"
            >
              <FileText className="w-3 h-3" />
              <span>تنبيه</span>
            </button>

            {isCalloutPickerOpen && (
              <div className="absolute start-0 top-full mt-1 w-32 bg-white rounded-control shadow-elevated border border-surface-border p-1 z-30 space-y-0.5">
                {(['info', 'tip', 'warning', 'safety'] as CalloutType[]).map((cType) => (
                  <button
                    key={cType}
                    type="button"
                    onClick={() => {
                      editor.commands.toggleCallout({ type: cType })
                      setIsCalloutPickerOpen(false)
                    }}
                    className="w-full text-start px-2 py-1 text-[11px] font-bold rounded-control hover:bg-surface-soft block capitalize"
                  >
                    {cType === 'info' && 'معلومة (Info)'}
                    {cType === 'tip' && 'نصيحة (Tip)'}
                    {cType === 'warning' && 'تحذير (Warning)'}
                    {cType === 'safety' && 'أمان وسلامة'}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => editor.commands.insertFaqItem()}
            className="px-2 py-1 rounded-control bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition-colors flex items-center gap-1"
            title="إدراج سؤال متكرر وإجابته (مرتبط بالمخطط الهيكلي FAQ Schema)"
          >
            <HelpCircle className="w-3 h-3" />
            <span>سؤال شائع</span>
          </button>

          <button
            type="button"
            onClick={() => editor.commands.insertCtaBlock()}
            className="px-2 py-1 rounded-control bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition-colors flex items-center gap-1"
            title="إدراج بنر اتخاذ إجراء (CTA)"
          >
            <Megaphone className="w-3 h-3" />
            <span>بنر CTA</span>
          </button>
        </div>

        {/* History & Mode Group */}
        <div className="flex items-center gap-0.5 ms-auto">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded-control text-content-muted hover:text-content-heading disabled:opacity-20"
            title="تراجع (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded-control text-content-muted hover:text-content-heading disabled:opacity-20"
            title="إعادة (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className="p-1.5 rounded-control text-content-muted hover:text-feedback-error"
            title="مسح التنسيقات"
          >
            <RemoveFormatting className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleOpenSource}
            className="p-1.5 rounded-control text-content-muted hover:text-brand-600"
            title="عرض كود HTML"
          >
            <CodeXml className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="p-1.5 rounded-control text-content-muted hover:text-brand-600"
            title={isFullscreen ? 'تصغير الشاشة' : 'ملء الشاشة'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Bubble Menu on Selection */}
      <BubbleMenu
        editor={editor}
        className="bg-brand-950 text-white rounded-control shadow-elevated p-1 flex items-center gap-0.5 text-xs z-30"
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-control ${
            editor.isActive('bold') ? 'bg-brand-700 text-white' : 'hover:bg-brand-800'
          }`}
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-control ${
            editor.isActive('italic') ? 'bg-brand-700 text-white' : 'hover:bg-brand-800'
          }`}
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded-control ${
            editor.isActive('underline') ? 'bg-brand-700 text-white' : 'hover:bg-brand-800'
          }`}
        >
          <UnderlineIcon className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={handleOpenLinkDialog}
          className={`p-1.5 rounded-control ${
            editor.isActive('link') ? 'bg-brand-700 text-white' : 'hover:bg-brand-800'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </button>
      </BubbleMenu>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* Footer Word/Char Count & Reading Time Bar */}
      <div className="bg-surface-soft border-t border-surface-border px-4 py-2 flex items-center justify-between text-[11px] text-content-muted">
        <div className="flex items-center gap-4">
          <span>
            عدد الكلمات: <strong>{wordsCount}</strong>
          </span>
          <span>
            عدد الحروف: <strong>{charsCount}</strong>
          </span>
          <span>
            زمن القراءة المتوقع: <strong>{readingTime} دقيقة</strong>
          </span>
        </div>

        <div className="text-[10px] text-content-muted">
          محرر مقالات احترافي يدعم المحتوى الثنائي واللغة العربية بالكامل
        </div>
      </div>

      {/* Media Picker Dialog */}
      <MediaPicker
        open={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleSelectMedia}
        mode="single"
        accept="image"
        initialFolder="blog"
        title="إدراج صورة داخل المقال من مكتبة الوسائط"
      />

      {/* Link Settings Dialog */}
      <Dialog
        isOpen={isLinkDialogOpen}
        onClose={() => setIsLinkDialogOpen(false)}
        title="إعدادات الرابط التشعبي"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-content-heading">
              رابط الوجهة (URL)
            </label>
            <input
              type="url"
              dir="ltr"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com أو /services/..."
              className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            />
          </div>

          {/* Quick Internal Links */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-content-muted block">
              روابط داخلية سريعة لخدمات الشركة:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'صيانة المصاعد', path: '/services/elevator-maintenance' },
                { label: 'تحديث المصاعد', path: '/services/elevator-modernization' },
                { label: 'تركيب وتوريد', path: '/services/elevator-installation' },
                { label: 'طلب عرض سعر', path: '/contact' },
              ].map((link) => (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => setLinkUrl(link.path)}
                  className="px-2 py-1 rounded-control bg-surface-soft hover:bg-brand-50 hover:text-brand-600 text-[10px] font-medium transition-colors border border-surface-border"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rel attributes */}
          <div className="space-y-2 pt-2 border-t border-surface-border text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={linkOpenInNewTab}
                onChange={(e) => setLinkOpenInNewTab(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded-control border-surface-border"
              />
              <span>فتح في تبويب جديد (target=&quot;_blank&quot;)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={linkNofollow}
                onChange={(e) => setLinkNofollow(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded-control border-surface-border"
              />
              <span>إضافة rel=&quot;nofollow&quot; (لمحركات البحث)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={linkSponsored}
                onChange={(e) => setLinkSponsored(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded-control border-surface-border"
              />
              <span>إضافة rel=&quot;sponsored&quot; (إعلاني / ممول)</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-surface-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsLinkDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={handleApplyLink}>
              تطبيق الرابط
            </Button>
          </div>
        </div>
      </Dialog>

      {/* YouTube Dialog */}
      <Dialog
        isOpen={isYoutubeDialogOpen}
        onClose={() => setIsYoutubeDialogOpen(false)}
        title="إدراج فيديو من YouTube"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-content-heading">
              رابط الفيديو (YouTube Video URL)
            </label>
            <input
              type="url"
              dir="ltr"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-surface-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsYoutubeDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleInsertYoutube}
              disabled={!youtubeUrl.trim()}
            >
              إدراج الفيديو
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Source View Dialog */}
      <Dialog
        isOpen={isSourceDialogOpen}
        onClose={() => setIsSourceDialogOpen(false)}
        title="عرض وتعديل كود HTML المصدر"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <textarea
            rows={14}
            dir="ltr"
            value={sourceHtml}
            onChange={(e) => setSourceHtml(e.target.value)}
            className="w-full text-xs p-3 rounded-control border border-surface-border bg-brand-950 text-brand-100 font-mono leading-relaxed focus:outline-none"
          />

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-surface-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsSourceDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={handleApplySource}>
              تطبيق التعديلات
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
