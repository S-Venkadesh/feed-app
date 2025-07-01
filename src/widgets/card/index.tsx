import React, { ReactElement, ReactNode } from "react";

import "./styles.css";

interface cardProps {
  children: ReactNode;
  footerRenderer: ReactElement;
  className: string;
}

export function CardComponent({
  children,
  footerRenderer,
  className,
}: cardProps) {
  return (
    <div className="cardWrapper">
      <div className={`${className} card `}>{children}</div>
      {footerRenderer}
    </div>
  );
}
