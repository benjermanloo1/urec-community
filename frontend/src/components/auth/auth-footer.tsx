import React from "react";

interface AuthFooterProps {
  showSignUpLink?: boolean;
  showSignInLink?: boolean;
}

export const AuthFooter = ({ showSignUpLink = false, showSignInLink = false }: AuthFooterProps) => {
  return (
    <>
      {/* Sign Up/In Link */}
      {(showSignUpLink || showSignInLink) && (
        <div className="mt-8 text-center">
          <p className="text-[#595959]">
            {showSignUpLink ? "Don't have an account? " : "Already have an account? "}
            <a
              href={showSignUpLink ? "/sign-up" : "/sign-in"}
              className="text-[#450084] hover:text-[#B599CE] font-medium transition-colors"
            >
              {showSignUpLink ? "Sign up here" : "Sign in here"}
            </a>
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-[#595959] text-sm">
          By {showSignUpLink ? "signing up" : "signing in"}, you agree to our{" "}
          <a href="#" className="text-[#450084] hover:text-[#B599CE] transition-colors">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#450084] hover:text-[#B599CE] transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>
    </>
  );
};
