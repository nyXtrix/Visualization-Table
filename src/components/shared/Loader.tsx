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
  color = 'var(--primary)',
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
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 dark:bg-black/40 backdrop-blur-md pointer-events-none transition-all duration-300">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;
