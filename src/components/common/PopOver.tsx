import React from "react";

type PopOverProps = {
  text : string
}

export function PopOver({ text } : PopOverProps) {
  return (
    <>
      <div className="position-relative">
        <p className="no-margin min-font text-center white-background popover-text has-font-weight">
          {text}
        </p>
        <div className="down-arrow"></div>
      </div>
    </>
  );
}
