// Upload gift card images and create giftCard documents in Sanity.
// Run from boulevard-horsens-admin: SANITY_AUTH_TOKEN=… node contentUploader/uploadGiftCards.mjs

import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {basename} from 'node:path'

const PROJECT_ID = '8nzg1eu4'
const DATASET = 'production'

const TOKEN = process.env.SANITY_AUTH_TOKEN
if (!TOKEN) {
  console.error('Missing SANITY_AUTH_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

const CARDS = [
  {
    filePath:
      'C:/Users/User/Downloads/Telegram Desktop/photo_1_2026-04-27_21-23-12.jpg',
    amount: 500,
    description: 'Perfekt til en mindre behandling',
    popular: false,
    primary: false,
    order: 0,
  },
  {
    filePath:
      'C:/Users/User/Downloads/Telegram Desktop/photo_2_2026-04-27_21-23-12.jpg',
    amount: 1000,
    description: 'Mest populære valg',
    popular: true,
    primary: true,
    order: 1,
  },
  {
    filePath:
      'C:/Users/User/Downloads/Telegram Desktop/photo_3_2026-04-27_21-23-12.jpg',
    amount: 1500,
    description: 'Til en luksusoplevelse',
    popular: false,
    primary: false,
    order: 2,
  },
]

async function uploadAsset(filePath) {
  const buf = readFileSync(filePath)
  const filename = basename(filePath)
  console.log(`Uploading ${filename} (${(buf.length / 1024).toFixed(0)} KB)…`)
  const asset = await client.assets.upload('image', buf, {filename})
  return asset._id
}

async function main() {
  for (const spec of CARDS) {
    const assetId = await uploadAsset(spec.filePath)
    const docId = `giftCard-${spec.amount}`
    const doc = {
      _id: docId,
      _type: 'giftCard',
      amount: spec.amount,
      description: spec.description,
      image: {
        _type: 'image',
        asset: {_type: 'reference', _ref: assetId},
        alt: `Gavekort ${spec.amount} kr`,
      },
      popular: spec.popular,
      primary: spec.primary,
      order: spec.order,
    }
    console.log(`createOrReplace ${docId}`)
    await client.createOrReplace(doc)
  }
  console.log('Done')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
