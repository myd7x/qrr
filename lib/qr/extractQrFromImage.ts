import jsQR from "jsqr";

export async function extractQrFromImage(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve(null);
        return;
      }

      // 🔹 Scale down large images
      const MAX_SIZE = 1000;
      let { width, height } = img;

      if (width > MAX_SIZE || height > MAX_SIZE) {
        const scale = Math.min(MAX_SIZE / width, MAX_SIZE / height);
        width = Math.floor(width * scale);
        height = Math.floor(height * scale);
      }

      canvas.width = width;
      canvas.height = height;

      // ✅ FORCE WHITE BACKGROUND (VERY IMPORTANT)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // ✅ PREPROCESS: grayscale + threshold
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Grayscale
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;

        // Threshold (adjustable)
        const value = gray > 140 ? 255 : 0;

        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
      }

      const qr = jsQR(
        imageData.data,
        imageData.width,
        imageData.height,
        {
          inversionAttempts: "attemptBoth",
        }
      );

      URL.revokeObjectURL(img.src);
      resolve(qr?.data ?? null);
    };

    img.onerror = () => resolve(null);
  });
}
