import React, { useState, useEffect } from "react";

const COOLDOWN_DURATION = 900; // 15 minutes in seconds
const STORAGE_KEY = "resendCooldownExpiresAt";

export const ResendCode = ({ onResend }: { onResend: () => Promise<void> }) => {
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (cooldown > 0 || loading) return;

    try {
      setLoading(true);
      await onResend();

      const expiresAt = Date.now() + COOLDOWN_DURATION * 1000;
      localStorage.setItem(STORAGE_KEY, expiresAt.toString());
      setCooldown(COOLDOWN_DURATION);
    } catch (err) {
      alert("Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  // Restore cooldown on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const expiresAt = parseInt(saved, 10);
      const remaining = Math.floor((expiresAt - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          localStorage.removeItem(STORAGE_KEY);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <p className="text-sm text-gray-600">
      Didn’t receive a code?{" "}
      <button
        onClick={handleResend}
        disabled={cooldown > 0 || loading}
        className="underline text-blue-600 hover:text-blue-800 transition-colors disabled:text-gray-400"
      >
        {cooldown > 0 ? `Resend in ${cooldown}s` : "Click here to resend"}
      </button>
    </p>
  );
};
