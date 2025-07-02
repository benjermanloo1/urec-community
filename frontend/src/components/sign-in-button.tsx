import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignInButtonProps {
  onClick: () => void;
}

export const SignInButton = ({ onClick }: SignInButtonProps) => {
  return (
    <Button
      variant="outline"
      className="flex items-center rounded-full gap-2 bg-clear text-white border-white hover:bg-white hover:text-black transition-colors"
      onClick={onClick}
    >
      <User className="w-4 h-4" />
      Sign In
    </Button>
  );
};
