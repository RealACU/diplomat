"use client";

import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t-2 border-slate-200 h-32 flex justify-center items-center w-full">
      <div className="w-full max-w-screen-2xl flex justify-between items-center px-6">
        <p>Copyright © 2024 Asher & Danny & Shivansh</p>
        <div className="flex space-x-4">
          <Button variant="link">
            <a href="/terms-of-use">Terms of Use</a>
          </Button>
          <Button variant="link">
            <a href="/privacy-policy">Privacy Policy</a>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// removed the strange transition behavior, sorry! it just looked strange and it covered the search bar unless you added padding to the bottom of the page which like defeats the whole purpose of having the transition in the first place. if you'd like to add it back lmk plz

/*
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
          <Button variant="link">
            <a
            href="/terms-of-use"
           >
            Terms of Use
            </a>
          </Button>
          
          <Button variant="link">
          <a
            href="/privacy-policy"
           >
            Privacy Policy
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
*/