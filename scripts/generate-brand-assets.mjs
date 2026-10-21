import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LOGO_DIR = path.resolve(__dirname, '../docs/assets/logo')
const BRAND_OUT_DIR = path.resolve(__dirname, '../src/assets/brand')
const PUBLIC_DIR = path.resolve(__dirname, '../public')

async function main() {
  fs.mkdirSync(BRAND_OUT_DIR, { recursive: true })
  fs.mkdirSync(PUBLIC_DIR, { recursive: true })

  const whiteHorizontalSource = path.join(
    LOGO_DIR,
    'Al Masaed Al Mubtakirah-17.png',
  )
  const whiteVerticalSource = path.join(
    LOGO_DIR,
    'Al Masaed Al Mubtakirah-05.png',
  )
  const darkHorizontalSource = path.join(
    LOGO_DIR,
    'Al Masaed Al Mubtakirah-20.png',
  )
  const darkVerticalSource = path.join(
    LOGO_DIR,
    'Al Masaed Al Mubtakirah-08.png',
  )

  // 1. Optimized brand assets in src/assets/brand
  // White horizontal
  await sharp(whiteHorizontalSource)
    .trim()
    .webp({ quality: 90 })
    .toFile(path.join(BRAND_OUT_DIR, 'logo-white-horizontal.webp'))
  await sharp(whiteHorizontalSource)
    .trim()
    .png({ compressionLevel: 9 })
    .toFile(path.join(BRAND_OUT_DIR, 'logo-white-horizontal.png'))

  // Header sizes (160px and 320px)
  await sharp(whiteHorizontalSource)
    .trim()
    .resize({ width: 160 })
    .webp({ quality: 90 })
    .toFile(path.join(BRAND_OUT_DIR, 'logo-white-header.webp'))
  await sharp(whiteHorizontalSource)
    .trim()
    .resize({ width: 320 })
    .webp({ quality: 90 })
    .toFile(path.join(BRAND_OUT_DIR, 'logo-white-header@2x.webp'))

  // Footer sizes (220px and 440px)
  await sharp(whiteHorizontalSource)
    .trim()
    .resize({ width: 220 })
    .webp({ quality: 90 })
    .toFile(path.join(BRAND_OUT_DIR, 'logo-white-footer.webp'))
  await sharp(whiteHorizontalSource)
    .trim()
    .resize({ width: 440 })
    .webp({ quality: 90 })
    .toFile(path.join(BRAND_OUT_DIR, 'logo-white-footer@2x.webp'))

  // White square
  await sharp(whiteVerticalSource)
    .trim()
    .webp({ quality: 90 })
    .toFile(path.join(BRAND_OUT_DIR, 'logo-white-square.webp'))
  await sharp(whiteVerticalSource)
    .trim()
    .png({ compressionLevel: 9 })
    .toFile(path.join(BRAND_OUT_DIR, 'logo-white-square.png'))

  // Dark horizontal (for light areas like admin or emails)
  if (fs.existsSync(darkHorizontalSource)) {
    await sharp(darkHorizontalSource)
      .trim()
      .webp({ quality: 90 })
      .toFile(path.join(BRAND_OUT_DIR, 'logo-dark-horizontal.webp'))
    await sharp(darkHorizontalSource)
      .trim()
      .png({ compressionLevel: 9 })
      .toFile(path.join(BRAND_OUT_DIR, 'logo-dark-horizontal.png'))
  }

  // Dark square
  if (fs.existsSync(darkVerticalSource)) {
    await sharp(darkVerticalSource)
      .trim()
      .webp({ quality: 90 })
      .toFile(path.join(BRAND_OUT_DIR, 'logo-dark-square.webp'))
    await sharp(darkVerticalSource)
      .trim()
      .png({ compressionLevel: 9 })
      .toFile(path.join(BRAND_OUT_DIR, 'logo-dark-square.png'))
  }

  // 2. Favicons in public/
  async function generateAppIcon(size, cornerRadius = 0) {
    const trimmedWhite = await sharp(whiteVerticalSource)
      .trim()
      .resize({
        width: Math.round(size * 0.7),
        height: Math.round(size * 0.7),
        fit: 'inside',
      })
      .toBuffer()

    const roundedRectSvg = Buffer.from(`
      <svg width="${size}" height="${size}">
        <rect x="0" y="0" width="${size}" height="${size}" rx="${cornerRadius}" ry="${cornerRadius}" fill="#132454" />
      </svg>
    `)

    return sharp(roundedRectSvg)
      .composite([{ input: trimmedWhite, gravity: 'center' }])
      .png()
  }

  // 512x512
  await (
    await generateAppIcon(512, 96)
  ).toFile(path.join(PUBLIC_DIR, 'icon-512.png'))
  // 192x192
  await (
    await generateAppIcon(192, 36)
  ).toFile(path.join(PUBLIC_DIR, 'icon-192.png'))
  // apple-touch-icon 180x180
  await (
    await generateAppIcon(180, 32)
  ).toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'))
  // favicon 32x32
  await (
    await generateAppIcon(32, 6)
  ).toFile(path.join(PUBLIC_DIR, 'favicon-32.png'))
  // favicon.ico
  await (
    await generateAppIcon(32, 6)
  ).toFile(path.join(PUBLIC_DIR, 'favicon.ico'))

  // SVG favicon
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#132454"/>
  <path d="M50 20 L75 60 L60 60 L50 42 L40 60 L25 60 Z" fill="#5ec1f0"/>
  <path d="M50 35 L68 68 L58 68 L50 54 L42 68 L32 68 Z" fill="#ffffff"/>
  <rect x="44" y="72" width="12" height="10" rx="2" fill="#336ea6"/>
</svg>`
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon.svg'), svgFavicon, 'utf8')

  // 3. OG default image 1200x630
  const ogLogo = await sharp(whiteHorizontalSource)
    .trim()
    .resize({ width: 700, fit: 'inside' })
    .toBuffer()

  const sloganSvg = Buffer.from(`
    <svg width="1200" height="150" viewBox="0 0 1200 150">
      <style>
        .slogan { font-family: 'Tajawal', sans-serif; font-size: 38px; font-weight: 500; fill: #5ec1f0; text-anchor: middle; direction: rtl; }
        .sub { font-family: 'Tajawal', sans-serif; font-size: 22px; font-weight: 400; fill: #e1ecf8; text-anchor: middle; direction: rtl; }
      </style>
      <text x="600" y="55" class="slogan">ابتكار يرتفع بك</text>
      <text x="600" y="105" class="sub">صيانة · تحديث · تركيب · قطع غيار — جدة</text>
    </svg>
  `)

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 19, g: 36, b: 84, alpha: 1 },
    },
  })
    .composite([
      { input: ogLogo, top: 160, left: 250 },
      { input: sloganSvg, top: 380, left: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile(path.join(PUBLIC_DIR, 'og-default.jpg'))

  // 4. site.webmanifest
  const manifest = {
    name: 'شركة المصاعد المبتكرة',
    short_name: 'المصاعد المبتكرة',
    description: 'توريد وتركيب وصيانة وتحديث المصاعد في جدة',
    start_url: '/',
    display: 'standalone',
    background_color: '#132454',
    theme_color: '#132454',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2),
    'utf8',
  )

  console.log('Brand assets and favicons successfully generated.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
