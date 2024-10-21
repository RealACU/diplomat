"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

const TabsComponent = ({ items, marginTop = '-mt-[260px]' }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const firstBtnRef = useRef();

  useEffect(() => {
    firstBtnRef.current.focus();
  },[]);

  return (
    <div className="-mt-16">
      <div className={`w-auto h-auto flex flex-col ${marginTop} sm:px-12 px-6 text-2xl font-semibold text-navy-100 gap-6 absolute right-0`}>
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-end">
            <button 
              ref={index === 0 ? firstBtnRef : null}
              key={index}
              onClick={() => setSelectedTab(index)}
              className={`w-auto h-auto rounded-md flex items-center justify-center transition-all duration-300 hover:scale-105 z-10 focus:outline-none outline-none hover:outline-none mr-4 hover:mr-8 group ${selectedTab === index ? 'font-bold mr-8' : ''}`}
            >
              <span className="text-navy-100 flex justify-center items-center" style={{ opacity: 1 }}>
                {item.title}
              </span>
              <ChevronLeft className={`transition-transform duration-300 transform ml-2 ${selectedTab === index ? 'rotate-180' : ''}`} />
            </button>
          </div>
        ))}
      </div>
      <div>
        {items.map((item, index) => (
          <div key={index} className={`${selectedTab === index ? "" : "hidden"}`}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabsComponent
