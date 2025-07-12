"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { TextInput } from "@/components/auth/text-input";

import { signUpUser } from "@/lib/api/user";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !firstName || !lastName) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await signUpUser({
        email,
        first_name: firstName,
        last_name: lastName,
      });

      router.push("/sign-up/verify");
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
          value={firstName}
          onChange={setFirstName}
          placeholder="Enter your first name"
        />
        <TextInput
          id="lastName"
          label="Last Name"
          value={lastName}
          onChange={setLastName}
          placeholder="Enter your last name"
        />
        <TextInput
          id="email"
          label="Email Address"
          value={email}
          onChange={setEmail}
          placeholder="Enter your JMU email"
        />
        <AuthButton onClick={handleSubmit}>Create Account</AuthButton>
      </div>

      <AuthFooter showSignInLink />
    </AuthCard>
  );
}
