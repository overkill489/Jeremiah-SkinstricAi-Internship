import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiamondButton from "../components/DiamondButton";

export default function LandingPage() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <main className="relative w-full overflow-hidden bg-white">
      <div className="relative hidden h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden md:flex">
        <div
          className={`pointer-events-none absolute top-1/2 left-0 h-[450px] w-[450px] -translate-x-[65%] -translate-y-1/2 rotate-45 border border-dotted border-[#A0A0A0] transition-opacity duration-500 ${
            hovered === "right" ? "opacity-0" : "opacity-100"
          }`}
        />

        <div
          className={`pointer-events-none absolute top-1/2 right-0 h-[450px] w-[450px] translate-x-[65%] -translate-y-1/2 rotate-45 border border-dotted border-[#A0A0A0] transition-opacity duration-500 ${
            hovered === "left" ? "opacity-0" : "opacity-100"
          }`}
        />

        <h1
          className={`relative z-10 text-center text-[clamp(3rem,6vw,6rem)] leading-[1.05] font-normal tracking-[-0.05em] text-[#1A1B1C] transition-transform duration-700 ease-in-out ${
            hovered === "left"
              ? "translate-x-[55%]"
              : hovered === "right"
                ? "-translate-x-[55%]"
                : "translate-x-0"
          }`}
        >
          Sophisticated
          <br />
          skincare
        </h1>

        <div
          onMouseEnter={() => setHovered("left")}
          onMouseLeave={() => setHovered(null)}
          className={`absolute top-1/2 left-16 z-20 -translate-y-1/2 transition-opacity duration-500 ${
            hovered === "right"
              ? "pointer-events-none opacity-0"
              : "opacity-100"
          }`}
        >
          <DiamondButton direction="left" label="DISCOVER A.I." />
        </div>

        <div
          onMouseEnter={() => setHovered("right")}
          onMouseLeave={() => setHovered(null)}
          className={`absolute top-1/2 right-16 z-20 -translate-y-1/2 transition-opacity duration-500 ${
            hovered === "left" ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <DiamondButton
            onClick={() => navigate("/introduction")}
            direction="right"
            label="TAKE TEST"
          />
        </div>

        <p className="absolute bottom-8 left-10 max-w-[320px] text-xs leading-[1.5] text-[#1A1B1C]">
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE
          TAILORED TO WHAT YOUR SKIN NEEDS.
        </p>
      </div>

      <div className="relative flex min-h-[calc(100dvh-64px)] w-full flex-col items-center justify-center overflow-hidden bg-white px-4 md:hidden">
        <div className="relative flex aspect-square w-[min(94vw,430px)] items-center justify-center">
          <div className="pointer-events-none absolute h-[110%] w-[110%] rotate-45 border border-[#D1D1D1]" />

          <div className="pointer-events-none absolute h-[88%] w-[88%] rotate-45 border border-[#D1D1D1]" />

          <div className="relative z-10 flex w-full flex-col items-center justify-center text-center">
            <h1 className="text-[clamp(2.2rem,8.5vw,3.25rem)] leading-[1.05] font-normal tracking-[-0.06em] text-[#1A1B1C]">
              Sophisticated
              <br />
              skincare
            </h1>

            <p className="mt-5 max-w-[260px] text-xs font-medium leading-[1.6] text-[#8A8A8A]">
              Skinstric developed an A.I. that creates a highly-personalized
              routine tailored to what your skin needs.
            </p>

            <button
              type="button"
              onClick={() => navigate("/introduction")}
              className="mt-5 flex cursor-pointer items-center gap-4 text-[11px] font-semibold text-[#1A1B1C]"
            >
              ENTER EXPERIENCE
              <span className="flex h-7 w-7 rotate-45 items-center justify-center border border-[#1A1B1C]">
                <span className="-rotate-45 h-0 w-0 border-t-[5px] border-b-[5px] border-l-[8px] border-t-transparent border-b-transparent border-l-[#1A1B1C]" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
