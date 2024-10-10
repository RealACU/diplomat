"use client";

import { useState, useEffect, useRef } from 'react';

const TabsComponent = ({ items }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const firstBtnRef = useRef();

  useEffect(() => {
    firstBtnRef.current.focus();
  },[]);

  return (
    <div className="-mt-12">
      <div className="w-auto h-[60px] flex sm:px-6 px-4 text-sm sm:text-lg font-semibold text-white gap-4 sm:gap-6 absolute">
        {items.map((item, index) => (
          <button 
            ref={index === 0 ? firstBtnRef : null}
            key={index}
            onClick={() => setSelectedTab(index)}
            style={{ 
              backgroundColor: selectedTab === index ? item.color : `${item.color}80`,
              color: selectedTab === index ? 'white' : 'rgba(255, 255, 255, 0.5)', 
            }}
            className="w-auto h-[50px] sm:h-[60px] -mt-10 sm:-mt-12 px-4 sm:px-6 rounded-md flex items-center justify-center pb-[12px] duration-300 hover:scale-105 z-10"
          >
            <span className="text-white" style={{ opacity: 1 }}>{item.title}</span>
          </button>
        ))}
      </div>
      <div>
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
