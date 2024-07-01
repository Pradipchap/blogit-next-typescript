import sharp from "sharp";
interface props {
  image: File;
  type: "jpeg";
}
async function optimizeImage(image: File) {
  try {
    const x = await image.arrayBuffer();
    const buffer = Buffer.from(x);
    const optimizedImage = await sharp(buffer)
      .jpeg({ mozjpeg: true })
      .resize({ width: 500, height: 400 })
      .toBuffer()
      .then((data) => {
        const imageData = data.toString("base64");
        const dataURL = `data:image/jpeg;base64,${imageData}`;
        return dataURL;
      });
    return optimizedImage;
  } catch (error) {
    throw new Error("Error optimizing image");
  }
}
export default optimizeImage;

export async function optimizeProfileImage(image: File) {
  try {
    const x = await image.arrayBuffer();
    const buffer = Buffer.from(x);
    const optimizedImage = await sharp(buffer)
      .resize({ width: 100, height: 100 })
      .webp({ lossless: true })
      .toBuffer();
    return optimizedImage;
  } catch (error) {
    throw new Error("Error optimizing image");
  }
}
