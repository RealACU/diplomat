import { PrismaClient } from "@prisma/client";
import TabsComponent from "@/components/ui/tabs";

const prisma = new PrismaClient();

const tourneyPage = async ({ params }: { params: { id: string } }) => {
  const tourney = await prisma.tourney.findUnique({
    where: { id: params.id },
  });

  if (!tourney) {
    return <div>Tournament not found</div>;
  }

  const { name, description, startDate, endDate } = tourney;

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
              <p className="text-md px-6 py-4">{tourney.description}</p>
            </div>
          </div>
          <div className="bg-slate-50 w-1/3 rounded-lg">
            <div className="bg-slate-50 w-full h-14 rounded-lg filter drop-shadow-md flex items-center justify-center">
              <p className="text-xl font-semibold mx-8">Tournament Information</p>
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
          <h1 className="lg:text-7xl md:text-6xl text-5xl font-medium">{tourney.name}</h1>
          <div className="flex-col flex gap-y-2">
            <h2 className="hidden lg:flex justify-end text-2xl">
              {startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>
            <h2 className="hidden lg:flex justify-end text-2xl">{tourney.city}, {tourney.state}</h2>
          </div>
        </div>
      </div>

      {/* Place TabsComponent here, ensuring it overlays other content */}
      <div className="relative z-30">
        <TabsComponent items={items} />
      </div>
    </div>
  );
};

export default tourneyPage;