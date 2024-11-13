import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40 w-full mt-4">
      <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center items-center mt-6">
            <div className="gavel-container animate-gavel-rotate">
              <Image 
                src="/gavel1.svg" 
                alt="Gavel" 
                width={96}
                height={96} 
              />
            </div>
          </div>
          <Image 
            src="/gavel2.svg" 
            alt="Gavel" 
            className="-mt-[14px] ml-[66px]"
            width={48}
            height={48}
          />
        </div>
      <p className="mx-3 text-2xl font-bold pt-2 text-periwinkle-400">We Love MUN!</p>
    </div>
  );
};

export default Loading;
