import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center mt-6">
                <div className="gavel-container animate-gavel-rotate">
                    <img 
                        src="/gavel1.svg" 
                        alt="Gavel" 
                        className="w-12 h-12" 
                    />
                </div>
            </div>
            <img 
                src="/gavel2.svg" 
                alt="Gavel" 
                className="-mt-[20px] ml-[32px] w-6 h-6"
            />
        </div>
    );
};

export default LoadingSpinner;
