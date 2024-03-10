import sharp from "sharp";
import path from "path";

interface resizeImageParams {
  originalPath: string;
  width: number;
  height: number;
}

export async function resizeImage({
  originalPath,
  width,
  height,
}: resizeImageParams) {
  const { dir, name, ext } = path.parse(originalPath);

  const resizedFileName = `${width}x${height}_${name}${ext}`;
  const resizedPath = path.join(dir, resizedFileName);

  try {
    await sharp(originalPath)
      .resize({
        width,
        height,
      })
      .toFile(resizedPath);
  } catch (e) {
    console.error(e);
  }
}
