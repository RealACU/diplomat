import { db } from "@/lib/db";
import TabsComponent from "@/components/ui/tabs";

const tourneyPage = async ({ params }: { params: { id: string } }) => {
  const tourney = await db.tourney.findUnique({
    where: { id: params.id },
    include: {
      committees: true,
    },
  });

  if (!tourney) {
    return <div>Tournament not found</div>;
  }

  const { name, description, startDate, endDate, committees } = tourney;

  const items = [
    {
      title: "Invitation",
      content: (
        <div className="flex gap-6">
          <div className="bg-slate-300 w-2/3 rounded-lg">
            <div className="bg-slate-300 w-full h-14 rounded-lg filter drop-shadow-md flex items-center justify-center">
              <p className="text-xl font-semibold mx-8">Invitation Message</p>
            </div>
            <div className="w-full h-[465px]">
              <p className="text-md px-6 py-4 whitespace-pre-wrap">{tourney.description}</p>
            </div>
          </div>
          <div className="bg-slate-50 w-1/3 rounded-lg">
            <div className="bg-slate-50 w-full h-14 rounded-lg filter drop-shadow-md flex items-center justify-center mb-5">
              <p className="text-xl font-semibold mx-8">Tournament Information</p>
            </div>
            <div className="bg-slate-200 mx-4 px-4 py-3 my-3 rounded-md font-medium text-md flex overflow-clip break-words">
              <p>{new Date(tourney.startDate).toDateString() === new Date(tourney.endDate).toDateString() ? "Date" : "Dates"}</p>
              <p className="ml-auto text-right">
                {new Date(tourney.startDate).toDateString() === new Date(tourney.endDate).toDateString()
                  ? new Date(tourney.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : `${new Date(tourney.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - ${new Date(tourney.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
              </p>
            </div>
            <div className="bg-slate-200 mx-4 px-4 py-3 my-3 rounded-md font-medium text-md flex overflow-clip break-words">
              <p>Location</p>
              <p className="ml-auto text-right">{tourney.school}</p>
            </div>
            <div className="bg-slate-200 mx-4 px-4 py-3 my-3 rounded-md font-medium text-md flex overflow-clip break-words">
              <p>Committees</p>
              <p className="ml-auto text-right">
              {committees.length > 0 ? (
                committees.map((committee) => (
                  <div key={committee.id}>
                    {committee.name}
                  </div>
                ))
              ) : (
                <p>No committees (yet!)</p>
              )}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Comittees",
      content: (
        <div className="flex gap-6">
          <div className="bg-slate-300 w-2/3 rounded-lg">
            <div className="bg-slate-300 w-full h-14 rounded-lg filter drop-shadow-md flex items-center justify-center">
              <p className="text-xl font-semibold">Comittees</p>
            </div>
            <div className="w-full h-[465px]">
              <p className="text-md px-6 py-4">bruh</p>
            </div>
          </div>

          <div className="bg-slate-50 w-1/3 rounded-lg">
            <div className="bg-slate-50 w-full h-14 rounded-lg filter drop-shadow-md flex items-center justify-center">
              <p className="text-xl font-semibold">Tournament Information</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Register",
      content: (
        <div className="flex gap-6">
          <div className="bg-slate-300 w-2/3 rounded-lg">
            <div className="bg-slate-300 w-full h-14 rounded-lg filter drop-shadow-md flex items-center justify-center">
              <p className="text-xl font-semibold">Register</p>
            </div>
            <div className="w-full h-[465px]">
              <p className="text-md px-6 py-4">hello world!</p>
            </div>
          </div>

          <div className="bg-slate-50 w-1/3 rounded-lg">
            <div className="bg-slate-50 w-full h-14 rounded-lg filter drop-shadow-md flex items-center justify-center">
              <p className="text-xl font-semibold">Tournament Information</p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="relative">
      <div className="w-full h-[260px] flex">
        <div className="w-full h-[260px] bg-docblue-200 z-10 absolute bg-opacity-50 backdrop-filter backdrop-blur-lg" />
        <div className="bg-frontpage w-full h-[260px] bg-top-3 bg-no-repeat bg-cover absolute z-0" /> 

        <div className="w-full grid grid-cols-2 z-20 pb-[80px] lg:mx-16 mx-8 text-white items-center">
          <h1 className="lg:text-7xl md:text-6xl text-5xl font-medium break-words">{tourney.name}</h1>
          <div className="flex-col flex gap-y-2">
            <h2 className="hidden lg:flex justify-end text-2xl">
              {startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>
            <h2 className="hidden lg:flex justify-end text-2xl break-words">{tourney.city}, {tourney.state}</h2>
          </div>
        </div>
      </div>

      <div className="relative z-30">
        <TabsComponent items={items} />
      </div>
    </div>
  );
};

export default tourneyPage;