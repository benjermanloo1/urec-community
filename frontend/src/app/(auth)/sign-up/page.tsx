"use client";

import { useState } from "react";

import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { EmailInput } from "@/components/auth/email-input";
import { PasswordInput } from "@/components/auth/password-input";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    console.log("Sign up attempted with:", { email, password, confirmPassword });
  };

  return (
    <AuthCard>
      <AuthHeader title="Create Account" subtitle="Join the UREC Community today" />

      <div className="space-y-6">
        <EmailInput value={email} onChange={setEmail} />
        <PasswordInput value={password} onChange={setPassword} label="Password" placeholder="Create a password" />
        <PasswordInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          label="Confirm Password"
          placeholder="Confirm your password"
        />
        <AuthButton onClick={handleSubmit}>Create Account</AuthButton>
      </div>

      <AuthFooter showSignInLink />
    </AuthCard>
  );
}
