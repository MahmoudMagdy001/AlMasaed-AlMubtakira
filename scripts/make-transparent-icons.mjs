import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

async function makeTransparentIcons() {
  const assetsDir = path.resolve('src/assets')
  const crInput = path.join(assetsDir, '1.webp')
  const naInput = path.join(assetsDir, '2.jpg')

  if (!fs.existsSync(crInput) || !fs.existsSync(naInput)) {
    console.error('Source icon files 1.webp or 2.jpg not found in src/assets')
    return
  }

  // 1. Commercial Registration - Ministry of Commerce Shield Emblem (1.webp)
  // Extracts the official green emblem (palm & swords) cleanly without cut-off text
  const rawCr = await sharp(crInput)
    .extract({ left: 392, top: 192, width: 392, height: 372 })
    .toBuffer()

  const { data: crData, info: crInfo } = await sharp(rawCr).raw().toBuffer({ resolveWithObject: true })
  const crRgba = Buffer.alloc(crInfo.width * crInfo.height * 4)

  for (let i = 0, j = 0; i < crData.length; i += 3, j += 4) {
    const r = crData[i]
    const g = crData[i + 1]
    const b = crData[i + 2]
    if (r > 240 && g > 240 && b > 240) {
      crRgba[j] = 255
      crRgba[j + 1] = 255
      crRgba[j + 2] = 255
      crRgba[j + 3] = 0
    } else {
      crRgba[j] = r
      crRgba[j + 1] = g
      crRgba[j + 2] = b
      crRgba[j + 3] = 255
    }
  }

  // Centered in a square canvas with balanced breathing room for circular badges
  const crMax = Math.max(crInfo.width, crInfo.height)
  const crCanvas = Math.round(crMax * 1.32)
  const crPadY = Math.round((crCanvas - crInfo.height) / 2)
  const crPadX = Math.round((crCanvas - crInfo.width) / 2)

  await sharp(crRgba, { raw: { width: crInfo.width, height: crInfo.height, channels: 4 } })
    .extend({ top: crPadY, bottom: crPadY, left: crPadX, right: crPadX, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize(512, 512)
    .png()
    .toFile(path.join(assetsDir, 'cr-badge-transparent.png'))

  await sharp(path.join(assetsDir, 'cr-badge-transparent.png'))
    .webp({ quality: 95 })
    .toFile(path.join(assetsDir, 'cr-badge-transparent.webp'))

  console.log('[PASS] Generated cr-badge-transparent.png and .webp')

  // 2. National Address - Saudi Post SPL Location Pin (2.jpg)
  // Extracts the official colorful pin symbol cleanly from top to bottom tip
  const rawNa = await sharp(naInput)
    .extract({ left: 112, top: 25, width: 216, height: 277 })
    .toBuffer()

  const { data: naData, info: naInfo } = await sharp(rawNa).raw().toBuffer({ resolveWithObject: true })
  const naRgba = Buffer.alloc(naInfo.width * naInfo.height * 4)

  for (let i = 0, j = 0; i < naData.length; i += 3, j += 4) {
    const r = naData[i]
    const g = naData[i + 1]
    const b = naData[i + 2]
    if (r > 240 && g > 240 && b > 240) {
      naRgba[j] = 255
      naRgba[j + 1] = 255
      naRgba[j + 2] = 255
      naRgba[j + 3] = 0
    } else {
      naRgba[j] = r
      naRgba[j + 1] = g
      naRgba[j + 2] = b
      naRgba[j + 3] = 255
    }
  }

  const naMax = Math.max(naInfo.width, naInfo.height)
  const naCanvas = Math.round(naMax * 1.32)
  const naPadY = Math.round((naCanvas - naInfo.height) / 2)
  const naPadX = Math.round((naCanvas - naInfo.width) / 2)

  await sharp(naRgba, { raw: { width: naInfo.width, height: naInfo.height, channels: 4 } })
    .extend({ top: naPadY, bottom: naPadY, left: naPadX, right: naPadX, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize(512, 512)
    .png()
    .toFile(path.join(assetsDir, 'national-address-transparent.png'))

  await sharp(path.join(assetsDir, 'national-address-transparent.png'))
    .webp({ quality: 95 })
    .toFile(path.join(assetsDir, 'national-address-transparent.webp'))

  console.log('[PASS] Generated national-address-transparent.png and .webp')
}

makeTransparentIcons().catch((err) => {
  console.error('[FAIL] Error processing transparent icons:', err)
  process.exit(1)
})
