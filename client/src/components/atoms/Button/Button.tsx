import "./Button.scss";

import { ReactNode } from "react";

interface Props {
  func?: () => void;
  type: "submit";
  children: ReactNode;
}

export const Button = ({ func, type = "submit", children }: Props) => {
  if (type === "submit")
    if (func)
      return (
        <button className="button-submit" type="submit" onClick={() => func()}>
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
