import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DiamondButton from "../components/DiamondButton";

export default function Location() {
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state?.name || "";
  const [city, setCity] = useState(location.state?.city || "");
  const [status, setStatus] = useState("typing");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !city.trim()) return;

    setStatus("loading");

    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            location: city.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit information.");
      }

      setStatus("complete");
    } catch (error) {
      console.error("Phase One API Error:", error);
      setStatus("typing");
      alert("Something went wrong. Please try again.");
    }
  }; 

  const handleProceed = () => {
    navigate("/image-selection", {
      state: {
        name,
        city: city.trim(),
      },
    });
  };

  const handleBack = () => {
    if (status !== "typing") {
      setStatus("typing");
      return;
    }

    navigate("/introduction", {
      state: { name, city },
    });
  };

  return (
    <main className="relative flex h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden bg-white">
      <p className="absolute top-4 left-8 text-xs font-semibold text-[#1A1B1C]">
        TO START ANALYSIS
      </p>

      <div className="relative flex h-[390px] w-[390px] items-center justify-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="absolute h-[350px] w-[350px] border border-dotted border-[#D1D1D1] animate-[diamondSpin_23s_linear_infinite]" />

          <div className="absolute h-[390px] w-[390px] border border-dotted border-[#D1D1D1] animate-[diamondSpin_37s_linear_infinite_reverse]" />
        </div>

        {status === "typing" && (
          <form
            onSubmit={handleSubmit}
            className="relative z-10 flex flex-col items-center"
          >
            <p className="mb-1 text-[10px] text-[#A0A0A0]">CLICK TO TYPE</p>

            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Where are you from?"
              aria-label="Your city"
              autoComplete="address-level2"
              className="w-[320px] max-w-[85vw] border-b border-[#1A1B1C] bg-transparent text-center text-[clamp(1.5rem,3vw,2rem)] font-normal tracking-[-0.05em] text-[#1A1B1C] placeholder:text-[#1A1B1C] focus:text-[#A0A0A0] focus:placeholder:text-[#A0A0A0] focus:border-[#A0A0A0] outline-none transition-colors duration-300"
            />

            {city.trim() && (
              <button
                type="submit"
                className="mt-5 cursor-pointer text-xs font-semibold text-[#1A1B1C]"
              >
                CONTINUE
              </button>
            )}
          </form>
        )}

        {status === "loading" && (
          <div
            role="status"
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <h2 className="text-lg text-[#606B7D]">Processing submission</h2>

            <div className="flex gap-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#A0A0A0]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#A0A0A0] [animation-delay:200ms]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#A0A0A0] [animation-delay:400ms]" />
            </div>
          </div>
        )}

        {status === "complete" && (
          <div
            role="status"
            className="relative z-10 flex flex-col items-center gap-4"
          >
            <h2 className="text-2xl text-[#1A1B1C]">Thank you!</h2>

            <p className="text-lg text-[#606B7D]">Proceed for the next step</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-8">
        <DiamondButton direction="left" label="BACK" onClick={handleBack} />
      </div>

      {status === "complete" && (
        <div className="absolute right-8 bottom-8">
          <DiamondButton
            direction="right"
            label="PROCEED"
            onClick={handleProceed}
          />
        </div>
      )}
    </main>
  );
}
