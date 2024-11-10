import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40 w-full">
      <Image
        src="/diplomat-logo.svg"
        width={50}
        height={0}
        alt="logo"
        className="h-auto -ml-2"
      ></Image>
      <p className="mx-3 text-2xl font-bold pt-4">We Love MUN!</p>
    </div>
  );
};

export default Loading;
