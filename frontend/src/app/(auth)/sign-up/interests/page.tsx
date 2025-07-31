"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { useSignUp } from "@/app/context/SignUpContext";

import { InterestsCard } from "@/components/interests/interests-card";
import { InterestsTable } from "@/components/interests/interests.table";
import { SubmitButton } from "@/components/submit-button";

import { Interest } from "@/lib/types";

export default function InterestsPage() {
  const [interests, setInterests] = useState<Interest[]>([]);
  const { data, updateData } = useSignUp();

  const router = useRouter();

  const handleInterestChange = useCallback(
    (selected: Interest[]) => {
      setInterests(selected);
      updateData({ interests: selected });
    },
    [updateData]
  );

  const handleSubmit = async () => {
    // console.log(data);
    await router.push("/sign-up/complete");
  };

  return (
    <InterestsCard>
      <div className="space-y-6">
        <InterestsTable onChange={handleInterestChange} />
        <SubmitButton onClick={handleSubmit} disabled={interests.length < 1}>
          Next
        </SubmitButton>
      </div>
    </InterestsCard>
  );
}
