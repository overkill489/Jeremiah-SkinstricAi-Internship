import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DiamondButton from "../components/DiamondButton";

export default function Introduction() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState(location.state?.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    navigate("/location", {
      state: { name: name.trim() },
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

        <form
          onSubmit={handleSubmit}
          className="relative z-10 flex flex-col items-center"
        >
          <p className="mb-1 text-[10px] text-[#A0A0A0]">CLICK TO TYPE</p>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Introduce Yourself"
            aria-label="Your name"
            autoComplete="name"
            className="w-[300px] border-b border-[#1A1B1C] bg-transparent text-center text-[clamp(1.5rem,3vw,2rem)] font-normal tracking-[-0.05em] text-[#1A1B1C] placeholder:text-[#1A1B1C] focus:text-[#A0A0A0] focus:placeholder:text-[#A0A0A0] focus:border-[#A0A0A0] outline-none transition-colors duration-300"
          />
        </form>
      </div>

      <div className="absolute bottom-8 left-8">
        <DiamondButton
          direction="left"
          label="BACK"
          onClick={() => navigate("/")}
        />
      </div>
    </main>
  );
}
