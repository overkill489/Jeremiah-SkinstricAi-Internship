import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DiamondButton from "../components/DiamondButton";

const formatAnalysisData = (analysisData) => {
  if (!analysisData) return null;

  const formatCategory = (category) => {
    return Object.entries(category || {})
      .map(([label, value]) => ({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        value: Math.round(Number(value) * 100),
      }))
      .filter((item) => Number.isFinite(item.value))
      .sort((a, b) => b.value - a.value);
  };

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

  console.log("Demographics API Data:", analysisData);

  const [category, setCategory] = useState("race");
  const [selections, setSelections] = useState({
    race: 0,
    age: 0,
    sex: 0,
  });

  const selected = selections[category];

  const [animatedValue, setAnimatedValue] = useState(34);
  const animatedValueRef = useRef(34);

  const data = dataByCategory?.[category] || [];
  const current = data[selected];

  const [confirmed, setConfirmed] = useState(false);

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

  useEffect(() => {
    const startValue = animatedValueRef.current;
    const endValue = current?.value ?? 0;
    const duration = 700;
    let frameId;
    let startTime;

    const animate = (timestamp) => {
      if (startTime === undefined) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const nextValue = startValue + (endValue - startValue) * easedProgress;

      animatedValueRef.current = nextValue;
      setAnimatedValue(nextValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [current.value]);

  const changeCategory = (nextCategory) => {
    setCategory(nextCategory);
  };

  return (
    <main className="flex min-h-[calc(100dvh-64px)] flex-col bg-white px-4 pb-6 sm:px-8">
      <div className="pt-4 text-[#1A1B1C]">
        <p className="text-sm font-semibold">A.I. ANALYSIS</p>

        <h1 className="mt-2 text-[clamp(2.5rem,5vw,4rem)] leading-none font-normal tracking-[-0.05em]">
          DEMOGRAPHICS
        </h1>

        <p className="mt-2 text-xs">PREDICTED RACE & AGE</p>
      </div>

      <div className="mt-12 grid flex-1 grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-[190px_minmax(0,1fr)_400px]">
        <div className="flex flex-col gap-3">
          {["race", "age", "sex"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => changeCategory(item)}
              className={`flex h-[95px] cursor-pointer flex-col justify-between border-t border-[#1A1B1C] p-3 text-left transition-colors duration-300 ${
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

        <div className="relative flex min-h-[480px] flex-col border-t border-[#1A1B1C] bg-[#F1F1F3] p-5">
          <h2 className="text-3xl font-normal text-[#1A1B1C]">
            {current?.label || "No analysis available"}
          </h2>

          <div className="flex flex-1 items-center justify-center lg:justify-end">
            <div
              className="flex aspect-square w-[min(350px,100%)] items-center justify-center rounded-full p-[5px]"
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

        <div className="min-h-[480px] border-t border-[#1A1B1C] bg-[#F1F1F3]">
          <div className="flex justify-between px-4 py-4 text-sm">
            <span>{category.toUpperCase()}</span>
            <span>A.I. CONFIDENCE</span>
          </div>

          {data.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() =>
                setSelections((prev) => ({
                  ...prev,
                  [category]: index,
                }))
              }
              className={`flex w-full cursor-pointer items-center justify-between px-4 py-3 text-sm transition-colors duration-300 ${
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

      <div className="relative mt-4 flex items-center justify-center">
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

      <div className="mt-auto flex items-center justify-between pt-6">
        <DiamondButton
          direction="left"
          label="BACK"
          onClick={() =>
            navigate("/analysis", {
              state: { name, city },
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
