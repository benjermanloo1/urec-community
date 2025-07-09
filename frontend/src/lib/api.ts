import type { UserRead } from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function signInUser(data: { email: string }): Promise<UserRead> {
  const res = await fetch(`${API_BASE_URL}/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Sign in failed");
  }

  return res.json() as Promise<UserRead>;
}

export async function signUpUser(data: { email: string; first_name: string; last_name: string }): Promise<UserRead> {
  const res = await fetch(`${API_BASE_URL}/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Sign up failed");
  }

  return res.json() as Promise<UserRead>;
}
