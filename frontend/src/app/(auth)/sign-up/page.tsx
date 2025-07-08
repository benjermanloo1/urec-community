"use client";

import { useState } from "react";

import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { TextInput } from "@/components/auth/text-input";

import { signUpUser } from "@/lib/api";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const user = await signUpUser({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      console.log(user);

      alert(`Welcome, ${user.first_name || user.email}! Account created.`);
    } catch (err: any) {
      alert("Sign up failed: " + err.message);
    } finally {
      setLoading(false);
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
        <TextInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Create a password"
        />
        <TextInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm your password"
        />
        <AuthButton onClick={handleSubmit}>Create Account</AuthButton>
      </div>

      <AuthFooter showSignInLink />
    </AuthCard>
  );
}
