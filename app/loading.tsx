import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40 w-full mt-4">
      <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center items-center mt-6">
              <div className="gavel-container animate-gavel-rotate">
                  <img 
                      src="/gavel1.svg" 
                      alt="Gavel" 
                      className="w-24 h-24" 
                  />
              </div>
          </div>
          <img 
              src="/gavel2.svg" 
              alt="Gavel" 
              className="-mt-[40px] ml-[66px] w-12 h-12"
          />
      </div>
      <p className="mx-3 text-2xl font-bold pt-2 text-periwinkle-400">We Love MUN!</p>
    </div>
  );
};

export default Loading;
