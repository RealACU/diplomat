"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import signUpDelegate from "@/actions/signUpDelegate";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CommitteeSignUp = ({
  tourneyId,
  committeeId,
  delegateId,
  committeeName,
}: {
  tourneyId: string;
  committeeId: number;
  delegateId?: string;
  committeeName: string;
}) => {
  const router = useRouter();

  const handleSignUp = async () => {
    if (delegateId) {
      await signUpDelegate(tourneyId, committeeId, delegateId).then((res) => {
        if (res) {
          router.refresh();
        }
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs lg:text-sm text-wrap hover:text-slate-300 transition-all duration-100">
          Sign up for {committeeName}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to sign up for{" "}
            <span className="font-extrabold">{committeeName}</span>?
          </DialogTitle>
        </DialogHeader>
        <div>
          <p>You cannot undo this action.</p>
        </div>
        <DialogFooter className="flex">
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleSignUp}>
              Yes
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommitteeSignUp;
