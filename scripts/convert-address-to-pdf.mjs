import fs from 'node:fs'
import path from 'node:path'

const imgPath = path.resolve('src/assets/adress.jpeg')
const outPath = path.resolve('public/documents/national-address.pdf')

const imgBuf = fs.readFileSync(imgPath)
// Image dimensions from metadata
const imgWidth = 1600
const imgHeight = 1129

// Standard A4 landscape dimensions in PDF points (72 points per inch)
// 841.89 pt x 595.28 pt
const pageWidth = 841.89
const pageHeight = 595.28

// Calculate fitting with small margin
const margin = 20
const maxWidth = pageWidth - margin * 2
const maxHeight = pageHeight - margin * 2

const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight)
const renderW = imgWidth * scale
const renderH = imgHeight * scale
const posX = (pageWidth - renderW) / 2
const posY = (pageHeight - renderH) / 2

const contentStream = `q ${renderW.toFixed(2)} 0 0 ${renderH.toFixed(2)} ${posX.toFixed(2)} ${posY.toFixed(2)} cm /Im0 Do Q`

const chunks = []
const offsets = [0]

function addChunk(str) {
  chunks.push(Buffer.from(str, 'latin1'))
}

function writeObject(id, dictStr, streamBuf = null) {
  offsets[id] = chunks.reduce((acc, c) => acc + c.length, 0)
  addChunk(`${id} 0 obj\n${dictStr}\n`)
  if (streamBuf) {
    addChunk(`stream\n`)
    chunks.push(streamBuf)
    addChunk(`\nendstream\n`)
  }
  addChunk(`endobj\n`)
}

// PDF Header
addChunk(`%PDF-1.4\n%\xe2\xe3\xcf\xd3\n`)

// 1: Catalog
writeObject(1, `<< /Type /Catalog /Pages 2 0 R >>`)

// 2: Pages
writeObject(2, `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`)

// 3: Page
writeObject(
  3,
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] /Contents 4 0 R /Resources << /XObject << /Im0 5 0 R >> >> >>`,
)

// 4: Contents Stream
writeObject(
  4,
  `<< /Length ${contentStream.length} >>`,
  Buffer.from(contentStream, 'latin1'),
)

// 5: Image XObject (JPEG wrapped in DCTDecode)
writeObject(
  5,
  `<< /Type /XObject /Subtype /Image /Width ${imgWidth} /Height ${imgHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgBuf.length} >>`,
  imgBuf,
)

// XRef table
const xrefOffset = chunks.reduce((acc, c) => acc + c.length, 0)
let xref = `xref\n0 6\n0000000000 65535 f \n`
for (let i = 1; i <= 5; i++) {
  xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
}
xref += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`
addChunk(xref)

const finalPdf = Buffer.concat(chunks)

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, finalPdf)

// Also copy to dist if dist exists
const distOutPath = path.resolve('dist/documents/national-address.pdf')
if (fs.existsSync('dist')) {
  fs.mkdirSync(path.dirname(distOutPath), { recursive: true })
  fs.writeFileSync(distOutPath, finalPdf)
}

console.log(`[PASS] Created PDF: ${outPath} (${finalPdf.length} bytes)`)
