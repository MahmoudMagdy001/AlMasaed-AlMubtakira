import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link2, Check, Share2 } from 'lucide-react'

export interface ShareButtonsProps {
  url: string
  title: string
  className?: string
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title,
  className = '',
}) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      ariaLabel: 'Share on WhatsApp',
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.582 1.961.919 3.028.919h.005c3.18 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.07-1.782-.406-1.393-.578-2.316-1.996-2.385-2.088-.069-.093-.564-.75-.564-1.429 0-.679.355-1.013.481-1.144.127-.131.277-.164.37-.164.093 0 .185.002.266.006.086.004.201-.033.315.241.116.275.394.962.428 1.033.034.071.057.155.008.252-.048.098-.073.159-.145.243-.072.085-.152.189-.217.255-.072.072-.147.15-.063.294.084.144.373.615.8 1.002.551.498 1.014.653 1.158.725.144.072.228.06.313-.037.085-.097.362-.423.458-.568.097-.145.193-.12.325-.072.133.048.843.398.988.47.144.072.241.108.277.169.036.06.036.353-.108.758z" />
        </svg>
      ),
      hoverClasses: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]',
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      ariaLabel: 'Share on X (Twitter)',
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      hoverClasses: 'hover:bg-black hover:text-white hover:border-black',
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      ariaLabel: 'Share on LinkedIn',
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      hoverClasses: 'hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]',
    },
  ]

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
      } else {
        // Fallback for non-https or older environments
        const textArea = document.createElement('textarea')
        textArea.value = url
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className="text-xs font-semibold text-content-muted flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{t('blog.shareArticle')}</span>
      </span>

      <div className="flex items-center gap-2">
        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
            copied
              ? 'bg-feedback-success text-white border-feedback-success'
              : 'bg-white text-content-body border-surface-border hover:bg-surface-soft hover:text-brand-600'
          }`}
          aria-label={t('blog.copyLink')}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('blog.linkCopied')}</span>
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('blog.copyLink')}</span>
            </>
          )}
        </button>

        {/* Social Share Links */}
        {shareLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-8 h-8 rounded-full border border-surface-border bg-white text-content-body flex items-center justify-center transition-all ${item.hoverClasses}`}
            aria-label={item.ariaLabel}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  )
}
