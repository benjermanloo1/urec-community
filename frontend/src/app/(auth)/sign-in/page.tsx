"use client";

import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { TextInput } from "@/components/auth/text-input";
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
        <TextInput
          id="email"
          label="Email Address"
          value={email}
          onChange={setEmail}
          placeholder="Enter your JMU email"
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Create a password"
        />
        <RememberMeCheckbox checked={rememberMe} onChange={setRememberMe} />
        <AuthButton onClick={handleSubmit}>Sign In</AuthButton>
      </div>

      <AuthFooter showSignUpLink />
    </AuthCard>
  );
}
