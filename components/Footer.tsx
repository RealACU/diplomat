"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const triggerPosition = document.body.offsetHeight * 0.7;
      const nearTop = window.scrollY < 50;

      if (scrollPosition >= triggerPosition && !nearTop) {
        return setVisible(true);
      }

      setVisible(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className={`bg-slate-50 border-t-2 border-slate-200 h-32 flex justify-center z-50 fixed left-0 w-full transition-all duration-500 ${
        visible ? "bottom-0" : "-bottom-32"
      }`}
    >
      <div className="w-full items-center grid grid-cols-2 px-6 md:max-w-screen-2xl">
        <div>
          <p>Copyright © 2024 Asher & Danny & Shivansh</p>
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
