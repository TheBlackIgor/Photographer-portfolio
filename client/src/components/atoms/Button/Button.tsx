import "./Button.scss";

import { ReactNode } from "react";

interface Props {
  onClick?: () => void;
  type: "submit";
  children: ReactNode;
}

export const Button = ({ onClick, type = "submit", children }: Props) => {
  if (type === "submit")
    if (onClick)
      return (
        <button
          className="button-submit"
          type="submit"
          onClick={() => onClick()}
        >
          {children}
        </button>
      );
    else
      return (
        <button className="button-submit" type="submit">
          {children}
        </button>
      );
  return <></>;
};
