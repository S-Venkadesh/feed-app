import React from "react";

import "./styles.css";

interface buttonProps {
  label: string;
  className: string
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function LinkComponent({
  label = "link",
  onClick = () => {},
  className
}: buttonProps) {
  return (
    <a className={`${className} link`} onClick={onClick}>
      {label}
    </a>
  );
}
