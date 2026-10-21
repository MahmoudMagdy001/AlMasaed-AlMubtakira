/**
 * Recursively strips null, undefined, empty string, and empty object/array properties
 * from a JSON-LD payload to ensure clean schema compliance.
 */
export function cleanJsonLd<T>(data: T): T | null {
  if (data === null || data === undefined) return null

  if (Array.isArray(data)) {
    const cleanedArr = data
      .map((item) => cleanJsonLd(item))
      .filter((item) => item !== null && item !== undefined && item !== '')
    return cleanedArr.length > 0 ? (cleanedArr as unknown as T) : null
  }

  if (typeof data === 'object') {
    const cleanedObj: Record<string, unknown> = {}
    let hasKeys = false

    for (const [key, val] of Object.entries(data as Record<string, unknown>)) {
      const cleanedVal = cleanJsonLd(val)
      if (cleanedVal !== null && cleanedVal !== undefined && cleanedVal !== '') {
        cleanedObj[key] = cleanedVal
        hasKeys = true
      }
    }

    return hasKeys ? (cleanedObj as unknown as T) : null
  }

  if (typeof data === 'string') {
    const trimmed = data.trim()
    return trimmed.length > 0 ? (trimmed as unknown as T) : null
  }

  return data
}
