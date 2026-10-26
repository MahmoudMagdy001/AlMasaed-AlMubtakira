var _a, _b, _c, _d, _e, _f;
import { g as generateSlug } from "./blogAdminService-DtY0JHBt.js";
import { useState, useRef, useEffect } from "react";
import { jsxs, jsx } from "react/jsx-runtime";
import { CheckCircle2, AlertTriangle, XCircle, ChevronUp, ChevronDown, Sparkles, Clock, Hash, BookOpen, ListTree, Link2, Image } from "lucide-react";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/blog/seo/types.ts");
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/features/blog/seo/arabicUtils.ts");
function normalizeArabic(text) {
  if (!text) return "";
  return text.replace(/[\u064B-\u065F\u0670]/g, "").replace(/\u0640/g, "").replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632)).toLowerCase().replace(/\s+/g, " ").trim();
}
function extractPlainText(html) {
  if (!html) return "";
  return html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function countWords(text) {
  if (!text) return 0;
  const plain = extractPlainText(text);
  const words = plain.split(/\s+/).filter(Boolean);
  return words.length;
}
function calculateKeywordDensity(occurrences, keywordWordsCount, totalWords) {
  if (totalWords <= 0 || occurrences <= 0) return 0;
  const density = occurrences * keywordWordsCount / totalWords * 100;
  return Math.round(density * 100) / 100;
}
function findKeywordMatches(rawText, rawKeyword) {
  if (!rawText || !rawKeyword) {
    return { count: 0, matches: [] };
  }
  const normalizedKeyword = normalizeArabic(rawKeyword);
  if (!normalizedKeyword) {
    return { count: 0, matches: [] };
  }
  const keywordWords = normalizedKeyword.split(/\s+/).filter(Boolean);
  if (keywordWords.length === 0) {
    return { count: 0, matches: [] };
  }
  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixGroup = "(?:و|ف|ب|ل|ك|ال|وال|بال|لل|فال|كال)?";
  const patternParts = keywordWords.map((word, idx) => {
    const escaped = escapeRegExp(word);
    if (idx === 0) {
      return `${prefixGroup}${escaped}`;
    }
    return `(?:ال|وال|بال|لل)?${escaped}`;
  });
  const phrasePattern = patternParts.join("\\s+");
  const boundaryRegex = new RegExp(
    `(^|[^\\p{L}\\p{N}])(${phrasePattern})(?=[^\\p{L}\\p{N}]|$)`,
    "giu"
  );
  const normalizedText = normalizeArabic(rawText);
  const matches = [];
  let match;
  while ((match = boundaryRegex.exec(normalizedText)) !== null) {
    const matchedKeyword = match[2];
    const offset = match[1].length;
    const index = match.index + offset;
    matches.push({
      index,
      length: matchedKeyword.length,
      matchedText: matchedKeyword
    });
    if (boundaryRegex.lastIndex === match.index) {
      boundaryRegex.lastIndex++;
    }
  }
  return {
    count: matches.length,
    matches
  };
}
function analyzeSentences(rawText) {
  const plain = extractPlainText(rawText);
  if (!plain) {
    return { sentenceCount: 0, avgSentenceWords: 0, longSentencePercent: 0 };
  }
  const rawSentences = plain.split(/[.!?؟۔…\n\r]+/).map((s) => s.trim()).filter((s) => s.length > 0);
  if (rawSentences.length === 0) {
    return { sentenceCount: 1, avgSentenceWords: countWords(plain), longSentencePercent: 0 };
  }
  let totalWords = 0;
  let longSentences = 0;
  for (const s of rawSentences) {
    const wCount = s.split(/\s+/).filter(Boolean).length;
    totalWords += wCount;
    if (wCount > 30) {
      longSentences++;
    }
  }
  const sentenceCount = rawSentences.length;
  const avgSentenceWords = Math.round(totalWords / sentenceCount);
  const longSentencePercent = Math.round(longSentences / sentenceCount * 100);
  return {
    sentenceCount,
    avgSentenceWords,
    longSentencePercent
  };
}
function analyzeParagraphs(html) {
  if (!html) {
    return { paragraphCount: 0, maxParagraphWords: 0, paragraphsOver150Words: 0 };
  }
  const pRegex = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  const paragraphs = [];
  let match;
  while ((match = pRegex.exec(html)) !== null) {
    const text = extractPlainText(match[1]);
    if (text.length > 0) {
      paragraphs.push(text);
    }
  }
  if (paragraphs.length === 0) {
    const entireWords = countWords(html);
    return {
      paragraphCount: 1,
      maxParagraphWords: entireWords,
      paragraphsOver150Words: entireWords > 150 ? 1 : 0
    };
  }
  let maxWords = 0;
  let over150 = 0;
  for (const p of paragraphs) {
    const words = p.split(/\s+/).filter(Boolean).length;
    if (words > maxWords) maxWords = words;
    if (words > 150) over150++;
  }
  return {
    paragraphCount: paragraphs.length,
    maxParagraphWords: maxWords,
    paragraphsOver150Words: over150
  };
}
(_c = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _c.call(globalThis, "src/features/blog/seo/seoAnalyzer.ts");
function extractLinks(html, siteDomain = "almubtakirah.com") {
  const linkRegex = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  const linksList = [];
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const attrs = match[1];
    const text = extractPlainText(match[2]);
    const hrefMatch = attrs.match(/href\s*=\s*["']([^"']+)["']/i);
    const relMatch = attrs.match(/rel\s*=\s*["']([^"']+)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1].trim();
      const rel = relMatch ? relMatch[1].toLowerCase() : "";
      const isNofollow = rel.includes("nofollow");
      const isInternal = href.startsWith("/") || href.startsWith("#") || href.includes(siteDomain) || href.startsWith("./");
      linksList.push({
        href,
        text: text || href,
        isInternal,
        isNofollow
      });
    }
  }
  const internalCount = linksList.filter((l) => l.isInternal).length;
  const externalCount = linksList.filter((l) => !l.isInternal).length;
  return {
    internalCount,
    externalCount,
    linksList
  };
}
function extractHeadings(html) {
  const headingRegex = /<(h[2-4])\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const outline = [];
  const counts = { h2: 0, h3: 0, h4: 0 };
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const tag = match[1].toLowerCase();
    const text = extractPlainText(match[2]);
    const level = Number(tag.charAt(1));
    if (level === 2) counts.h2++;
    if (level === 3) counts.h3++;
    if (level === 4) counts.h4++;
    outline.push({ level, text });
  }
  let hasSkippedLevels = false;
  for (let i = 0; i < outline.length; i++) {
    const current = outline[i].level;
    const prev = i > 0 ? outline[i - 1].level : 1;
    if (current - prev > 1) {
      hasSkippedLevels = true;
      break;
    }
  }
  return {
    outline,
    counts,
    hasSkippedLevels
  };
}
function extractImages(html) {
  const imgRegex = /<img\b([^>]*)>/gi;
  let total = 0;
  let withAlt = 0;
  const altsList = [];
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    total++;
    const attrs = match[1];
    const altMatch = attrs.match(/alt\s*=\s*["']([^"']*)["']/i);
    if (altMatch && altMatch[1].trim().length > 0) {
      withAlt++;
      altsList.push(altMatch[1].trim());
    }
  }
  return {
    total,
    withAlt,
    missingAlt: total - withAlt,
    altsList
  };
}
function analyzePostSeo(input) {
  const siteDomain = input.siteDomain || "almubtakirah.com";
  const focusKeyword = (input.focusKeyword || "").trim();
  const normKeyword = normalizeArabic(focusKeyword);
  const keywordWordsCount = normKeyword ? normKeyword.split(/\s+/).filter(Boolean).length : 0;
  const contentHtml = input.contentHtml || "";
  const plainContent = extractPlainText(contentHtml);
  const totalWords = countWords(plainContent);
  const sentenceAnalysis = analyzeSentences(plainContent);
  const paragraphAnalysis = analyzeParagraphs(contentHtml);
  const headingsData = extractHeadings(contentHtml);
  const linksData = extractLinks(contentHtml, siteDomain);
  const imagesData = extractImages(contentHtml);
  const keywordMatchResult = normKeyword ? findKeywordMatches(plainContent, focusKeyword) : { count: 0 };
  const keywordOccurrences = keywordMatchResult.count;
  const keywordDensity = calculateKeywordDensity(keywordOccurrences, keywordWordsCount, totalWords);
  const readingTimeMin = Math.max(1, Math.ceil(totalWords / 200));
  const faqCount = input.faq ? input.faq.length : 0;
  const checks = [];
  if (focusKeyword.length > 0) {
    checks.push({
      id: "focus-keyword-set",
      titleAr: "تحديد الكلمة المفتاحية المستهدفة",
      status: "pass",
      score: 5,
      maxScore: 5,
      messageAr: `تم تحديد الكلمة المفتاحية: "${focusKeyword}"`,
      category: "basic"
    });
  } else {
    checks.push({
      id: "focus-keyword-set",
      titleAr: "تحديد الكلمة المفتاحية المستهدفة",
      status: "fail",
      score: 0,
      maxScore: 5,
      messageAr: "لم يتم تحديد كلمة مفتاحية رئيسية للمقال.",
      fixTipAr: "حدد الكلمة المفتاحية الأساسية التي يبحث عنها العملاء (مثال: صيانة مصاعد جدة).",
      category: "basic"
    });
  }
  const effectiveTitle = (input.seoTitle || input.title || "").trim();
  const titleMatches = normKeyword ? findKeywordMatches(effectiveTitle, focusKeyword) : { count: 0 };
  if (!normKeyword) {
    checks.push({
      id: "keyword-in-title",
      titleAr: "الكلمة المفتاحية في عنوان المقال",
      status: "fail",
      score: 0,
      maxScore: 8,
      messageAr: "حدد الكلمة المفتاحية أولاً لفحص وجودها في العنوان.",
      fixTipAr: "أدرج الكلمة المفتاحية في عنوان الـ SEO.",
      category: "basic"
    });
  } else if (titleMatches.count > 0) {
    const isAtStart = normalizeArabic(effectiveTitle).startsWith(normKeyword);
    checks.push({
      id: "keyword-in-title",
      titleAr: "الكلمة المفتاحية في عنوان المقال",
      status: "pass",
      score: 8,
      maxScore: 8,
      messageAr: isAtStart ? "الكلمة المفتاحية موجودة في بداية العنوان (موضع مثالي لجذب النقرات)." : "الكلمة المفتاحية متضمنة في عنوان المقال.",
      category: "basic"
    });
  } else {
    checks.push({
      id: "keyword-in-title",
      titleAr: "الكلمة المفتاحية في عنوان المقال",
      status: "fail",
      score: 0,
      maxScore: 8,
      messageAr: "العنوان لا يحتوي على الكلمة المفتاحية المستهدفة.",
      fixTipAr: "أضف الكلمة المفتاحية إلى عنوان المقال (ويفضل أن تكون في البداية).",
      category: "basic"
    });
  }
  const effectiveDesc = (input.seoDescription || input.excerpt || "").trim();
  const descMatches = normKeyword ? findKeywordMatches(effectiveDesc, focusKeyword) : { count: 0 };
  if (!normKeyword) {
    checks.push({
      id: "keyword-in-desc",
      titleAr: "الكلمة المفتاحية في الوصف التعريفي",
      status: "fail",
      score: 0,
      maxScore: 6,
      messageAr: "حدد الكلمة المفتاحية أولاً لفحص الوصف.",
      fixTipAr: "أضف الكلمة المفتاحية في الوصف التعريفي للـ SEO.",
      category: "basic"
    });
  } else if (descMatches.count > 0) {
    checks.push({
      id: "keyword-in-desc",
      titleAr: "الكلمة المفتاحية في الوصف التعريفي",
      status: "pass",
      score: 6,
      maxScore: 6,
      messageAr: "الكلمة المفتاحية متضمنة في الوصف التعريفي لمحركات البحث.",
      category: "basic"
    });
  } else {
    checks.push({
      id: "keyword-in-desc",
      titleAr: "الكلمة المفتاحية في الوصف التعريفي",
      status: "fail",
      score: 0,
      maxScore: 6,
      messageAr: "الوصف التعريفي (أو المقتطف) لا يحتوي على الكلمة المفتاحية.",
      fixTipAr: "صغ وصفاً جذاباً يتضمن الكلمة المفتاحية لحث الزوار على النقر.",
      category: "basic"
    });
  }
  const slug = (input.slug || "").trim().toLowerCase();
  const transliteratedKeywordSlug = normKeyword ? generateSlug(focusKeyword) : "";
  const isKeywordInSlug = Boolean(slug && transliteratedKeywordSlug && slug.includes(transliteratedKeywordSlug)) || normKeyword && slug.includes(normKeyword.replace(/\s+/g, "-"));
  if (!normKeyword) {
    checks.push({
      id: "keyword-in-slug",
      titleAr: "الكلمة المفتاحية في الرابط اللطيف (Slug)",
      status: "fail",
      score: 0,
      maxScore: 5,
      messageAr: "حدد الكلمة المفتاحية لفحص الرابط.",
      category: "basic"
    });
  } else if (isKeywordInSlug) {
    checks.push({
      id: "keyword-in-slug",
      titleAr: "الكلمة المفتاحية في الرابط اللطيف (Slug)",
      status: "pass",
      score: 5,
      maxScore: 5,
      messageAr: "الرابط اللطيف يحتوي على الكلمة المفتاحية بشكل سليم.",
      category: "basic"
    });
  } else {
    checks.push({
      id: "keyword-in-slug",
      titleAr: "الكلمة المفتاحية في الرابط اللطيف (Slug)",
      status: "fail",
      score: 0,
      maxScore: 5,
      messageAr: "الرابط اللطيف للمقال لا يتضمن الكلمة المفتاحية.",
      fixTipAr: `ضمّن صياغة الكلمة المفتاحية في الرابط (مثال: /${transliteratedKeywordSlug || "keyword"}).`,
      category: "basic"
    });
  }
  const first100Words = plainContent.split(/\s+/).slice(0, 100).join(" ");
  const first100Matches = normKeyword ? findKeywordMatches(first100Words, focusKeyword) : { count: 0 };
  if (!normKeyword) {
    checks.push({
      id: "keyword-in-intro",
      titleAr: "الكلمة المفتاحية في المقدمة (أول 100 كلمة)",
      status: "fail",
      score: 0,
      maxScore: 7,
      messageAr: "حدد الكلمة المفتاحية لفحص مقدمة المقال.",
      category: "basic"
    });
  } else if (first100Matches.count > 0) {
    checks.push({
      id: "keyword-in-intro",
      titleAr: "الكلمة المفتاحية في المقدمة (أول 100 كلمة)",
      status: "pass",
      score: 7,
      maxScore: 7,
      messageAr: "الكلمة المفتاحية مذكورة في الفقرة الافتتاحية الأولى للمقال.",
      category: "basic"
    });
  } else {
    checks.push({
      id: "keyword-in-intro",
      titleAr: "الكلمة المفتاحية في المقدمة (أول 100 كلمة)",
      status: "fail",
      score: 0,
      maxScore: 7,
      messageAr: "الكلمة المفتاحية لم تذكر في أول 100 كلمة من المقال.",
      fixTipAr: "اذكر موضوع المقال والكلمة المفتاحية في السطور الأولى لتأكيد صلة المحتوى لمحركات البحث.",
      category: "basic"
    });
  }
  const subheadingsText = headingsData.outline.map((h) => h.text).join(" ");
  const subheadingsMatches = normKeyword ? findKeywordMatches(subheadingsText, focusKeyword) : { count: 0 };
  if (!normKeyword) {
    checks.push({
      id: "keyword-in-subheading",
      titleAr: "الكلمة المفتاحية في العناوين الفرعية (H2/H3)",
      status: "fail",
      score: 0,
      maxScore: 5,
      messageAr: "حدد الكلمة المفتاحية لفحص العناوين الفرعية.",
      category: "basic"
    });
  } else if (subheadingsMatches.count > 0) {
    checks.push({
      id: "keyword-in-subheading",
      titleAr: "الكلمة المفتاحية في العناوين الفرعية (H2/H3)",
      status: "pass",
      score: 5,
      maxScore: 5,
      messageAr: "الكلمة المفتاحية مستخدمة في عنوان فرعي واحد على الأقل.",
      category: "basic"
    });
  } else {
    checks.push({
      id: "keyword-in-subheading",
      titleAr: "الكلمة المفتاحية في العناوين الفرعية (H2/H3)",
      status: "fail",
      score: 0,
      maxScore: 5,
      messageAr: "لا يوجد أي عنوان فرعي (H2 أو H3) يتضمن الكلمة المفتاحية.",
      fixTipAr: "استخدم الكلمة المفتاحية في عنوان H2 رئيسي لتوضيح أقسام المقال.",
      category: "basic"
    });
  }
  if (!normKeyword || keywordOccurrences === 0) {
    checks.push({
      id: "keyword-density",
      titleAr: "كثافة الكلمة المفتاحية (Keyword Density)",
      status: "fail",
      score: 0,
      maxScore: 6,
      messageAr: "الكلمة المفتاحية لم تذكر في محتوى المقال (0%).",
      fixTipAr: "استخدم الكلمة المفتاحية بمعدل متوازن (من 0.5% إلى 2.5%).",
      category: "basic"
    });
  } else if (keywordDensity >= 0.5 && keywordDensity <= 2.5) {
    checks.push({
      id: "keyword-density",
      titleAr: "كثافة الكلمة المفتاحية (Keyword Density)",
      status: "pass",
      score: 6,
      maxScore: 6,
      messageAr: `كثافة الكلمة المفتاحية ممتازة وطبيعية: ${keywordDensity}% (${keywordOccurrences} مرات).`,
      category: "basic"
    });
  } else if (keywordDensity < 0.5) {
    checks.push({
      id: "keyword-density",
      titleAr: "كثافة الكلمة المفتاحية (Keyword Density)",
      status: "warn",
      score: 3,
      maxScore: 6,
      messageAr: `كثافة الكلمة المفتاحية منخفضة نوعاً ما: ${keywordDensity}% (${keywordOccurrences} مرات).`,
      fixTipAr: "أعد ذكر الكلمة المفتاحية في مواضع مناسبة لرفع الكثافة فوق 0.5%.",
      category: "basic"
    });
  } else if (keywordDensity <= 3.5) {
    checks.push({
      id: "keyword-density",
      titleAr: "كثافة الكلمة المفتاحية (Keyword Density)",
      status: "warn",
      score: 3,
      maxScore: 6,
      messageAr: `كثافة الكلمة المفتاحية مرتفعة: ${keywordDensity}% (${keywordOccurrences} مرات).`,
      fixTipAr: "استبدل بعض التكرارات بمرادفات لتجنب عقوبات التكرار المفرط.",
      category: "basic"
    });
  } else {
    checks.push({
      id: "keyword-density",
      titleAr: "كثافة الكلمة المفتاحية (Keyword Density)",
      status: "fail",
      score: 0,
      maxScore: 6,
      messageAr: `تنبيه: حشو كلمات مفتاحية ضار (Keyword Stuffing): ${keywordDensity}% (${keywordOccurrences} مرات).`,
      fixTipAr: "قلل من تكرار الكلمة المفتاحية فوراً حتى لا يعتبرها محرك البحث تلاعباً.",
      category: "basic"
    });
  }
  const titleLen = effectiveTitle.length;
  if (titleLen >= 30 && titleLen <= 60) {
    checks.push({
      id: "title-length",
      titleAr: "طول عنوان المقال",
      status: "pass",
      score: 4,
      maxScore: 4,
      messageAr: `طول العنوان مثالي لمحركات البحث: ${titleLen} حرفاً (النطاق 30-60).`,
      category: "basic"
    });
  } else if (titleLen > 0 && titleLen < 30) {
    checks.push({
      id: "title-length",
      titleAr: "طول عنوان المقال",
      status: "warn",
      score: 2,
      maxScore: 4,
      messageAr: `عنوان المقال قصير نسبياً: ${titleLen} حرفاً.`,
      fixTipAr: "اجعل العنوان أكثر شمولاً وتفصيلاً بين 30 و 60 حرفاً.",
      category: "basic"
    });
  } else if (titleLen > 60) {
    checks.push({
      id: "title-length",
      titleAr: "طول عنوان المقال",
      status: "warn",
      score: 2,
      maxScore: 4,
      messageAr: `عنوان المقال طويل: ${titleLen} حرفاً (قد يتم اقتطاعه في نتائج بحث جوجل).`,
      fixTipAr: "اختصر العنوان بحيث لا يتجاوز 60 حرفاً.",
      category: "basic"
    });
  } else {
    checks.push({
      id: "title-length",
      titleAr: "طول عنوان المقال",
      status: "fail",
      score: 0,
      maxScore: 4,
      messageAr: "عنوان المقال فارغ.",
      fixTipAr: "أدخل عنواناً واضحاً للمقال.",
      category: "basic"
    });
  }
  const descLen = effectiveDesc.length;
  if (descLen >= 120 && descLen <= 160) {
    checks.push({
      id: "meta-desc-length",
      titleAr: "طول الوصف التعريفي (Meta Description)",
      status: "pass",
      score: 4,
      maxScore: 4,
      messageAr: `طول الوصف التعريفي ممتاز: ${descLen} حرفاً (النطاق 120-160).`,
      category: "basic"
    });
  } else if (descLen >= 80 && descLen < 120 || descLen > 160 && descLen <= 180) {
    checks.push({
      id: "meta-desc-length",
      titleAr: "طول الوصف التعريفي (Meta Description)",
      status: "warn",
      score: 2,
      maxScore: 4,
      messageAr: descLen < 120 ? `الوصف التعريفي قصير نوعاً ما: ${descLen} حرفاً.` : `الوصف التعريفي أطول قليلاً من الموصى به: ${descLen} حرفاً.`,
      fixTipAr: "اضبط طول الوصف ليكون بين 120 و 160 حرفاً لظهور مثالي.",
      category: "basic"
    });
  } else {
    checks.push({
      id: "meta-desc-length",
      titleAr: "طول الوصف التعريفي (Meta Description)",
      status: "fail",
      score: 0,
      maxScore: 4,
      messageAr: descLen === 0 ? "الوصف التعريفي فارغ." : descLen < 80 ? `الوصف التعريفي قصير جداً: ${descLen} حرفاً.` : `الوصف التعريفي طويل جداً: ${descLen} حرفاً وسيتم اقتطاعه بالتأكيد.`,
      fixTipAr: "اكتب وصفاً جذاباً بين 120 و 160 حرفاً يلخص فائدة المقال.",
      category: "basic"
    });
  }
  if (totalWords >= 800) {
    checks.push({
      id: "word-count",
      titleAr: "طول المحتوى وعدد الكلمات",
      status: "pass",
      score: 8,
      maxScore: 8,
      messageAr: `المقال شامل وغني بالمعلومات: ${totalWords} كلمة (الموصى به 800+).`,
      category: "content"
    });
  } else if (totalWords >= 400) {
    checks.push({
      id: "word-count",
      titleAr: "طول المحتوى وعدد الكلمات",
      status: "warn",
      score: 4,
      maxScore: 8,
      messageAr: `المقال متوسط الطول: ${totalWords} كلمة.`,
      fixTipAr: "أضف المزيد من الشروحات أو دراسات الحالة ليتجاوز 800 كلمة للمنافسة بقوة.",
      category: "content"
    });
  } else {
    checks.push({
      id: "word-count",
      titleAr: "طول المحتوى وعدد الكلمات",
      status: "fail",
      score: 0,
      maxScore: 8,
      messageAr: `محتوى ضعيف وقصير جداً (Thin Content): ${totalWords} كلمة فقط.`,
      fixTipAr: "المقالات التي تقل عن 400 كلمة نادراً ما تتصدر نتائج البحث. قم بتوسيع المحتوى.",
      category: "content"
    });
  }
  if (headingsData.counts.h2 >= 2 && !headingsData.hasSkippedLevels) {
    checks.push({
      id: "heading-structure",
      titleAr: "تسلسل وهيكلية العناوين (H2/H3)",
      status: "pass",
      score: 6,
      maxScore: 6,
      messageAr: `هيكل العناوين متناسق ومنظم: ${headingsData.counts.h2} عناوين H2 و ${headingsData.counts.h3} عناوين H3.`,
      category: "content"
    });
  } else if (headingsData.counts.h2 === 1 || headingsData.hasSkippedLevels) {
    checks.push({
      id: "heading-structure",
      titleAr: "تسلسل وهيكلية العناوين (H2/H3)",
      status: "warn",
      score: 3,
      maxScore: 6,
      messageAr: headingsData.hasSkippedLevels ? "تم تخطي أحد مستويات العناوين (مثلاً استخدام H4 دون H3)." : `يوجد عنوان H2 رئيسي واحد فقط (${headingsData.counts.h2}).`,
      fixTipAr: "قسّم المقال إلى قسمين رئيسيين على الأقل بعنوانين H2 مع تدرج سليم للمستويات.",
      category: "content"
    });
  } else {
    checks.push({
      id: "heading-structure",
      titleAr: "تسلسل وهيكلية العناوين (H2/H3)",
      status: "fail",
      score: 0,
      maxScore: 6,
      messageAr: "المقال يخلو من العناوين الفرعية (H2).",
      fixTipAr: "استخدم العناوين الفرعية H2 لتقسيم المقال لتسهيل قراءته على الزائر.",
      category: "content"
    });
  }
  if (paragraphAnalysis.paragraphsOver150Words === 0) {
    checks.push({
      id: "paragraph-length",
      titleAr: "طول الفقرات وسهولة القراءة",
      status: "pass",
      score: 3,
      maxScore: 3,
      messageAr: `طول الفقرات مريح للقراءة (أطول فقرة: ${paragraphAnalysis.maxParagraphWords} كلمة).`,
      category: "content"
    });
  } else if (paragraphAnalysis.paragraphsOver150Words <= 2) {
    checks.push({
      id: "paragraph-length",
      titleAr: "طول الفقرات وسهولة القراءة",
      status: "warn",
      score: 1,
      maxScore: 3,
      messageAr: `يوجد ${paragraphAnalysis.paragraphsOver150Words} فقرة يتجاوز طولها 150 كلمة.`,
      fixTipAr: "قسّم الفقرات الطويلة إلى فقرات أقصر لا تتجاوز 4-5 أسطر لتحسين تجربة المستخدم على الجوال.",
      category: "content"
    });
  } else {
    checks.push({
      id: "paragraph-length",
      titleAr: "طول الفقرات وسهولة القراءة",
      status: "fail",
      score: 0,
      maxScore: 3,
      messageAr: `يوجد ${paragraphAnalysis.paragraphsOver150Words} فقرات طويلة جداً تفوق 150 كلمة.`,
      fixTipAr: "أعد صياغة المقال في فقرات قصيرة ومريحة للعين.",
      category: "content"
    });
  }
  if (sentenceAnalysis.avgSentenceWords <= 25 && sentenceAnalysis.longSentencePercent <= 25) {
    checks.push({
      id: "sentence-length",
      titleAr: "طول الجمل وانسيابية التعبير",
      status: "pass",
      score: 3,
      maxScore: 3,
      messageAr: `الجمل واضحة ومباشرة (متوسط: ${sentenceAnalysis.avgSentenceWords} كلمة/جملة).`,
      category: "content"
    });
  } else if (sentenceAnalysis.avgSentenceWords <= 32 || sentenceAnalysis.longSentencePercent <= 40) {
    checks.push({
      id: "sentence-length",
      titleAr: "طول الجمل وانسيابية التعبير",
      status: "warn",
      score: 1,
      maxScore: 3,
      messageAr: `نسبة الجمل الطويلة مرتفعة (${sentenceAnalysis.longSentencePercent}% من الجمل تفوق 30 كلمة).`,
      fixTipAr: "استخدم علامات الترقيم (، .) لتقسيم الجمل المركبة الطويلة.",
      category: "content"
    });
  } else {
    checks.push({
      id: "sentence-length",
      titleAr: "طول الجمل وانسيابية التعبير",
      status: "fail",
      score: 0,
      maxScore: 3,
      messageAr: `صياغة الجمل معقدة وطويلة (متوسط: ${sentenceAnalysis.avgSentenceWords} كلمة/جملة).`,
      fixTipAr: "قسّم الجمل الطويلة واعتمد صيغة المبني للمعلوم المباشرة.",
      category: "content"
    });
  }
  const hasFeaturedImage = Boolean(input.featuredImageId);
  const featuredAlt = (input.featuredImageAlt || "").trim();
  const featuredAltMatches = normKeyword && featuredAlt ? findKeywordMatches(featuredAlt, focusKeyword) : { count: 0 };
  if (hasFeaturedImage && featuredAltMatches.count > 0) {
    checks.push({
      id: "featured-image-alt",
      titleAr: "الصورة البارزة والنص البديل (Alt)",
      status: "pass",
      score: 4,
      maxScore: 4,
      messageAr: "تم تعيين الصورة البارزة والنص البديل يتضمن الكلمة المفتاحية.",
      category: "content"
    });
  } else if (hasFeaturedImage && featuredAlt.length > 0) {
    checks.push({
      id: "featured-image-alt",
      titleAr: "الصورة البارزة والنص البديل (Alt)",
      status: "warn",
      score: 2,
      maxScore: 4,
      messageAr: "الصورة البارزة موجودة ولها نص بديل، لكنها لا تحتوي على الكلمة المفتاحية.",
      fixTipAr: "أضف الكلمة المفتاحية بشكل وصفي في النص البديل للصورة البارزة.",
      category: "content"
    });
  } else if (hasFeaturedImage) {
    checks.push({
      id: "featured-image-alt",
      titleAr: "الصورة البارزة والنص البديل (Alt)",
      status: "warn",
      score: 2,
      maxScore: 4,
      messageAr: "الصورة البارزة معينة لكن النص البديل (Alt) فارغ.",
      fixTipAr: "أدخل نصاً بديلاً دقيقاً للصورة البارزة لتمكين الفهرسة ومساعدة ذوي الاحتياجات الخاصة.",
      category: "content"
    });
  } else {
    checks.push({
      id: "featured-image-alt",
      titleAr: "الصورة البارزة والنص البديل (Alt)",
      status: "fail",
      score: 0,
      maxScore: 4,
      messageAr: "لم يتم تعيين صورة بارزة للمقال.",
      fixTipAr: "اختر صورة رئيسية عالية الجودة للمقال من مكتبة الوسائط.",
      category: "content"
    });
  }
  if (imagesData.total === 0) {
    checks.push({
      id: "inline-images-alt",
      titleAr: "النصوص البديلة لصور المحتوى",
      status: "pass",
      score: 3,
      maxScore: 3,
      messageAr: "لا توجد صور داخلية تفتقر لنص بديل.",
      category: "content"
    });
  } else if (imagesData.missingAlt === 0) {
    checks.push({
      id: "inline-images-alt",
      titleAr: "النصوص البديلة لصور المحتوى",
      status: "pass",
      score: 3,
      maxScore: 3,
      messageAr: `جميع صور المحتوى (${imagesData.total}) تحتوي على نصوص بديلة (Alt).`,
      category: "content"
    });
  } else if (imagesData.withAlt > 0) {
    checks.push({
      id: "inline-images-alt",
      titleAr: "النصوص البديلة لصور المحتوى",
      status: "warn",
      score: 1,
      maxScore: 3,
      messageAr: `يوجد ${imagesData.missingAlt} صور من أصل ${imagesData.total} بدون نص بديل.`,
      fixTipAr: "انقر على كل صورة داخل المحرر وأضف نصاً بديلاً يصف محتواها بدقة.",
      category: "content"
    });
  } else {
    checks.push({
      id: "inline-images-alt",
      titleAr: "النصوص البديلة لصور المحتوى",
      status: "fail",
      score: 0,
      maxScore: 3,
      messageAr: `جميع الصور الداخلية (${imagesData.total}) تفتقر للنص البديل (Alt).`,
      fixTipAr: "أضف نصوصاً بديلة لكافة الصور لتفادي خسارة تقييم السيو وإمكانية الوصول.",
      category: "content"
    });
  }
  if (linksData.internalCount >= 2) {
    checks.push({
      id: "internal-links",
      titleAr: "الروابط الداخلية (Internal Links)",
      status: "pass",
      score: 3,
      maxScore: 3,
      messageAr: `تم تضمين ${linksData.internalCount} روابط داخلية لصفحات وخدمات الموقع.`,
      category: "content"
    });
  } else if (linksData.internalCount === 1) {
    checks.push({
      id: "internal-links",
      titleAr: "الروابط الداخلية (Internal Links)",
      status: "warn",
      score: 1,
      maxScore: 3,
      messageAr: "تم تضمين رابط داخلي واحد فقط.",
      fixTipAr: "أضف رابطاً داخلياً ثانياً على الأقل يشير إلى إحدى خدمات المصاعد أو المشاريع السابقة ذات الصلة.",
      category: "content"
    });
  } else {
    checks.push({
      id: "internal-links",
      titleAr: "الروابط الداخلية (Internal Links)",
      status: "fail",
      score: 0,
      maxScore: 3,
      messageAr: "المقال لا يحتوي على أي روابط داخلية لأقسام الموقع.",
      fixTipAr: "اربط المقال بصفحات خدماتنا ذات الصلة (مثل صيانة المصاعد، قطع الغيار، المشاريع).",
      category: "content"
    });
  }
  if (linksData.externalCount >= 1) {
    checks.push({
      id: "external-links",
      titleAr: "الروابط الخارجية والمصادر الموثوقة",
      status: "pass",
      score: 4,
      maxScore: 4,
      messageAr: `المقال يشير إلى ${linksData.externalCount} مصادر وروابط خارجية موثوقة.`,
      category: "technical"
    });
  } else {
    checks.push({
      id: "external-links",
      titleAr: "الروابط الخارجية والمصادر الموثوقة",
      status: "fail",
      score: 0,
      maxScore: 4,
      messageAr: "لا توجد روابط خارجية لمصادر أو مراجع رسمية.",
      fixTipAr: "أضف رابطاً خارجياً لجهة موثوقة (مثل كود البناء السعودي، مواصفات السلامة EN-81، أو هيئة المواصفات).",
      category: "technical"
    });
  }
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const isSlugFormatValid = slugRegex.test(slug);
  const isSlugLengthValid = slug.length > 0 && slug.length <= 75;
  if (isSlugFormatValid && isSlugLengthValid) {
    checks.push({
      id: "slug-quality",
      titleAr: "جودة الرابط اللطيف (Slug Quality)",
      status: "pass",
      score: 3,
      maxScore: 3,
      messageAr: `الرابط نظيف ومطابق للمعايير القياسية (${slug.length} حرفاً).`,
      category: "technical"
    });
  } else if (!isSlugLengthValid && isSlugFormatValid) {
    checks.push({
      id: "slug-quality",
      titleAr: "جودة الرابط اللطيف (Slug Quality)",
      status: "warn",
      score: 1,
      maxScore: 3,
      messageAr: `الرابط أطول من الموصى به: ${slug.length} حرفاً (الحد الأقصى 75).`,
      fixTipAr: "اختصر الرابط اللطيف واكتفِ بالكلمات الأساسية.",
      category: "technical"
    });
  } else {
    checks.push({
      id: "slug-quality",
      titleAr: "جودة الرابط اللطيف (Slug Quality)",
      status: "fail",
      score: 0,
      maxScore: 3,
      messageAr: "صيغة الرابط غير صحيحة أو يحتوي على حروف غير مدعومة.",
      fixTipAr: "استخدم فقط الحروف الإنجليزية الصغيرة، الأرقام، والشرطات (-).",
      category: "technical"
    });
  }
  const canonical = (input.canonicalUrl || "").trim();
  const isCanonicalValid = canonical.length === 0 || /^https:\/\/(www\.)?almubtakirah\.com(\/.*)?$/i.test(canonical);
  if (isCanonicalValid) {
    checks.push({
      id: "canonical-url",
      titleAr: "الرابط الأساسي المعتمد (Canonical URL)",
      status: "pass",
      score: 2,
      maxScore: 2,
      messageAr: canonical ? "تم ضبط الرابط الأساسي المعتمد بشكل صحيح." : "الرابط الأساسي يتبع الرابط الافتراضي للمقال تلقائياً.",
      category: "technical"
    });
  } else {
    checks.push({
      id: "canonical-url",
      titleAr: "الرابط الأساسي المعتمد (Canonical URL)",
      status: "fail",
      score: 0,
      maxScore: 2,
      messageAr: "صيغة الرابط الأساسي (Canonical) غير صحيحة.",
      fixTipAr: "اترك الحقل فارغاً، أو أدخل رابطاً مطلقاً يبدأ بـ https://almubtakirah.com.",
      category: "technical"
    });
  }
  if (!input.robotsNoindex) {
    checks.push({
      id: "robots-indexable",
      titleAr: "قابلية الفهرسة (Indexability)",
      status: "pass",
      score: 4,
      maxScore: 4,
      messageAr: "المقال متاح لفهرسة محركات البحث (index, follow).",
      category: "technical"
    });
  } else {
    checks.push({
      id: "robots-indexable",
      titleAr: "قابلية الفهرسة (Indexability)",
      status: "fail",
      score: 0,
      maxScore: 4,
      messageAr: "تنبيه: تم تفعيل خيار منع الفهرسة (noindex). لن يظهر هذا المقال في جوجل.",
      fixTipAr: "عطّل مفتاح noindex إذا كنت ترغب في أن يتصدر المقال نتائج البحث.",
      category: "technical"
    });
  }
  const hasOgImage = Boolean(input.ogImageId || input.featuredImageId);
  if (hasOgImage) {
    checks.push({
      id: "og-image-present",
      titleAr: "صورة المشاركة الاجتماعية (Open Graph)",
      status: "pass",
      score: 4,
      maxScore: 4,
      messageAr: "صورة المشاركة الاجتماعية معينة بنجاح لشبكات التواصل.",
      category: "technical"
    });
  } else {
    checks.push({
      id: "og-image-present",
      titleAr: "صورة المشاركة الاجتماعية (Open Graph)",
      status: "fail",
      score: 0,
      maxScore: 4,
      messageAr: "لم يتم تعيين صورة لبطاقات المشاركة على فيسبوك وتويتر.",
      fixTipAr: "اختر صورة بارزة للمقال أو حدد صورة OG مخصصة بأبعاد 1200×630.",
      category: "technical"
    });
  }
  if (faqCount >= 2) {
    checks.push({
      id: "faq-schema-present",
      titleAr: "الأسئلة الشائعة (FAQ Rich Results)",
      status: "pass",
      score: 3,
      maxScore: 3,
      messageAr: `المقال يتضمن ${faqCount} أسئلة شائعة مؤهلة لنتائج جوجل المنسقة (FAQPage).`,
      category: "technical"
    });
  } else if (faqCount === 1) {
    checks.push({
      id: "faq-schema-present",
      titleAr: "الأسئلة الشائعة (FAQ Rich Results)",
      status: "warn",
      score: 1,
      maxScore: 3,
      messageAr: "يوجد سؤال شائع واحد فقط.",
      fixTipAr: "أضف سؤالاً ثانياً لتفعيل ميزة نتائج الأسئلة الشائعة في جوجل.",
      category: "technical"
    });
  } else {
    checks.push({
      id: "faq-schema-present",
      titleAr: "الأسئلة الشائعة (FAQ Rich Results)",
      status: "fail",
      score: 0,
      maxScore: 3,
      messageAr: "لا توجد أسئلة شائعة داخل المقال.",
      fixTipAr: "أدرج بلوك أسئلة شائعة (FAQ) من شريط أدوات المحرر لتعزيز الظهور في Google Rich Snippets.",
      category: "technical"
    });
  }
  const totalScore = Math.min(
    100,
    Math.max(
      0,
      checks.reduce((acc, curr) => acc + curr.score, 0)
    )
  );
  const grade = totalScore >= 80 ? "good" : totalScore >= 50 ? "average" : "poor";
  const groupedChecks = {
    basic: checks.filter((c) => c.category === "basic"),
    content: checks.filter((c) => c.category === "content"),
    technical: checks.filter((c) => c.category === "technical")
  };
  const metrics = {
    wordCount: totalWords,
    readingTimeMin,
    keywordOccurrences,
    keywordDensity,
    sentenceCount: sentenceAnalysis.sentenceCount,
    avgSentenceWords: sentenceAnalysis.avgSentenceWords,
    longSentencePercent: sentenceAnalysis.longSentencePercent,
    paragraphsCount: paragraphAnalysis.paragraphCount,
    maxParagraphWords: paragraphAnalysis.maxParagraphWords,
    paragraphsOver150Words: paragraphAnalysis.paragraphsOver150Words,
    headingsCount: headingsData.counts,
    headingsOutline: headingsData.outline,
    links: {
      internalCount: linksData.internalCount,
      externalCount: linksData.externalCount,
      linksList: linksData.linksList
    },
    images: {
      total: imagesData.total,
      withAlt: imagesData.withAlt,
      missingAlt: imagesData.missingAlt
    },
    faqCount
  };
  return {
    score: totalScore,
    grade,
    checks,
    groupedChecks,
    metrics
  };
}
(_d = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _d.call(globalThis, "src/features/blog/seo/useSeoAnalyzer.ts");
function useSeoAnalyzer(input, options = {}) {
  const debounceMs = options.debounceMs ?? 250;
  const [result, setResult] = useState(() => analyzePostSeo(input));
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(input);
  inputRef.current = input;
  useEffect(() => {
    setIsAnalyzing(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      try {
        const nextResult = analyzePostSeo(inputRef.current);
        setResult(nextResult);
      } catch (err) {
        console.error("Failed to run SEO analysis:", err);
      } finally {
        setIsAnalyzing(false);
      }
    }, debounceMs);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [
    input.title,
    input.slug,
    input.seoTitle,
    input.seoDescription,
    input.focusKeyword,
    input.secondaryKeywords,
    input.excerpt,
    input.featuredImageId,
    input.featuredImageAlt,
    input.contentHtml,
    input.canonicalUrl,
    input.robotsNoindex,
    input.robotsNofollow,
    input.ogImageId,
    input.faq,
    input.siteDomain,
    debounceMs
  ]);
  return { result, isAnalyzing };
}
(_e = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _e.call(globalThis, "src/features/blog/seo/SeoAnalyzerPanel.tsx");
const SeoAnalyzerPanel = ({
  seoData,
  isAnalyzing = false,
  focusKeyword = ""
}) => {
  const { score, grade, groupedChecks, metrics } = seoData;
  const [activeTab, setActiveTab] = useState("basic");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedCheckId, setExpandedCheckId] = useState(null);
  const scoreColors = grade === "good" ? {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    gaugeText: "text-emerald-600",
    label: "ممتاز"
  } : grade === "average" ? {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    gaugeText: "text-amber-600",
    label: "متوسط"
  } : {
    badge: "bg-red-50 text-red-700 border-red-200",
    gaugeText: "text-red-600",
    label: "يحتاج لتحسين"
  };
  const passCount = seoData.checks.filter((c) => c.status === "pass").length;
  const warnCount = seoData.checks.filter((c) => c.status === "warn").length;
  const failCount = seoData.checks.filter((c) => c.status === "fail").length;
  const currentTabChecks = activeTab !== "metrics" ? groupedChecks[activeTab].filter((c) => {
    if (statusFilter === "issues") return c.status !== "pass";
    if (statusFilter === "pass") return c.status === "pass";
    return true;
  }) : [];
  const toggleExpand = (id) => {
    setExpandedCheckId((prev) => prev === id ? null : id);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-5 space-y-4 shadow-xs", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-surface-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-14 h-14 flex items-center justify-center", children: [
          /* @__PURE__ */ jsxs("svg", { className: "w-14 h-14 -rotate-90", viewBox: "0 0 36 36", children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                className: "text-surface-soft",
                strokeWidth: "3.5",
                stroke: "currentColor",
                fill: "none",
                d: "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                className: `${scoreColors.gaugeText} transition-all duration-500 ease-out`,
                strokeDasharray: `${score}, 100`,
                strokeLinecap: "round",
                strokeWidth: "3.5",
                stroke: "currentColor",
                fill: "none",
                d: "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute flex flex-col items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: `text-base font-black ${scoreColors.gaugeText}`, children: score }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-content-heading", children: "محلل السيو المباشر" }),
            isAnalyzing && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-content-muted animate-pulse", children: "جاري الفحص..." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: `text-[11px] font-bold px-2 py-0.5 rounded-full border ${scoreColors.badge}`,
                children: [
                  scoreColors.label,
                  " (",
                  score,
                  "/100)"
                ]
              }
            ),
            focusKeyword && /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-content-muted truncate max-w-[140px]", children: [
              "الكلمة: ",
              focusKeyword
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-end text-[11px] space-y-0.5", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-emerald-600 font-semibold", children: [
          passCount,
          " ناجح"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-amber-600 font-semibold", children: [
          warnCount,
          " تنبيه"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-feedback-error font-semibold", children: [
          failCount,
          " بحاجة لتعديل"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex border-b border-surface-border text-xs", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("basic"),
          className: `pb-2 px-2.5 font-medium border-b-2 transition-colors ${activeTab === "basic" ? "border-brand-600 text-brand-600 font-bold" : "border-transparent text-content-muted hover:text-content-heading"}`,
          children: "الأساسي (50)"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("content"),
          className: `pb-2 px-2.5 font-medium border-b-2 transition-colors ${activeTab === "content" ? "border-brand-600 text-brand-600 font-bold" : "border-transparent text-content-muted hover:text-content-heading"}`,
          children: "المحتوى (30)"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("technical"),
          className: `pb-2 px-2.5 font-medium border-b-2 transition-colors ${activeTab === "technical" ? "border-brand-600 text-brand-600 font-bold" : "border-transparent text-content-muted hover:text-content-heading"}`,
          children: "التقني (20)"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("metrics"),
          className: `pb-2 px-2.5 font-medium border-b-2 transition-colors ${activeTab === "metrics" ? "border-brand-600 text-brand-600 font-bold" : "border-transparent text-content-muted hover:text-content-heading"}`,
          children: "إحصائيات"
        }
      )
    ] }),
    activeTab !== "metrics" && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[11px] pt-1", children: [
      /* @__PURE__ */ jsx("span", { className: "text-content-muted", children: "تصفية البنود:" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1 bg-surface-soft p-0.5 rounded-control border border-surface-border", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setStatusFilter("all"),
            className: `px-2 py-0.5 rounded ${statusFilter === "all" ? "bg-white font-bold shadow-xs text-brand-600" : "text-content-muted"}`,
            children: "الكل"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setStatusFilter("issues"),
            className: `px-2 py-0.5 rounded ${statusFilter === "issues" ? "bg-white font-bold shadow-xs text-amber-600" : "text-content-muted"}`,
            children: [
              "الملاحظات (",
              warnCount + failCount,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setStatusFilter("pass"),
            className: `px-2 py-0.5 rounded ${statusFilter === "pass" ? "bg-white font-bold shadow-xs text-emerald-600" : "text-content-muted"}`,
            children: [
              "الناجح (",
              passCount,
              ")"
            ]
          }
        )
      ] })
    ] }),
    activeTab !== "metrics" ? /* @__PURE__ */ jsx("div", { className: "space-y-2 max-h-[380px] overflow-y-auto pe-1", children: currentTabChecks.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-6 text-xs text-content-muted", children: "لا توجد عناصر مطابقة للتصفية الحالية." }) : currentTabChecks.map((check) => {
      const isExpanded = expandedCheckId === check.id;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: `border rounded-control p-2.5 text-xs transition-colors ${check.status === "pass" ? "border-emerald-200 bg-emerald-50/40" : check.status === "warn" ? "border-amber-200 bg-amber-50/40" : "border-red-200 bg-red-50/40"}`,
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: () => toggleExpand(check.id),
                className: "flex items-start justify-between gap-2 cursor-pointer select-none",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "mt-0.5 shrink-0", children: check.status === "pass" ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }) : check.status === "warn" ? /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-amber-500" }) : /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-red-500" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "font-semibold text-content-heading", children: check.titleAr }),
                      /* @__PURE__ */ jsx("div", { className: "text-[11px] text-content-body mt-0.5", children: check.messageAr })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                    /* @__PURE__ */ jsxs(
                      "span",
                      {
                        className: `text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${check.status === "pass" ? "bg-emerald-100 text-emerald-800" : check.status === "warn" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`,
                        children: [
                          check.score,
                          "/",
                          check.maxScore
                        ]
                      }
                    ),
                    check.fixTipAr && /* @__PURE__ */ jsx("div", { className: "text-content-muted", children: isExpanded ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-3.5 h-3.5" }) })
                  ] })
                ]
              }
            ),
            isExpanded && check.fixTipAr && /* @__PURE__ */ jsxs("div", { className: "mt-2.5 pt-2 border-t border-surface-border text-[11px] text-content-body bg-white p-2 rounded-control", children: [
              /* @__PURE__ */ jsxs("div", { className: "font-semibold text-amber-700 flex items-center gap-1 mb-1", children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsx("span", { children: "كيفية التحسين:" })
              ] }),
              /* @__PURE__ */ jsx("p", { children: check.fixTipAr })
            ] })
          ]
        },
        check.id
      );
    }) }) : (
      /* Detailed Metrics Tab */
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-h-[380px] overflow-y-auto pe-1 text-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-2.5 rounded-control bg-surface-soft border border-surface-border space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-content-muted text-[11px]", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx("span", { children: "وقت القراءة المقدر" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "font-bold text-content-heading text-sm", children: [
              metrics.readingTimeMin,
              " دقيقة"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-2.5 rounded-control bg-surface-soft border border-surface-border space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-content-muted text-[11px]", children: [
              /* @__PURE__ */ jsx(Hash, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx("span", { children: "عدد الكلمات الكلي" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "font-bold text-content-heading text-sm", children: [
              metrics.wordCount,
              " كلمة"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-2.5 rounded-control bg-surface-soft border border-surface-border space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-content-muted text-[11px]", children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx("span", { children: "تكرار الكلمة المفتاحية" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "font-bold text-content-heading text-sm", children: [
              metrics.keywordOccurrences,
              " مرات (",
              metrics.keywordDensity,
              "%)"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-2.5 rounded-control bg-surface-soft border border-surface-border space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-content-muted text-[11px]", children: [
              /* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx("span", { children: "الفقرات والجمل" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "font-bold text-content-heading text-xs", children: [
              metrics.paragraphsCount,
              " فقرة / ",
              metrics.sentenceCount,
              " جملة"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-bold text-content-heading flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(ListTree, { className: "w-3.5 h-3.5 text-brand-600" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "هيكل العناوين (",
                metrics.headingsOutline.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-mono text-content-muted", children: [
              "H2: ",
              metrics.headingsCount.h2,
              " | H3: ",
              metrics.headingsCount.h3,
              " | H4: ",
              metrics.headingsCount.h4
            ] })
          ] }),
          metrics.headingsOutline.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-content-muted text-[11px] bg-surface-soft p-2 rounded-control border border-surface-border", children: "لا توجد ترويسات H2 أو H3 داخل المقال بعد." }) : /* @__PURE__ */ jsx("div", { className: "max-h-28 overflow-y-auto space-y-1 bg-surface-soft p-2 rounded-control border border-surface-border text-[11px]", children: metrics.headingsOutline.map((h, idx) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: `flex items-center gap-1.5 ${h.level === 3 ? "ps-4" : h.level === 4 ? "ps-8" : ""}`,
              children: [
                /* @__PURE__ */ jsxs("span", { className: "font-mono text-[9px] font-bold text-brand-700 px-1 py-0.2 rounded bg-brand-50 border border-brand-200", children: [
                  "H",
                  h.level
                ] }),
                /* @__PURE__ */ jsx("span", { className: "truncate text-content-heading", children: h.text })
              ]
            },
            idx
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-bold text-content-heading flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Link2, { className: "w-3.5 h-3.5 text-brand-600" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "الروابط (",
                metrics.links.linksList.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-content-muted", children: [
              "داخلية: ",
              metrics.links.internalCount,
              " | خارجية: ",
              metrics.links.externalCount
            ] })
          ] }),
          metrics.links.linksList.length > 0 && /* @__PURE__ */ jsx("div", { className: "max-h-24 overflow-y-auto space-y-1 bg-surface-soft p-2 rounded-control border border-surface-border text-[11px]", children: metrics.links.linksList.map((link, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "truncate text-content-heading", children: link.text || link.href }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `text-[9px] px-1.5 py-0.5 rounded font-medium shrink-0 ${link.isInternal ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-purple-50 text-purple-700 border border-purple-200"}`,
                children: link.isInternal ? "داخلي" : "خارجي"
              }
            )
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: /* @__PURE__ */ jsxs("div", { className: "font-bold text-content-heading flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Image, { className: "w-3.5 h-3.5 text-brand-600" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "الصور داخل المحتوى (",
              metrics.images.total,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-content-muted", children: [
            "نص بديل مضاف: ",
            metrics.images.withAlt,
            " / مفقود: ",
            metrics.images.missingAlt
          ] })
        ] }) })
      ] })
    )
  ] });
};
(_f = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _f.call(globalThis, "src/features/blog/seo/index.ts");
export {
  SeoAnalyzerPanel as S,
  useSeoAnalyzer as u
};
