import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="h-[calc(100%-4rem)] flex justify-center">
        <div className="h-full w-full p-16 items-center md:max-w-screen-2xl">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
