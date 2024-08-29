import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-12">
      {children}
    </div>
  );
};

export default AppLayout;
