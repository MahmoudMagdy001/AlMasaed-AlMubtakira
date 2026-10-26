var _a, _b, _c, _d, _e;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import { Bold, Italic, Underline as Underline$1, Strikethrough, Heading2, Heading3, Heading4, AlignRight, AlignCenter, AlignLeft, AlignJustify, List, ListOrdered, CheckSquare, Quote, Table as Table$1, Rows, Columns, Trash2, Link as Link$1, Unlink, Image as Image$1, Youtube as Youtube$1, Code, FileText, HelpCircle, Megaphone, Undo2, Redo2, RemoveFormatting, CodeXml, Minimize2, Maximize2 } from "lucide-react";
import { Extension, Node, mergeAttributes } from "@tiptap/core";
import { f as MediaPicker } from "./index-6EXxYG9x.js";
import { D as Dialog, B as Button, g as getStoragePublicUrl } from "../main.mjs";
import "react-router-dom";
import "@tanstack/react-query";
import "vite-react-ssg";
import "react-i18next";
import "@supabase/supabase-js";
import "gsap";
import "gsap/ScrollTrigger";
import "@gsap/react";
import "react-hook-form";
import "zod";
import "i18next";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/blog/editor/extensions/Direction.ts");
const Direction = Extension.create({
  name: "direction",
  addOptions() {
    return {
      types: ["paragraph", "heading", "blockquote", "listItem", "taskItem"],
      defaultDirection: "auto"
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          dir: {
            default: this.options.defaultDirection,
            parseHTML: (element) => element.getAttribute("dir") || null,
            renderHTML: (attributes) => {
              if (!attributes.dir || attributes.dir === "auto") {
                return {};
              }
              return { dir: attributes.dir };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setDirection: (direction) => ({ commands }) => {
        return this.options.types.every(
          (type) => commands.updateAttributes(type, { dir: direction })
        );
      },
      toggleDirection: () => ({ editor, commands }) => {
        var _a2;
        const currentDir = ((_a2 = editor.getAttributes("paragraph")) == null ? void 0 : _a2.dir) || "rtl";
        const nextDir = currentDir === "rtl" ? "ltr" : "rtl";
        return this.options.types.every(
          (type) => commands.updateAttributes(type, { dir: nextDir })
        );
      }
    };
  }
});
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/features/blog/editor/extensions/Callout.ts");
const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,
  addAttributes() {
    return {
      type: {
        default: "info",
        parseHTML: (element) => element.getAttribute("data-callout-type") || "info",
        renderHTML: (attributes) => ({
          "data-callout-type": attributes.type,
          class: `callout-box callout-${attributes.type} p-4 rounded-control border-s-4 my-4`
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-callout-type]"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setCallout: (attributes) => ({ commands }) => {
        return commands.wrapIn(this.name, attributes);
      },
      toggleCallout: (attributes) => ({ commands }) => {
        return commands.toggleWrap(this.name, attributes);
      }
    };
  }
});
(_c = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _c.call(globalThis, "src/features/blog/editor/extensions/FaqItem.ts");
const FaqItem = Node.create({
  name: "faqItem",
  group: "block",
  content: "paragraph+",
  defining: true,
  addAttributes() {
    return {
      question: {
        default: "السؤال المتكرر هنا...",
        parseHTML: (element) => element.getAttribute("data-faq-question") || "",
        renderHTML: (attributes) => ({
          "data-faq-question": attributes.question
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-faq-item]",
        getAttrs: (element) => {
          if (typeof element === "string") return {};
          return {
            question: element.getAttribute("data-faq-question") || ""
          };
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-faq-item": "true",
        class: "faq-item p-4 rounded-control border border-surface-border bg-surface-soft my-4 space-y-2"
      }),
      [
        "h4",
        {
          class: "faq-question font-bold text-sm text-brand-900 border-b border-surface-border/60 pb-2",
          "data-faq-question": HTMLAttributes["data-faq-question"]
        },
        HTMLAttributes["data-faq-question"] || "السؤال المتكرر"
      ],
      ["div", { class: "faq-answer text-xs text-content-body pt-1" }, 0]
    ];
  },
  addCommands() {
    return {
      insertFaqItem: (options) => ({ commands }) => {
        const q = (options == null ? void 0 : options.question) || "سؤال شائع عن المصاعد؟";
        const a = (options == null ? void 0 : options.answer) || "إجابة مفصلة تشرح التفاصيل والمواصفات الفنية...";
        return commands.insertContent({
          type: this.name,
          attrs: { question: q },
          content: [{ type: "paragraph", content: [{ type: "text", text: a }] }]
        });
      }
    };
  }
});
(_d = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _d.call(globalThis, "src/features/blog/editor/extensions/CtaBlock.ts");
const CtaBlock = Node.create({
  name: "ctaBlock",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      heading: {
        default: "هل تبحث عن أفضل خدمات صيانة وتركيب المصاعد في جدة؟"
      },
      text: {
        default: "فريقنا الهندسي جاهز لتقديم استشارة فنية مجانية وعرض سعر مخصص لمبناك."
      },
      buttonText: {
        default: "طلب عرض سعر سريع"
      },
      buttonLink: {
        default: "/contact"
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-cta-block]",
        getAttrs: (element) => {
          if (typeof element === "string") return {};
          return {
            heading: element.getAttribute("data-cta-heading") || "",
            text: element.getAttribute("data-cta-text") || "",
            buttonText: element.getAttribute("data-cta-button-text") || "",
            buttonLink: element.getAttribute("data-cta-button-link") || ""
          };
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes({
        "data-cta-block": "true",
        "data-cta-heading": HTMLAttributes.heading,
        "data-cta-text": HTMLAttributes.text,
        "data-cta-button-text": HTMLAttributes.buttonText,
        "data-cta-button-link": HTMLAttributes.buttonLink,
        class: "cta-article-block my-8 p-6 rounded-card bg-brand-900 text-white text-center space-y-3 shadow-md"
      }),
      [
        "h3",
        { class: "text-base font-bold text-white" },
        HTMLAttributes.heading || "طلب عرض سعر"
      ],
      [
        "p",
        { class: "text-xs text-brand-100 max-w-xl mx-auto leading-relaxed" },
        HTMLAttributes.text || ""
      ],
      [
        "a",
        {
          href: HTMLAttributes.buttonLink || "/contact",
          class: "inline-flex items-center justify-center font-bold text-xs bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-control transition-colors shadow-xs mt-2"
        },
        HTMLAttributes.buttonText || "تواصل معنا الآن"
      ]
    ];
  },
  addCommands() {
    return {
      insertCtaBlock: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options || {}
        });
      }
    };
  }
});
(_e = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _e.call(globalThis, "src/features/blog/editor/TipTapEditor.tsx");
const lowlight = createLowlight(common);
const TipTapEditor = ({
  contentHtml = "",
  contentJson,
  onChange,
  placeholder = "ابدأ كتابة محتوى المقال هنا أو اكتب / للوصول السريع للأدوات...",
  lang = "ar"
}) => {
  var _a2, _b2;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isYoutubeDialogOpen, setIsYoutubeDialogOpen] = useState(false);
  const [isSourceDialogOpen, setIsSourceDialogOpen] = useState(false);
  const [isCalloutPickerOpen, setIsCalloutPickerOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkOpenInNewTab, setLinkOpenInNewTab] = useState(true);
  const [linkNofollow, setLinkNofollow] = useState(false);
  const [linkSponsored, setLinkSponsored] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [sourceHtml, setSourceHtml] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        // H1 is reserved for post title
        codeBlock: false
        // Replaced by CodeBlockLowlight
      }),
      Underline,
      Subscript,
      Superscript,
      Direction.configure({
        types: ["paragraph", "heading", "blockquote", "listItem", "taskItem"],
        defaultDirection: lang === "en" ? "ltr" : "rtl"
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: lang === "en" ? "left" : "right"
      }),
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-brand-600 underline font-medium hover:text-brand-800 transition-colors"
        }
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: "rounded-control mx-auto my-4 max-w-full h-auto shadow-xs"
        }
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "min-w-full border-collapse my-4 text-xs border border-surface-border"
        }
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "bg-surface-soft font-bold text-start p-2.5 border border-surface-border text-content-heading"
        }
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "p-2.5 border border-surface-border text-content-body"
        }
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "space-y-1.5 my-3 list-none ps-0"
        }
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex items-start gap-2"
        }
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: "aspect-video rounded-control mx-auto my-6 w-full max-w-2xl shadow-sm"
        }
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "rounded-control bg-brand-950 text-brand-100 p-4 font-mono text-xs my-4 overflow-x-auto"
        }
      }),
      Placeholder.configure({
        placeholder
      }),
      CharacterCount,
      Callout,
      FaqItem,
      CtaBlock
    ],
    content: contentJson || contentHtml,
    editorProps: {
      attributes: {
        class: `prose-article tiptap focus:outline-none min-h-[480px] p-6 text-content-body leading-relaxed ${lang === "en" ? "text-left" : "text-right"}`,
        dir: lang === "en" ? "ltr" : "rtl"
      }
    },
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      const json = ed.getJSON();
      onChange == null ? void 0 : onChange(html, json);
    }
  });
  useEffect(() => {
    if (!editor) return;
    const currentHtml = editor.getHTML();
    if (contentHtml && contentHtml !== currentHtml && !editor.isFocused) {
      editor.commands.setContent(contentJson || contentHtml, {
        emitUpdate: false
      });
    }
  }, [contentHtml, contentJson, editor]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);
  const handleOpenLinkDialog = () => {
    if (!editor) return;
    const prevUrl = editor.getAttributes("link").href || "";
    setLinkUrl(prevUrl);
    setLinkOpenInNewTab(true);
    setLinkNofollow(false);
    setLinkSponsored(false);
    setIsLinkDialogOpen(true);
  };
  const handleApplyLink = () => {
    if (!editor) return;
    if (!linkUrl.trim()) {
      editor.chain().focus().unsetLink().run();
      setIsLinkDialogOpen(false);
      return;
    }
    const relParts = [];
    if (linkOpenInNewTab) relParts.push("noopener", "noreferrer");
    if (linkNofollow) relParts.push("nofollow");
    if (linkSponsored) relParts.push("sponsored");
    editor.chain().focus().extendMarkRange("link").setLink({
      href: linkUrl.trim(),
      target: linkOpenInNewTab ? "_blank" : void 0,
      rel: relParts.length > 0 ? relParts.join(" ") : void 0
    }).run();
    setIsLinkDialogOpen(false);
  };
  const handleInsertYoutube = () => {
    if (!editor || !youtubeUrl.trim()) return;
    editor.commands.setYoutubeVideo({
      src: youtubeUrl.trim()
    });
    setYoutubeUrl("");
    setIsYoutubeDialogOpen(false);
  };
  const handleSelectMedia = (selected) => {
    const item = Array.isArray(selected) ? selected[0] : selected;
    if (!item || !editor) return;
    const url = getStoragePublicUrl(item.storage_path);
    editor.chain().focus().setImage({
      src: url,
      alt: item.alt_text || item.title || "صورة المقال"
    }).run();
    setIsMediaPickerOpen(false);
  };
  const handleOpenSource = () => {
    if (!editor) return;
    setSourceHtml(editor.getHTML());
    setIsSourceDialogOpen(true);
  };
  const handleApplySource = () => {
    if (!editor) return;
    editor.commands.setContent(sourceHtml);
    setIsSourceDialogOpen(false);
  };
  if (!editor) {
    return /* @__PURE__ */ jsx("div", { className: "border border-surface-border rounded-card p-12 text-center text-xs text-content-muted", children: "جاري تهيئة محرّر المقالات..." });
  }
  const wordsCount = ((_a2 = editor.storage.characterCount) == null ? void 0 : _a2.words()) || 0;
  const charsCount = ((_b2 = editor.storage.characterCount) == null ? void 0 : _b2.characters()) || 0;
  const readingTime = Math.max(1, Math.ceil(wordsCount / 200));
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `border border-surface-border rounded-card bg-white shadow-xs overflow-hidden flex flex-col transition-all duration-200 ${isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen w-screen border-none" : "relative min-h-[500px]"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-20 bg-surface-soft border-b border-surface-border p-2 flex flex-wrap items-center gap-1 text-content-body select-none", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5 border-e border-surface-border pe-1.5 me-1", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().toggleBold().run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("bold") ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "عريض (Ctrl+B)",
                "aria-label": "عريض",
                children: /* @__PURE__ */ jsx(Bold, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().toggleItalic().run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("italic") ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "مائل (Ctrl+I)",
                "aria-label": "مائل",
                children: /* @__PURE__ */ jsx(Italic, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().toggleUnderline().run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("underline") ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "تسطير (Ctrl+U)",
                "aria-label": "تسطير",
                children: /* @__PURE__ */ jsx(Underline$1, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().toggleStrike().run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("strike") ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "يتوسطه خط",
                "aria-label": "يتوسطه خط",
                children: /* @__PURE__ */ jsx(Strikethrough, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("highlight") ? "bg-amber-300 text-amber-900" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "تمييز بلون أصفر",
                "aria-label": "تمييز",
                children: /* @__PURE__ */ jsx("span", { className: "font-bold text-[11px] underline decoration-amber-500 decoration-2", children: "A" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5 border-e border-surface-border pe-1.5 me-1", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "عنوان رئيسي (H2)",
                "aria-label": "عنوان رئيسي 2",
                children: /* @__PURE__ */ jsx(Heading2, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("heading", { level: 3 }) ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "عنوان فرعي (H3)",
                "aria-label": "عنوان فرعي 3",
                children: /* @__PURE__ */ jsx(Heading3, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("heading", { level: 4 }) ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "عنوان فرعي صغير (H4)",
                "aria-label": "عنوان فرعي 4",
                children: /* @__PURE__ */ jsx(Heading4, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5 border-e border-surface-border pe-1.5 me-1", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().setDirection("rtl").run(),
                className: "p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading text-[10px] font-bold",
                title: "اتجاه النص من اليمين لليسار (RTL)",
                children: "RTL"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().setDirection("ltr").run(),
                className: "p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading text-[10px] font-bold",
                title: "اتجاه النص من اليسار لليمين (LTR)",
                children: "LTR"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().setTextAlign("right").run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive({ textAlign: "right" }) ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "محاذاة لليمين",
                children: /* @__PURE__ */ jsx(AlignRight, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().setTextAlign("center").run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive({ textAlign: "center" }) ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "توسيط",
                children: /* @__PURE__ */ jsx(AlignCenter, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().setTextAlign("left").run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive({ textAlign: "left" }) ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "محاذاة لليسار",
                children: /* @__PURE__ */ jsx(AlignLeft, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().setTextAlign("justify").run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive({ textAlign: "justify" }) ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "ضبط النص",
                children: /* @__PURE__ */ jsx(AlignJustify, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5 border-e border-surface-border pe-1.5 me-1", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().toggleBulletList().run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("bulletList") ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "قائمة نقطية",
                children: /* @__PURE__ */ jsx(List, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().toggleOrderedList().run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("orderedList") ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "قائمة رقمية",
                children: /* @__PURE__ */ jsx(ListOrdered, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().toggleTaskList().run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("taskList") ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "قائمة مهام",
                children: /* @__PURE__ */ jsx(CheckSquare, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().toggleBlockquote().run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("blockquote") ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "اقتباس",
                children: /* @__PURE__ */ jsx(Quote, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5 border-e border-surface-border pe-1.5 me-1", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
                className: "p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading",
                title: "إدراج جدول",
                children: /* @__PURE__ */ jsx(Table$1, { className: "w-3.5 h-3.5" })
              }
            ),
            editor.isActive("table") && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => editor.chain().focus().addRowAfter().run(),
                  className: "p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading",
                  title: "إضافة صف",
                  children: /* @__PURE__ */ jsx(Rows, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => editor.chain().focus().addColumnAfter().run(),
                  className: "p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading",
                  title: "إضافة عمود",
                  children: /* @__PURE__ */ jsx(Columns, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => editor.chain().focus().deleteTable().run(),
                  className: "p-1.5 rounded-control text-feedback-error hover:bg-feedback-error/10",
                  title: "حذف الجدول",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: handleOpenLinkDialog,
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("link") ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "إدراج رابط",
                children: /* @__PURE__ */ jsx(Link$1, { className: "w-3.5 h-3.5" })
              }
            ),
            editor.isActive("link") && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().unsetLink().run(),
                className: "p-1.5 rounded-control hover:bg-surface-border/60 text-feedback-error",
                title: "إزالة الرابط",
                children: /* @__PURE__ */ jsx(Unlink, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setIsMediaPickerOpen(true),
                className: "p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading",
                title: "إدراج صورة من مكتبة الوسائط",
                children: /* @__PURE__ */ jsx(Image$1, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setIsYoutubeDialogOpen(true),
                className: "p-1.5 rounded-control hover:bg-surface-border/60 text-content-heading",
                title: "إدراج فيديو يوتيوب",
                children: /* @__PURE__ */ jsx(Youtube$1, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().toggleCodeBlock().run(),
                className: `p-1.5 rounded-control transition-colors ${editor.isActive("codeBlock") ? "bg-brand-600 text-white" : "hover:bg-surface-border/60 text-content-heading"}`,
                title: "كتلة كود برمجية",
                children: /* @__PURE__ */ jsx(Code, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5 border-e border-surface-border pe-1.5 me-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setIsCalloutPickerOpen((p) => !p),
                  className: "px-2 py-1 rounded-control bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition-colors flex items-center gap-1",
                  title: "صندوق تنبيه أو نصيحة فنية",
                  children: [
                    /* @__PURE__ */ jsx(FileText, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsx("span", { children: "تنبيه" })
                  ]
                }
              ),
              isCalloutPickerOpen && /* @__PURE__ */ jsx("div", { className: "absolute start-0 top-full mt-1 w-32 bg-white rounded-control shadow-elevated border border-surface-border p-1 z-30 space-y-0.5", children: ["info", "tip", "warning", "safety"].map((cType) => /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    editor.commands.toggleCallout({ type: cType });
                    setIsCalloutPickerOpen(false);
                  },
                  className: "w-full text-start px-2 py-1 text-[11px] font-bold rounded-control hover:bg-surface-soft block capitalize",
                  children: [
                    cType === "info" && "معلومة (Info)",
                    cType === "tip" && "نصيحة (Tip)",
                    cType === "warning" && "تحذير (Warning)",
                    cType === "safety" && "أمان وسلامة"
                  ]
                },
                cType
              )) })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => editor.commands.insertFaqItem(),
                className: "px-2 py-1 rounded-control bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition-colors flex items-center gap-1",
                title: "إدراج سؤال متكرر وإجابته (مرتبط بالمخطط الهيكلي FAQ Schema)",
                children: [
                  /* @__PURE__ */ jsx(HelpCircle, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsx("span", { children: "سؤال شائع" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => editor.commands.insertCtaBlock(),
                className: "px-2 py-1 rounded-control bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition-colors flex items-center gap-1",
                title: "إدراج بنر اتخاذ إجراء (CTA)",
                children: [
                  /* @__PURE__ */ jsx(Megaphone, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsx("span", { children: "بنر CTA" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5 ms-auto", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().undo().run(),
                disabled: !editor.can().undo(),
                className: "p-1.5 rounded-control text-content-muted hover:text-content-heading disabled:opacity-20",
                title: "تراجع (Ctrl+Z)",
                children: /* @__PURE__ */ jsx(Undo2, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().redo().run(),
                disabled: !editor.can().redo(),
                className: "p-1.5 rounded-control text-content-muted hover:text-content-heading disabled:opacity-20",
                title: "إعادة (Ctrl+Y)",
                children: /* @__PURE__ */ jsx(Redo2, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => editor.chain().focus().unsetAllMarks().clearNodes().run(),
                className: "p-1.5 rounded-control text-content-muted hover:text-feedback-error",
                title: "مسح التنسيقات",
                children: /* @__PURE__ */ jsx(RemoveFormatting, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: handleOpenSource,
                className: "p-1.5 rounded-control text-content-muted hover:text-brand-600",
                title: "عرض كود HTML",
                children: /* @__PURE__ */ jsx(CodeXml, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setIsFullscreen((prev) => !prev),
                className: "p-1.5 rounded-control text-content-muted hover:text-brand-600",
                title: isFullscreen ? "تصغير الشاشة" : "ملء الشاشة",
                children: isFullscreen ? /* @__PURE__ */ jsx(Minimize2, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(Maximize2, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          BubbleMenu,
          {
            editor,
            className: "bg-brand-950 text-white rounded-control shadow-elevated p-1 flex items-center gap-0.5 text-xs z-30",
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => editor.chain().focus().toggleBold().run(),
                  className: `p-1.5 rounded-control ${editor.isActive("bold") ? "bg-brand-700 text-white" : "hover:bg-brand-800"}`,
                  children: /* @__PURE__ */ jsx(Bold, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => editor.chain().focus().toggleItalic().run(),
                  className: `p-1.5 rounded-control ${editor.isActive("italic") ? "bg-brand-700 text-white" : "hover:bg-brand-800"}`,
                  children: /* @__PURE__ */ jsx(Italic, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => editor.chain().focus().toggleUnderline().run(),
                  className: `p-1.5 rounded-control ${editor.isActive("underline") ? "bg-brand-700 text-white" : "hover:bg-brand-800"}`,
                  children: /* @__PURE__ */ jsx(Underline$1, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleOpenLinkDialog,
                  className: `p-1.5 rounded-control ${editor.isActive("link") ? "bg-brand-700 text-white" : "hover:bg-brand-800"}`,
                  children: /* @__PURE__ */ jsx(Link$1, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto bg-white prose-article", children: /* @__PURE__ */ jsx(EditorContent, { editor }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-surface-soft border-t border-surface-border px-4 py-2 flex items-center justify-between text-[11px] text-content-muted", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "عدد الكلمات: ",
              /* @__PURE__ */ jsx("strong", { children: wordsCount })
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "عدد الحروف: ",
              /* @__PURE__ */ jsx("strong", { children: charsCount })
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "زمن القراءة المتوقع: ",
              /* @__PURE__ */ jsxs("strong", { children: [
                readingTime,
                " دقيقة"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-content-muted", children: "محرر مقالات احترافي يدعم المحتوى الثنائي واللغة العربية بالكامل" })
        ] }),
        /* @__PURE__ */ jsx(
          MediaPicker,
          {
            open: isMediaPickerOpen,
            onClose: () => setIsMediaPickerOpen(false),
            onSelect: handleSelectMedia,
            mode: "single",
            accept: "image",
            initialFolder: "blog",
            title: "إدراج صورة داخل المقال من مكتبة الوسائط"
          }
        ),
        /* @__PURE__ */ jsx(
          Dialog,
          {
            isOpen: isLinkDialogOpen,
            onClose: () => setIsLinkDialogOpen(false),
            title: "إعدادات الرابط التشعبي",
            maxWidth: "sm",
            children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-content-heading", children: "رابط الوجهة (URL)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "url",
                    dir: "ltr",
                    value: linkUrl,
                    onChange: (e) => setLinkUrl(e.target.value),
                    placeholder: "https://example.com أو /services/...",
                    className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-content-muted block", children: "روابط داخلية سريعة لخدمات الشركة:" }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: [
                  { label: "صيانة المصاعد", path: "/services/elevator-maintenance" },
                  { label: "تحديث المصاعد", path: "/services/elevator-modernization" },
                  { label: "تركيب وتوريد", path: "/services/elevator-installation" },
                  { label: "طلب عرض سعر", path: "/contact" }
                ].map((link) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setLinkUrl(link.path),
                    className: "px-2 py-1 rounded-control bg-surface-soft hover:bg-brand-50 hover:text-brand-600 text-[10px] font-medium transition-colors border border-surface-border",
                    children: link.label
                  },
                  link.path
                )) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-2 border-t border-surface-border text-xs", children: [
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: linkOpenInNewTab,
                      onChange: (e) => setLinkOpenInNewTab(e.target.checked),
                      className: "w-4 h-4 text-brand-600 rounded-control border-surface-border"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { children: 'فتح في تبويب جديد (target="_blank")' })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: linkNofollow,
                      onChange: (e) => setLinkNofollow(e.target.checked),
                      className: "w-4 h-4 text-brand-600 rounded-control border-surface-border"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { children: 'إضافة rel="nofollow" (لمحركات البحث)' })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: linkSponsored,
                      onChange: (e) => setLinkSponsored(e.target.checked),
                      className: "w-4 h-4 text-brand-600 rounded-control border-surface-border"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { children: 'إضافة rel="sponsored" (إعلاني / ممول)' })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 pt-4 border-t border-surface-border", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => setIsLinkDialogOpen(false),
                    children: "إلغاء"
                  }
                ),
                /* @__PURE__ */ jsx(Button, { type: "button", variant: "primary", size: "sm", onClick: handleApplyLink, children: "تطبيق الرابط" })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Dialog,
          {
            isOpen: isYoutubeDialogOpen,
            onClose: () => setIsYoutubeDialogOpen(false),
            title: "إدراج فيديو من YouTube",
            maxWidth: "sm",
            children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-content-heading", children: "رابط الفيديو (YouTube Video URL)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "url",
                    dir: "ltr",
                    value: youtubeUrl,
                    onChange: (e) => setYoutubeUrl(e.target.value),
                    placeholder: "https://www.youtube.com/watch?v=...",
                    className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 pt-4 border-t border-surface-border", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => setIsYoutubeDialogOpen(false),
                    children: "إلغاء"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    variant: "primary",
                    size: "sm",
                    onClick: handleInsertYoutube,
                    disabled: !youtubeUrl.trim(),
                    children: "إدراج الفيديو"
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Dialog,
          {
            isOpen: isSourceDialogOpen,
            onClose: () => setIsSourceDialogOpen(false),
            title: "عرض وتعديل كود HTML المصدر",
            maxWidth: "lg",
            children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 14,
                  dir: "ltr",
                  value: sourceHtml,
                  onChange: (e) => setSourceHtml(e.target.value),
                  className: "w-full text-xs p-3 rounded-control border border-surface-border bg-brand-950 text-brand-100 font-mono leading-relaxed focus:outline-none"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 pt-4 border-t border-surface-border", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => setIsSourceDialogOpen(false),
                    children: "إلغاء"
                  }
                ),
                /* @__PURE__ */ jsx(Button, { type: "button", variant: "primary", size: "sm", onClick: handleApplySource, children: "تطبيق التعديلات" })
              ] })
            ] })
          }
        )
      ]
    }
  );
};
export {
  TipTapEditor
};
