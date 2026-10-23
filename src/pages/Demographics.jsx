import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DiamondButton from "../components/DiamondButton";

const formatAnalysisData = (analysisData) => {
  if (!analysisData) return null;

  const formatCategory = (category) =>
    Object.entries(category || {})
      .map(([label, value]) => ({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        value: Math.round(Number(value) * 100),
      }))
      .filter((item) => Number.isFinite(item.value))
      .sort((a, b) => b.value - a.value);

  return {
    race: formatCategory(analysisData.race),
    age: formatCategory(analysisData.age),
    sex: formatCategory(analysisData.gender),
  };
};

export default function Demographics() {
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state?.name || "";
  const city = location.state?.city || "";
  const analysisData = location.state?.analysisData;

  const dataByCategory = formatAnalysisData(analysisData);

  const [category, setCategory] = useState("race");
  const [selections, setSelections] = useState({
    race: 0,
    age: 0,
    sex: 0,
  });

  const [confirmed, setConfirmed] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);

  const animatedValueRef = useRef(0);

  const selected = selections[category];
  const data = dataByCategory?.[category] || [];
  const current = data[selected];

  useEffect(() => {
    const startValue = animatedValueRef.current;
    const endValue = current?.value ?? 0;
    const duration = 1400;

    let frameId;
    let startTime;

    const animate = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const nextValue = startValue + (endValue - startValue) * eased;

      animatedValueRef.current = nextValue;
      setAnimatedValue(nextValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const timeoutId = setTimeout(() => {
      frameId = requestAnimationFrame(animate);
    }, 800);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [current?.value]);

  const changeCategory = (nextCategory) => {
    setCategory(nextCategory);
    setConfirmed(false);
  };

  const selectConfidence = (index) => {
    setSelections((prev) => ({
      ...prev,
      [category]: index,
    }));

    setConfirmed(false);
  };

  const handleReset = () => {
    setSelections({
      race: 0,
      age: 0,
      sex: 0,
    });

    setCategory("race");
    setConfirmed(false);
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <main className="flex min-h-[calc(100dvh-64px)] flex-col overflow-x-hidden bg-white px-4 pb-6 sm:px-8">
      <div className="demo-entrance animate-[demoHeaderReveal_0.8s_cubic-bezier(0.22,1,0.36,1)_both] pt-4 text-[#1A1B1C]">
        <p className="text-sm font-semibold">A.I. ANALYSIS</p>

        <h1 className="mt-2 text-[clamp(2.5rem,5vw,4rem)] leading-none font-normal tracking-[-0.05em]">
          DEMOGRAPHICS
        </h1>

        <p className="mt-2 text-xs">PREDICTED RACE & AGE</p>
      </div>

      <div className="mt-12 grid flex-1 grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-[190px_minmax(0,1fr)_400px]">
        <div className="flex flex-col gap-3">
          {["race", "age", "sex"].map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => changeCategory(item)}
              style={{
                animationDelay: `${0.2 + index * 0.15}s`,
              }}
              className={`demo-entrance flex h-[95px] cursor-pointer flex-col justify-between border-t border-[#1A1B1C] p-3 text-left animate-[demoSlideLeft_0.8s_cubic-bezier(0.22,1,0.36,1)_both] transition-colors duration-300 ${
                category === item
                  ? "bg-[#1A1B1C] text-white"
                  : "bg-[#F1F1F3] text-[#1A1B1C] hover:bg-[#D1D4DA]"
              }`}
            >
              <span className="text-sm font-semibold">
                {dataByCategory?.[item]?.[0]?.label || "No data"}
              </span>

              <span className="text-sm font-semibold">
                {item.toUpperCase()}
              </span>
            </button>
          ))}
        </div>

        <div className="demo-entrance relative flex min-h-[480px] flex-col border-t border-[#1A1B1C] bg-[#F1F1F3] p-5 animate-[demoPanelRise_1s_cubic-bezier(0.22,1,0.36,1)_0.45s_both]">
          <h2 className="demo-entrance text-3xl font-normal text-[#1A1B1C] animate-[demoFadeUp_0.8s_ease-out_0.95s_both]">
            {current?.label || "No analysis available"}
          </h2>

          <div className="flex flex-1 items-center justify-center lg:justify-end">
            <div
              className="demo-entrance flex aspect-square w-[min(350px,100%)] items-center justify-center rounded-full p-[5px] animate-[demoCircleReveal_1.2s_cubic-bezier(0.22,1,0.36,1)_0.8s_both]"
              style={{
                background: `conic-gradient(
                  #1A1B1C ${animatedValue}%,
                  #D1D1D1 ${animatedValue}% 100%
                )`,
              }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#F1F1F3]">
                <span className="text-4xl text-[#1A1B1C]">
                  {Math.round(animatedValue)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-entrance min-h-[480px] border-t border-[#1A1B1C] bg-[#F1F1F3] animate-[demoSlideRight_1s_cubic-bezier(0.22,1,0.36,1)_0.6s_both]">
          <div className="flex justify-between px-4 py-4 text-sm">
            <span>{category.toUpperCase()}</span>
            <span>A.I. CONFIDENCE</span>
          </div>

          {data.map((item, index) => (
            <button
              key={`${category}-${item.label}`}
              type="button"
              onClick={() => selectConfidence(index)}
              style={{
                animationDelay: `${0.8 + index * 0.075}s`,
              }}
              className={`demo-entrance flex w-full cursor-pointer items-center justify-between px-4 py-3 text-sm animate-[demoRowReveal_0.55s_ease-out_both] transition-colors duration-300 ${
                selected === index
                  ? "bg-[#1A1B1C] text-white"
                  : "text-[#1A1B1C] hover:bg-[#D1D4DA]"
              }`}
            >
              <span>◇ &nbsp; {item.label}</span>
              <span>{item.value}%</span>
            </button>
          ))}
        </div>
      </div>

      <div className="demo-entrance relative mt-4 flex items-center justify-center animate-[demoFadeUp_0.8s_ease-out_1.2s_both]">
        <p className="text-center text-xs text-[#A0A0A0]">
          If A.I. estimate is wrong, select the correct one.
        </p>

        <div className="absolute right-0 flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="cursor-pointer border border-[#1A1B1C] bg-white px-4 py-2 text-xs font-semibold text-[#1A1B1C] transition-colors hover:bg-[#E1E3E6]"
          >
            RESET
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="cursor-pointer border border-[#1A1B1C] bg-[#1A1B1C] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#404040]"
          >
            CONFIRM
          </button>
        </div>
      </div>

      {confirmed && (
        <p role="status" className="mt-2 text-center text-xs text-[#1A1B1C]">
          Your selection has been confirmed.
        </p>
      )}

      <div className="demo-entrance mt-auto flex items-center justify-between pt-6 animate-[demoFadeUp_0.8s_ease-out_1.4s_both]">
        <DiamondButton
          direction="left"
          label="BACK"
          onClick={() =>
            navigate("/analysis", {
              state: { name, city, analysisData },
            })
          }
        />

        <DiamondButton
          direction="right"
          label="HOME"
          onClick={() => navigate("/")}
        />
      </div>
    </main>
  );
}
