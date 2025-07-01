import React from "react";

import "./styles.css";

interface buttonProps {
  label: string;
  className: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ButtonComponent({
  label = "Button",
  onClick = () => {},
  className
}: buttonProps) {
  return (
    <button className={`${className} button`} onClick={onClick}>
      {label}
    </button>
  );
}
