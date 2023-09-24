/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import "./Card.scss";

import { useNavigate } from "react-router";

import { apiUrl } from "@/constant";

interface CardProps {
  icon?: JSX.Element | null;
  children: JSX.Element | string;
  to?: string;
  img?: string;
  folderName?: string;
}

export const Card = ({
  icon = null,
  children,
  to,
  img,
  folderName,
}: CardProps) => {
  const navigate = useNavigate();

  if (to)
    return (
      <article className="card" onClick={() => navigate(to)}>
        <div className="card-imgbox">
          <div className="card-img">
            {img && (
              <img
                src={`${apiUrl}/api/thumb/${folderName}/${img}.jpg`}
                alt={img}
              />
            )}
          </div>
        </div>
        <div className="card-details">
          <h2 className="card-title">{children}</h2>
        </div>
      </article>
    );
  else
    return (
      <button className="card-main">
        {icon} {children}
      </button>
    );
};
