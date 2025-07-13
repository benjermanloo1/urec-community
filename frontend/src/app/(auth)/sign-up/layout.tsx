import { SignUpProvider } from "@/app/context/SignUpContext";

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <SignUpProvider>{children}</SignUpProvider>;
}
