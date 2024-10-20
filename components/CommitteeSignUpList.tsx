import { Committee } from "@prisma/client";
import CommitteeSignUp from "@/components/CommitteeSignUp";
import UploadButton from "./UploadButton";

const CommitteeSignUpList = ({
  userId,
  userDTourneys,
  committees,
  tourneyId,
}: {
  userId?: string;
  userDTourneys?: string[];
  committees: Committee[];
  tourneyId: string;
}) => {
  if (userId && userDTourneys && userDTourneys.includes(tourneyId)) {
    const committee = committees.find((committee) =>
      committee.delegateIds.includes(userId)
    );

    return (
      <div className=" flex flex-col gap-4">
        <p>
          You are signed up for{" "}
          <span className="font-semibold">{committee?.name || "unknown"}</span>
        </p>
        <p>Upload position paper</p>
        <UploadButton />
      </div>
    );
  }

  if (userId && committees.length > 0) {
    return committees.map((committee) => (
      <CommitteeSignUp
        key={committee.name}
        tourneyId={tourneyId}
        committeeId={committee.id}
        delegateId={userId}
        committeeName={committee.name}
      />
    ));
  }

  return <p>No committees (yet!)</p>;
};

export default CommitteeSignUpList;
