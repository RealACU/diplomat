//@ts-ignore;
import { currentUser } from "@clerk/nextjs";

const tourneyPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  return (
    <>
      <div>This is the tourney page</div>
      <div>Tourney Id: {params.id}</div>
      <div>
        User: {user?.firstName} {user?.lastName}
      </div>
      <div>Your results:</div>
    </>
  );
};

export default tourneyPage;
