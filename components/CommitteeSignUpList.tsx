import { Committee } from "@prisma/client";
import UploadButton from "./UploadButton";
import CommitteeSignUp from "./CommitteeSignUp";

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

  if (userId && committees) {
    return (
      <div className="flex flex-col gap-4">
        {committees.map((committee, i) => (
          <CommitteeSignUp
            key={i}
            tourneyId={tourneyId}
            committeeId={committee.id}
            delegateId={userId}
            committeeName={committee.name}
          />
        ))}
      </div>
    );
  }

  return <p>No committees (yet!)</p>;
};

export default CommitteeSignUpList;
