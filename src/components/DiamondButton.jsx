
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export default function DiamondButton({
  direction = "right",
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex cursor-pointer items-center gap-4"
    >
      {direction === "right" && (
        <span className="text-xs font-semibold text-[#1A1B1C]">
          {label}
        </span>
      )}

      <div className="flex h-8 w-8 rotate-45 items-center justify-center border border-[#1A1B1C] transition-transform duration-300 group-hover:scale-110">
        <div className="-rotate-45">
          {direction === "right" ? (
            <FaCaretRight className="text-sm" />
          ) : (
            <FaCaretLeft className="text-sm" />
          )}
        </div>
      </div>

      {direction === "left" && (
        <span className="text-xs font-semibold text-[#1A1B1C]">
          {label}
        </span>
      )}
    </button>
  );
}
