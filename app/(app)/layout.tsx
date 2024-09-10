import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pb-32">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default AppLayout;
