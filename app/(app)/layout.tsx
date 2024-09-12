import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <div className="p-16"></div>
    </>
  );
};

export default AppLayout;
