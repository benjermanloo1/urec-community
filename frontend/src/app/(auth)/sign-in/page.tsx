"use client";

import { useRouter } from "next/navigation";

import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { TextInput } from "@/components/auth/text-input";
import { RememberMeCheckbox } from "@/components/auth/remember-me-checkbox";
import { useState } from "react";

import { signInUser } from "@/lib/api/user";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter an email");
      return;
    }

    try {
      const user = await signInUser({ email });

      router.push("/");
      console.log(`Signed in with ${user.email}`);
    } catch (error: any) {
      alert("Sign in failed: " + error.message);
    }
  };

  return (
    <AuthCard>
      <AuthHeader title="Welcome Back" subtitle="Sign in to your UREC Community account" />

      <div className="space-y-6">
        <TextInput
          id="email"
          label="Email Address"
          value={email}
          onChange={setEmail}
          placeholder="Enter your JMU email"
        />
        <RememberMeCheckbox checked={rememberMe} onChange={setRememberMe} />
        <AuthButton onClick={handleSubmit}>Sign In</AuthButton>
      </div>

      <AuthFooter showSignUpLink />
    </AuthCard>
  );
}
