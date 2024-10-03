"use client";

import { useState, useEffect, useRef } from 'react';

const TabsComponent = ({ items }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const firstBtnRef = useRef();

  useEffect(() => {
    firstBtnRef.current.focus();
  },[]);

  return (
    <div>
      <div className="w-auto h-[60px] flex px-6 text-lg font-semibold text-white gap-6 absolute">
        {items.map((item, index) => (
          <button 
            ref={index === 0 ? firstBtnRef : null}
            key={index}
            onClick={() => setSelectedTab(index)}
            className="w-auto h-[60px] bg-docblue-100 -mt-12 px-6 rounded-md flex items-center justify-center pb-[12px] bg-opacity-50 focus:bg-opacity-100 hover:bg-opacity-75 duration-150 hover:bg-docorange-200 hover:scale-105 z-10"
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="relative w-full h-[600px] bg-docblue-100 py-10 px-6 text-slate-800 z-20">
        {items.map((item, index) => (
          <div className={`${selectedTab === index ? "" : "hidden"}`}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TabsComponent
