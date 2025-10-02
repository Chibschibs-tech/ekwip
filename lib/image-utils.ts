/**
 * Convertit un fichier File en URL base64
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
 * Convertit plusieurs fichiers en URLs base64
 */
export async function filesToBase64(files: File[]): Promise<string[]> {
  return Promise.all(files.map((file) => fileToBase64(file)))
}

/**
 * Valide si une image est valide
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false
  return url.startsWith("data:image/") || url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")
}

/**
 * Redimensionne une image pour optimiser le stockage
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

        resolve(canvas.toDataURL("image/jpeg", 0.8))
      }

      img.onerror = reject
    }
    reader.onerror = reject
  })
}
