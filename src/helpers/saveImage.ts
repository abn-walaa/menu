import {join} from "path";
import  sharp from "sharp";

// Define the `save` function
export const save=async function (filename: string, img: ArrayBuffer): Promise<void> {
  try {
    await sharp(img)
      .png({ compressionLevel: 8, quality: 80 })
      .toFile(join(__dirname, "..", "..", "public", "imgs", filename));
  } catch (err) {
    console.error(err);
  }
}


