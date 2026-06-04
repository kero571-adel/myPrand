export function img(src: string, width: number, quality = 80): string {
  return `/_vercel/image?url=${encodeURIComponent(
    src
  )}&w=${width}&q=${quality}`;
}
