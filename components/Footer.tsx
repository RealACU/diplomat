import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t-2 border-slate-200 h-32 flex justify-center fixed bottom-0 left-0 w-full">
      <div className="w-full items-center grid grid-cols-2 px-6 md:max-w-screen-2xl">
        <div>
          <p>Copyright © 2024 Asher & Danny & Shiv</p>
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="link">Terms of Service</Button>
          <Button variant="link">Privacy Policy</Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
