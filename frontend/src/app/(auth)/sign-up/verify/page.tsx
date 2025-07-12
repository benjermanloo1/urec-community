"use client";

import { useState } from "react";

import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { TextInput } from "@/components/auth/text-input";
import { CodeInput } from "@/components/auth/code-input";

import { verifyUser } from "@/lib/api/user";

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState("");

  // TODO: Call verifyUser
  const handleSubmit = async () => {
    alert("verified");
  };

  return (
    <AuthCard>
      <div className="space-y-6">
        <CodeInput value={verificationCode} onChange={setVerificationCode} />
        <AuthButton onClick={handleSubmit}>Verify</AuthButton>
      </div>
    </AuthCard>
  );
}
