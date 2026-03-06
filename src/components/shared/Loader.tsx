import React from 'react';

interface LoaderProps {
  size?: number;
  speed?: string;
  color?: string;
  className?: string;
  fullPage?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 35,
  speed = '0.8s',
  color = '#5D3FD3',
  className = '',
  fullPage = false,
}) => {
  const loader = (
    <div
      className={`three-body ${className}`}
      style={{
        // @ts-ignore
        '--uib-size': `${size}px`,
        '--uib-speed': speed,
        '--uib-color': color,
      }}
    >
      <div className="three-body__dot"></div>
      <div className="three-body__dot"></div>
      <div className="three-body__dot"></div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;
