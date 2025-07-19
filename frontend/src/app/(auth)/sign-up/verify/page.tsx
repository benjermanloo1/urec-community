"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { CodeInput } from "@/components/auth/code-input";

import { verifyUser } from "@/lib/api/user";
import { useSignUp } from "@/app/context/SignUpContext";
import { Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState("");
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data, updateData } = useSignUp();

  const email = data.email;

  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await verifyUser({ email, code: verificationCode });

      if (result?.message === "Email successfully verified") {
        await router.push("/sign-up/interests");
      } else {
        setHasError(true);
      }
    } catch (err: any) {
      setHasError(true);
    }

    setLoading(false);
  };

  const clearError = () => {
    setHasError(false);
  };

  return (
    <AuthCard>
      <div className="space-y-6">
        <CodeInput onCodeChange={setVerificationCode} hasError={hasError} onClearError={clearError} />
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin" />
          </div>
        ) : (
          <AuthButton onClick={handleSubmit} disabled={verificationCode.length !== 6}>
            Verify
          </AuthButton>
        )}
      </div>
    </AuthCard>
  );
}
