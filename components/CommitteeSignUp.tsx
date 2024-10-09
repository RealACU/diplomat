"use client";

import { Button } from "@/components/ui/button";
import signUpDelegate from "@/actions/signUpDelegate";
import { useState } from "react";

interface CommitteeSignUpProps {
  tourneyId: string;
  committeeId: number;
  committeeName: string;
  delegateId: string;
  signedUp: boolean;
}

const CommitteeSignUp: React.FC<CommitteeSignUpProps> = ({
  tourneyId,
  committeeId,
  committeeName,
  delegateId,
  signedUp,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    await signUpDelegate(tourneyId, committeeId, delegateId).then((res) => {
      if (res) {
        setLoading(false);
      }
    });
  };

  return (
    <Button onClick={handleSignUp} key={committeeId} disabled={loading || signedUp}>
      {loading ? "Signing up..." : signedUp ? `Signed up for ${committeeName}` : `Sign up for ${committeeName}`}
    </Button>
  );
};

export default CommitteeSignUp;
