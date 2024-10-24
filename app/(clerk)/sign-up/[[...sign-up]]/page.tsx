import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <div className="mt-16 mb-20">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        forceRedirectUrl="/sign-up/school-affiliation"
      />
    </div>
  );
}

export default SignUpPage;
