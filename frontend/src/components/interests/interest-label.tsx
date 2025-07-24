import { useState } from "react";
import { Interest } from "@/lib/types";
import { Heart } from "lucide-react";

interface InterestLabelProps {
  interest: Interest;
  isSelected: boolean;
  onClick: (interest: Interest) => void;
}

export const InterestLabel = ({ interest, isSelected = false, onClick }: InterestLabelProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles =
    "inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer select-none";

  const variantStyles = {
    default: "text-sm border-2",
    compact: "text-xs px-3 py-1.5 border",
    card: "text-sm px-6 py-3 rounded-lg border-2 shadow-sm hover:shadow-md",
  };

  const stateStyles = isSelected
    ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
    : isHovered
    ? "bg-gray-50 border-gray-300 text-gray-700"
    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300";

  return (
    <button
      className={`${baseStyles} ${variantStyles["default"]} ${stateStyles}`}
      onClick={() => onClick?.(interest)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={`Click to ${isSelected ? "deselect" : "select"} ${interest.name}`}
    >
      <span className="truncate max-w-32">{interest.name}</span>
      {isSelected && <Heart size={12} className="text-blue-500 fill-current" />}
    </button>
  );
};
