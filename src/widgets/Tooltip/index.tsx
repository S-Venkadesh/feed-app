import React, { ReactNode, useState } from 'react';

type TooltipProps = {
  children: ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          style={{
            position: 'absolute',
            bottom: '125%',
            backgroundColor: '#333',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            zIndex: 9999,
          }}
        >
          Not implemented yet
        </div>
      )}
    </div>
  );
};

export default Tooltip;