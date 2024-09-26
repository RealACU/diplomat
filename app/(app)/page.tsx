import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="relative h-screen">
        <div className="w-full h-screen bg-docblue-200 z-10 absolute opacity-35" />
        <div className="bg-frontpage w-full h-screen bg-no-repeat bg-center bg-cover absolute" />

        <div className="relative whitespace-nowrap w-full z-0 mt-2 flex-nowrap inline-flex overflow-hidden">
          <ul className="flex items-center justify-center text-lg text-white animate-infinite-scroll">
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Easy and fast tournament creation
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Discover events in your area
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Edit and share tournament information
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Keep delegates updated through SMS and email
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              View and administer delegate results
            </li>
          </ul>
          <ul className="flex items-center justify-center text-lg text-white animate-infinite-scroll">
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Easy and fast tournament creation
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Discover events in your area
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Edit and share tournament information
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Keep delegates updated through SMS and email
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              View and administer delegate results
            </li>
          </ul>
        </div>

        <div className="flex justify-center w-full items-center text-white text-4xl lg:text-6xl absolute z-30 font-semibold pt-16 text-center h-28">
          <h1 className="md:w-full w-96">
            Your gateway to everything Model UN
          </h1>
        </div>

        <nav className="relative grid sm:flex justify-center items-center gap-6 z-20 text-white text-xl font-semibold whitespace-nowrap">
          <a
            href="/"
            className="bg-gradient-to-bl from-[#dcc56a]/75 to-[#ba804d]/75 rounded-md mt-40 py-4 hover:bg-[#ba804d]/90 hover:bg-opacity-100 hover:scale-105 duration-100 md:px-20 px-10 text-center"
          >
            View Tournaments
          </a>

          <a
            href="/about"
            className="bg-gradient-to-br from-docblue-200/50 to-docblue-100/75 rounded-md sm:mt-40 py-4 hover:to-docblue-100/100 bg-opacity-75 hover:bg-opacity-100 hover:scale-105 duration-100 md:px-28 px-10 text-center"
          >
            Learn More
          </a>
        </nav>
      </div>
      <div className="bg-docblue-100 h-auto relative px-6 py-10">
        <div className="flex gap-6">
          <div className="bg-slate-50 w-2/3 rounded-lg">
            <div className="bg-slate-50 w-full h-14 rounded-lg filter drop-shadow-md flex items-center">
              <Image
                src="/search_icon.png"
                alt="search_icon"
                width={30}
                height={30}
                className="h-auto mx-4"
              />
              <input
                type="text"
                id="search-bar"
                placeholder="Search for a tournament near you"
                className="text-xl font-semibold h-[55px] w-full text-slate-800 placeholder-slate-300"
              />
            </div>
            <div className="w-full h-[465px]"></div>
          </div>
          <div className="bg-slate-300 w-1/3 rounded-lg">
            <div className="bg-slate-300 w-full h-14 rounded-lg filter drop-shadow-md flex items-center">
              <p className="text-xl font-semibold text-slate-800 mx-8">
                Filter by
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
