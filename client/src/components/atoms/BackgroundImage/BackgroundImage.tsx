import React from "react";

import "./BackgroundImage.scss";
import { useTheme } from "@/theme";

interface PropsI {
  src: string;
  className?: string;
  children?: React.ReactNode | string;
}

export const BackgroundImage = ({ src, className, children }: PropsI) => {
  const theme = useTheme();

  return (
    <div className={"bg-container " + className}>
      <div className="bg-image">
        <img src={src} />
        <div
          className="bg-dark"
          style={{ backgroundColor: theme.theme.cover.imageDark }}
        ></div>
      </div>
      <div className="bg-content">{children}</div>
    </div>
  );
};
