"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { TextInput } from "@/components/auth/text-input";
import { CodeInput } from "@/components/auth/code-input";

import { verifyUser } from "@/lib/api/user";
import { useSignUp } from "@/app/context/SignUpContext";

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState("");
  const { data, updateData } = useSignUp();

  const email = data.email;

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const result = await verifyUser({ email, code: verificationCode });

      if (result?.message === "Email successfully verified") {
        await router.push("/sign-up/interests");
      } else {
        alert("Verification failed: Code does not match");
      }
    } catch (err: any) {
      alert("Verification failed: " + err.message);
    }
  };

  return (
    <AuthCard>
      <div className="space-y-6">
        <CodeInput onCodeChange={setVerificationCode} />
        <AuthButton onClick={handleSubmit} disabled={verificationCode.length !== 6}>
          Verify
        </AuthButton>
      </div>
    </AuthCard>
  );
}
