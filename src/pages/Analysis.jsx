import { useLocation, useNavigate } from "react-router-dom";
import DiamondButton from "../components/DiamondButton";

export default function Analysis() {
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state?.name || "";
  const city = location.state?.city || "";
  const analysisData = location.state?.analysisData;

  return (
    <main className="relative flex h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden bg-white">
      <div className="absolute top-4 left-8 text-xs text-[#1A1B1C]">
        <h2 className="mb-3 font-semibold">A.I. ANALYSIS</h2>

        <p>A.I. HAS ESTIMATED THE FOLLOWING.</p>
        <p>FIX ESTIMATED INFORMATION IF NEEDED.</p>
      </div>

      <div className="group relative flex items-center justify-center">
        <div className="pointer-events-none absolute h-[390px] w-[390px] rotate-45 scale-75 border border-dotted border-[#A0A0A0] opacity-0 transition-[scale,opacity] duration-700 ease-out group-hover:scale-100 group-hover:opacity-100" />

        <div className="grid h-[300px] w-[300px] rotate-45 grid-cols-2 grid-rows-2 gap-1 sm:h-[340px] sm:w-[340px]">
          <button
            type="button"
            onClick={() =>
              navigate("/demographics", {
                state: {
                  name,
                  city,
                  analysisData,
                },
              })
            }
            className="flex cursor-pointer items-center justify-center bg-[#E1E3E6] p-4 transition-colors duration-300 hover:bg-[#B8BCC3]"
          >
            <span className="-rotate-45 text-center text-[11px] font-semibold">
              DEMOGRAPHICS
            </span>
          </button>

          <button
            type="button"
            className="flex cursor-not-allowed items-center justify-center bg-[#F1F1F3] p-4 transition-colors duration-300 hover:bg-[#D1D4DA]"
          >
            <span className="-rotate-45 text-center text-[11px] font-semibold">
              SKIN TYPE
              <br />
              DETAILS
            </span>
          </button>

          <button
            type="button"
            className="flex cursor-not-allowed items-center justify-center bg-[#F1F1F3] p-4 transition-colors duration-300 hover:bg-[#D1D4DA]"
          >
            <span className="-rotate-45 text-center text-[11px] font-semibold">
              COSMETIC
              <br />
              CONCERNS
            </span>
          </button>

          <button
            type="button"
            className="flex cursor-not-allowed items-center justify-center bg-[#F1F1F3] p-4 transition-colors duration-300 hover:bg-[#D1D4DA]"
          >
            <span className="-rotate-45 text-center text-[11px] font-semibold">
              WEATHER
            </span>
          </button>
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

      <div className="absolute right-8 bottom-8">
        <DiamondButton direction="right" label="GET SUMMARY" />
      </div>
    </main>
  );
}
