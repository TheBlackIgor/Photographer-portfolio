import "./Button.scss";

import React from "react";

interface Props {
  func: () => void;
  type: "submit";
  children: React.ReactNode;
}

export const Button = ({ func, type = "submit", children }: Props) => {
  if (type === "submit")
    return (
      <button className="button-submit" type="submit" onClick={() => func()}>
        {children}
      </button>
    );
};
