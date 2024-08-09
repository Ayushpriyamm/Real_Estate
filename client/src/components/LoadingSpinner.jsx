import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-b-4 border-gray-400 rounded-full w-12 h-12 animate-spin">
        Loading....
      </div>
    </div>
  );
};

export default LoadingSpinner;
