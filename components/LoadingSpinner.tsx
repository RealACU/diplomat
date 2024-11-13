import React from 'react';
import Image from 'next/image';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center mt-6">
                <div className="gavel-container animate-gavel-rotate">
                    <Image 
                        src="/gavel1.svg" 
                        alt="Gavel" 
                        width={48}
                        height={48}
                    />
                </div>
            </div>
            <Image 
                src="/gavel2.svg" 
                alt="Gavel" 
                className="-mt-[7px] ml-[32px]"
                width={24}
                height={24}
            />
        </div>
    );
};

export default LoadingSpinner;
