import React from 'react'

export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

import { cleanJsonLd } from './cleanJsonLd'

/**
 * Standard typed JSON-LD Script Component.
 * Injects `<script type="application/ld+json">` with cleaned, valid Schema.org structure.
 */
export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  const cleaned = cleanJsonLd(data)
  if (!cleaned) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleaned),
      }}
    />
  )
}
