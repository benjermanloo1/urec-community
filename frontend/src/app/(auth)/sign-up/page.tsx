"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { SubmitButton } from "@/components/submit-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { TextInput } from "@/components/auth/text-input";
import { sendVerification } from "@/lib/api/user";
import { useSignUp } from "@/app/context/SignUpContext";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const { data, updateData } = useSignUp();

  const router = useRouter();

  const email = data.email;
  const isValidEmail = data.email.endsWith("@dukes.jmu.edu");

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await sendVerification({ email });

      await router.push("/sign-up/verify");
    } catch (err: any) {
      alert("Sign up failed: " + err.message);
    }

    setLoading(false);
  };

  return (
    <AuthCard>
      <AuthHeader title="Create Account" subtitle="Join the UREC Community today" />

      <div className="space-y-6">
        <TextInput
          id="firstName"
          label="First Name"
          value={data.firstName}
          onChange={(value) => updateData({ firstName: value })}
          placeholder="Enter your first name"
        />
        <TextInput
          id="lastName"
          label="Last Name"
          value={data.lastName}
          onChange={(value) => updateData({ lastName: value })}
          placeholder="Enter your last name"
        />
        <TextInput
          id="email"
          label="Email Address"
          value={data.email}
          onChange={(value) => updateData({ email: value })}
          placeholder="Enter your JMU email"
        />
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin" />
          </div>
        ) : (
          <SubmitButton
            onClick={handleSubmit}
            disabled={!data.firstName.trim() || !data.lastName.trim() || !data.email.trim() || !isValidEmail}
          >
            Create Account
          </SubmitButton>
        )}
      </div>

      <AuthFooter showSignInLink />
    </AuthCard>
  );
}
