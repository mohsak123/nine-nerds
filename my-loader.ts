export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `https://res.cloudinary.com/demo/image/upload/${params.join(
    ','
  )}${src}`
}

// export default function cloudinaryLoader({
//   src,
//   width,
//   quality,
// }: {
//   src: string;
//   width: number;
//   quality?: number;
// }) {
//   const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];

//   const cleanSrc = src.replace(/^\/public/, '').replace(/^\//, '');

//   return `https://res.cloudinary.com/demo/image/upload/${params.join(',')}/images/${cleanSrc}`;
// }
