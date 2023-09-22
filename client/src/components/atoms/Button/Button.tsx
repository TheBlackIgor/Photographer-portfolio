import "./Button.scss";

import { ReactNode } from "react";

import { AddIcon } from "@/assets";

interface Props {
  onClick?: () => void;
  type: "submit" | "add" | "simple";
  children: ReactNode | string;
  disabled?: boolean;
}

export const Button = ({
  onClick,
  type = "submit",
  children,
  disabled = false,
}: Props) => {
  if (type === "submit")
    if (onClick)
      return (
        <button
          className=" button-submit"
          type="submit"
          disabled={disabled}
          onClick={() => onClick()}
        >
          {children}
        </button>
      );
    else
      return (
        <button className=" button-submit" type="submit" disabled={disabled}>
          {children}
        </button>
      );
  else if (type === "add")
    return (
      <button className=" button-submit" disabled={disabled} onClick={onClick}>
        <AddIcon />
        {children}
      </button>
    );
  else if (type === "simple")
    return (
      <button className=" button-simple" disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  return <></>;
};
