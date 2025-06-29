"use client";

import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { EmailInput } from "@/components/auth/email-input";
import { PasswordInput } from "@/components/auth/password-input";
import { RememberMeCheckbox } from "@/components/auth/remember-me-checkbox";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = () => {
    console.log("Sign in attempted with:", { email, password, rememberMe });
  };

  return (
    <AuthCard>
      <AuthHeader title="Welcome Back" subtitle="Sign in to your UREC Community account" />

      <div className="space-y-6">
        <EmailInput value={email} onChange={setEmail} />
        <PasswordInput value={password} onChange={setPassword} />
        <RememberMeCheckbox checked={rememberMe} onChange={setRememberMe} />
        <AuthButton onClick={handleSubmit}>Sign In</AuthButton>
      </div>

      <AuthFooter showSignUpLink />
    </AuthCard>
  );
}
