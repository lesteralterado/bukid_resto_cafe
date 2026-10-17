// Helpers that turn a stored image/video URL into a right-sized, compressed variant.
// Cloudinary URLs get transforms inserted after `/upload/`; Unsplash URLs get query params.

const isCloudinary = (url: string) => url.includes('res.cloudinary.com') && url.includes('/upload/');
const isUnsplash = (url: string) => url.includes('images.unsplash.com');

export function cld(url: string, transforms: string) {
  if (!isCloudinary(url)) return url;
  return url.replace('/upload/', `/upload/${transforms}/`);
}

type SizeOptions = { width: number; aspect?: string; quality?: string };

export function sizedImage(url: string, { width, aspect = '4:3', quality = 'auto' }: SizeOptions) {
  if (isCloudinary(url)) {
    return cld(url, `f_auto,q_${quality},c_fill,g_auto,ar_${aspect},w_${width}`);
  }
  if (isUnsplash(url)) {
    const [w, h] = aspect.split(':').map(Number);
    const base = url.split('?')[0];
    return `${base}?auto=format&fit=crop&w=${width}&h=${Math.round((width * h) / w)}&q=70`;
  }
  return url;
}

export function imageSrcSet(url: string, widths: number[], aspect = '4:3') {
  if (!isCloudinary(url) && !isUnsplash(url)) return undefined;
  return widths.map((w) => `${sizedImage(url, { width: w, aspect })} ${w}w`).join(', ');
}

export function blurPlaceholder(url: string, aspect = '4:3') {
  if (isCloudinary(url)) return cld(url, `f_auto,q_10,c_fill,ar_${aspect},w_32,e_blur:400`);
  if (isUnsplash(url)) return sizedImage(url, { width: 24, aspect }).replace('q=70', 'q=20&blur=40');
  return undefined;
}

export function videoSource(url: string, width: number, codec: 'vp9' | 'h264') {
  const ext = codec === 'vp9' ? 'webm' : 'mp4';
  return cld(url, `q_auto:eco,vc_${codec},w_${width}`).replace(/\.\w+$/, `.${ext}`);
}

export function videoPoster(url: string, width: number) {
  return cld(url, `so_0,f_auto,q_auto,w_${width}`).replace(/\.\w+$/, '.jpg');
}
