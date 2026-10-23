import { imageToBase64 } from "../utils/ImageToBase64";

export async function analyzeImage(file) {
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Please select a valid image.");
  }

  const base64 = await imageToBase64(file);

  const response = await fetch(
    "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64,
      }),
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Image analysis failed.");
  }

  if (!result.data?.race || !result.data?.age || !result.data?.gender) {
    throw new Error("Incomplete analysis results.");
  }

  return result.data;
}
