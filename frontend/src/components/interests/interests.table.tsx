import { fetchInterests } from "@/lib/api/user";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { InterestLabel } from "@/components/interests/interest-label";
import { Interest } from "@/lib/types";

interface InterestsTableProps {
  onChange?: (selected: Interest[]) => void;
}

export const InterestsTable = ({ onChange }: InterestsTableProps) => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterests, setSelectedInterests] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const interestsRef = useRef<Interest[]>([]);

  useEffect(() => {
    interestsRef.current = interests;
  }, [interests]);

  useEffect(() => {
    if (onChange) {
      const selected = interestsRef.current.filter((i) => selectedInterests.has(i.id));
      onChange(selected);
    }
  }, [selectedInterests, onChange]);

  useEffect(() => {
    const loadInterests = async () => {
      setLoading(true);
      const data = await fetchInterests();
      setInterests(data);
      setLoading(false);
    };

    loadInterests();
  }, []);

  const handleInterestClick = (interest: Interest) => {
    setSelectedInterests((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(interest.id)) {
        newSet.delete(interest.id);
      } else {
        newSet.add(interest.id);
      }
      return newSet;
    });
  };

  const clearSelections = () => {
    setSelectedInterests(new Set());
  };

  const selectAll = () => {
    const allIds = new Set(interests.map((i) => i.id));
    setSelectedInterests(allIds);
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="size-6 text-slate-300 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">Interests</h1>
          <p className="text-gray-600 mt-1">Select at least one of your interests ({interests.length} available)</p>
        </div>
      </div>

      {selectedInterests.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-800 font-medium">
              {selectedInterests.size} interest{selectedInterests.size !== 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2">
              <button onClick={selectAll} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Select All
              </button>
              <button onClick={clearSelections} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-start">
        {interests.map((interest) => (
          <InterestLabel
            key={interest.id}
            interest={interest}
            onClick={handleInterestClick}
            isSelected={selectedInterests.has(interest.id)}
          />
        ))}
      </div>
    </div>
  );
};
