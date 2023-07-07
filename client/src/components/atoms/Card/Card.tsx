import "./Card.scss";

import { useNavigate } from "react-router";

interface CardProps {
  icon?: JSX.Element | null;
  children: JSX.Element;
  to?: string;
}

export const Card = ({ icon = null, children, to }: CardProps) => {
  const navigate = useNavigate();

  if (to)
    return (
      <button className="card-main" onClick={() => navigate(to)}>
        {icon} {children}
      </button>
    );
  else
    return (
      <button className="card-main">
        {icon} {children}
      </button>
    );
};
