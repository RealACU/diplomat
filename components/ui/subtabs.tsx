"use client";

import React from 'react';

interface SubTab {
    title: string;
    content: JSX.Element;
}

interface SubTabsProps {
    title: string; 
    subTabItems: SubTab[];
}

const SubTabsComponent: React.FC<SubTabsProps> = ({ title, subTabItems }) => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <div className="">
            <div className="flex mb-4">
                <p className="w-full text-white text-2xl font-bold px-2">{title}</p>
                <div className="flex space-x-6">
                    {subTabItems.map((item, index) => (
                        <button
                            key={index}
                            className={`px-6 py-1 text-lg whitespace-nowrap text-white font-semibold rounded-md bg-periwinkle-150 hover:bg-periwinkle-200 transition-all duration-200 hover:scale-105 ${activeIndex === index ? 'bg-periwinkle-300 hover:bg-periwinkle-400' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className="">
                {subTabItems[activeIndex].content}
            </div>
        </div>
    );
};

export default SubTabsComponent;
