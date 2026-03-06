import React from "react";

interface GlobalLoaderProps {
  children: React.ReactNode;
  loading: boolean;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({
  children,
  loading = true,
}) => {
  return (
    <div className="relative w-full h-full">
      {children}

      {loading && (
        <div className="absolute inset-0 flex items-center w-full justify-center bg-blue-500 z-50">
          <div className="loader relative inline-block h-15 w-15">
            <div className="loader-dot absolute h-full w-[30%]"></div>
            <div className="loader-dot absolute h-full w-[30%]"></div>
            <div className="loader-dot absolute h-full w-[30%]"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalLoader;
