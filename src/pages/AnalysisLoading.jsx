import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DiamondButton from "../components/DiamondButton";
import { analyzeImage } from "../services/skinstricApi";

export default function AnalysisLoading() {
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state?.name || "";
  const city = location.state?.city || "";
  const imageFile = location.state?.imageFile;

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!imageFile) return;

    const url = URL.createObjectURL(imageFile);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  useEffect(() => {
    if (!imageFile) return;

    let cancelled = false;

    async function runAnalysis() {
      try {
        const results = await analyzeImage(imageFile);

        if (cancelled) return;

        alert("Image analyzed successfully!");

        navigate("/analysis", {
          replace: true,
          state: {
            name,
            city,
            analysisData: results,
          },
        });
      } catch (error) {
        if (cancelled) return;

        console.error("Phase Two Error:", error);
        alert(error.message || "Image analysis failed.");
      }
    }

    runAnalysis();

    return () => {
      cancelled = true;
    };
  }, [imageFile, name, city, navigate]);

  return (
    <main className="relative flex h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden bg-white">
      <p className="absolute top-4 left-8 text-xs font-semibold text-[#1A1B1C]">
        TO START ANALYSIS
      </p>

      <div className="absolute top-4 right-8 z-20 flex flex-col gap-2">
        <p className="text-xs text-[#1A1B1C]">Preview</p>

        <div className="flex h-[100px] w-[100px] items-center justify-center border border-[#D1D1D1]">
          {preview && (
            <img
              src={preview}
              alt="Uploaded preview"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      <div className="relative flex h-[390px] w-[390px] items-center justify-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="diamond-outline diamond-outline-one" />
          <div className="diamond-outline diamond-outline-two" />
        </div>

        <div
          role="status"
          className="relative z-10 flex flex-col items-center gap-6"
        >
          <h1 className="text-center text-sm font-semibold text-[#1A1B1C]">
            PREPARING YOUR ANALYSIS...
          </h1>

          <div className="flex gap-4">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#A0A0A0]" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#A0A0A0] [animation-delay:200ms]" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#A0A0A0] [animation-delay:400ms]" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8">
        <DiamondButton
          direction="left"
          label="BACK"
          onClick={() =>
            navigate("/image-selection", {
              state: { name, city },
            })
          }
        />
      </div>
    </main>
  );
}
