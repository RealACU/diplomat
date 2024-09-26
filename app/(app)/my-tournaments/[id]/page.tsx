const tourneyPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div>This is the tourney page</div>
      <div>Tourney Id: {params.id}</div>
      <div>Your results:</div>
    </>
  );
};

export default tourneyPage;
