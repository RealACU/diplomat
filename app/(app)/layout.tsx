import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100%-4rem)] p-16 flex justify-center">
        <div className="w-full items-center md:max-w-screen-xl">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
