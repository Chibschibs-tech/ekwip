/**
 * Convert a File object to a base64 string
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

/**
 * Resize an image file to a maximum width/height while maintaining aspect ratio
 */
export async function resizeImage(file: File, maxWidth = 800, maxHeight = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        const canvas = document.createElement("canvas")
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL(file.type))
      }
      img.onerror = reject
    }
    reader.onerror = reject
  })
}

/**
 * Create a thumbnail from an image file
 */
export async function createThumbnail(file: File, size = 200): Promise<string> {
  return resizeImage(file, size, size)
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: "Type de fichier non supporté. Utilisez JPG, PNG, WebP ou GIF." }
  }

  if (file.size > maxSize) {
    return { valid: false, error: "Le fichier est trop volumineux. Taille maximum: 5MB." }
  }

  return { valid: true }
}
