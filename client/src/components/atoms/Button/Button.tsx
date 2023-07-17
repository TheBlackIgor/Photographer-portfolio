import "./Button.scss";

import { ReactNode } from "react";

import { AddIcon } from "@/assets";

interface Props {
  onClick?: () => void;
  type: "submit" | "add" | "simple";
  children: ReactNode | string;
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
  else if (type === "add")
    return (
      <button className="button-submit" onClick={onClick}>
        <AddIcon />
        {children}
      </button>
    );
  else if (type === "simple")
    return (
      <button className="button-simple" onClick={onClick}>
        {children}
      </button>
    );
  return <></>;
};
