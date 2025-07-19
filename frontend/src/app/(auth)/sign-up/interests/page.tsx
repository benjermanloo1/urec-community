"use client";

import { InterestsCard } from "@/components/interests/interests-card";
import { SubmitButton } from "@/components/submit-button";

export default function InterestsPage() {
  return (
    <InterestsCard>
      <div className="space-y-6">
        <SubmitButton onClick={() => {}} disabled={false}>
          Next
        </SubmitButton>
      </div>
    </InterestsCard>
  );
}
