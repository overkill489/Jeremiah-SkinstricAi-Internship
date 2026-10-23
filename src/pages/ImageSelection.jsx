import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DiamondButton from "../components/DiamondButton";
import cameraIcon from "../assets/camera-icon.png";
import galleryIcon from "../assets/gallery-icon.png";

function RotatingDiamonds() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="diamond-outline diamond-outline-one" />
      <div className="diamond-outline diamond-outline-two" />
    </div>
  );
}

export default function ImageSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const name = location.state?.name || "";
  const city = location.state?.city || "";

  const handleGalleryUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    navigate("/analysis-loading", {
      state: {
        name,
        city,
        imageFile: file,
      },
    });
  };

  const handleBack = () => {
    navigate("/location", {
      state: { name, city },
    });
  };

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center overflow-hidden bg-white">
      <p className="absolute top-4 left-8 text-xs font-semibold text-[#1A1B1C]">
        TO START ANALYSIS
      </p>

      <div className="flex w-full max-w-[1250px] flex-col items-center justify-around gap-16 px-4 py-20 lg:flex-row lg:gap-8">
        <div className="relative flex h-[350px] w-[350px] shrink-0 items-center justify-center image-selection-entrance animate-[enterFromLeft_1s_cubic-bezier(0.22,1,0.36,1)_both]">
          <RotatingDiamonds />

          <button
            type="button"
            aria-label="Allow AI to scan your face"
            className="relative z-10 h-[110px] w-[110px] cursor-pointer transition-transform duration-300 hover:scale-110"
          >
            <img
              src={cameraIcon}
              alt=""
              className="h-full w-full object-contain"
            />
          </button>

          <div className="pointer-events-none absolute top-[112px] left-[255px] z-20">
            <div className="absolute top-[9px] left-0 h-[54px] w-[1px] origin-top rotate-45 bg-[#606060]" />
            <div className="absolute top-[8px] -left-[2px] h-[4px] w-[4px] rounded-full border border-[#606060] bg-white" />

            <p className=" ml-1 w-[165px] text-xs leading-5 text-[#1A1B1C]">
              ALLOW A.I.
              <br />
              TO SCAN YOUR FACE
            </p>
          </div>
        </div>

        <div className="relative flex h-[350px] w-[350px] shrink-0 items-center justify-center image-selection-entrance animate-[enterFromRight_1s_cubic-bezier(0.22,1,0.36,1)_both]">
          <RotatingDiamonds />

          <button
            type="button"
            aria-label="Allow AI to access gallery"
            onClick={() => fileInputRef.current?.click()}
            className="relative z-10 h-[110px] w-[110px] cursor-pointer transition-transform duration-300 hover:scale-110"
          >
            <img
              src={galleryIcon}
              alt=""
              className="h-full w-full object-contain"
            />
          </button>

          <div className="pointer-events-none absolute top-[250px] left-[10px] z-20">
            <div className="absolute top-[40px] left-[166px] h-[70px] w-[1px] origin-top rotate-[180deg] bg-[#606060]" />

            <div className="absolute top-[40px] left-[164px] h-[4px] w-[4px] rounded-full border border-[#606060] bg-white" />

            <p className="pt-8 w-[150px] text-right text-xs leading-5 text-[#1A1B1C]">
              ALLOW A.I.
              <br />
              ACCESS GALLERY
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 z-20">
        <DiamondButton direction="left" label="BACK" onClick={handleBack} />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleGalleryUpload}
        className="hidden"
      />
    </main>
  );
}
