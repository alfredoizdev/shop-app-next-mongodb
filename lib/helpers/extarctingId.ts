export function extractPublicIdFromUrl(url: string): string | null {
  try {
    const parts = new URL(url).pathname.split('/')
    const uploadIndex = parts.indexOf('upload')

    if (uploadIndex === -1 || uploadIndex + 1 >= parts.length) return null

    let publicIdParts = parts.slice(uploadIndex + 1)
    if (/^v\d+$/.test(publicIdParts[0])) publicIdParts = publicIdParts.slice(1)

    const lastPart = publicIdParts.pop()
    if (!lastPart) return null

    const lastPartNoExt = lastPart.split('.')[0]
    return [...publicIdParts, lastPartNoExt].join('/')
  } catch {
    return null
  }
}
