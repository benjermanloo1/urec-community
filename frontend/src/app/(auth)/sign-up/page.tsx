"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { TextInput } from "@/components/auth/text-input";
import { sendVerification } from "@/lib/api/user";
import { useSignUp } from "@/app/context/SignUpContext";

export default function SignUpPage() {
  const { data, updateData } = useSignUp();

  const router = useRouter();

  const email = data.email;
  const isValidEmail = data.email.endsWith("@dukes.jmu.edu");

  const handleSubmit = async () => {
    try {
      await sendVerification({ email });

      await router.push("/sign-up/verify");
    } catch (err: any) {
      alert("Sign up failed: " + err.message);
    }
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
        <AuthButton
          onClick={handleSubmit}
          disabled={!data.firstName.trim() || !data.lastName.trim() || !data.email.trim() || !isValidEmail}
        >
          Create Account
        </AuthButton>
      </div>

      <AuthFooter showSignInLink />
    </AuthCard>
  );
}
