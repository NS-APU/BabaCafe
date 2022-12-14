/**
 * 画像ファイルなどを Base64 にエンコードする
 * @param file 画像ファイルなど
 * @example const encoded = await encodeFileToBase64(file)
 */
export async function encodeFileToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      resolve(e.target.result as string);
    };
  });
}
