import { useTheme } from "@/theme";
import "./Loader.scss";

interface PropsI {
  message?: string;
}

export const Loader = ({ message }: PropsI) => {
  const theme = useTheme();
  return (
    <div
      className="loader-main"
      style={{
        backgroundColor: theme.theme.backgroundColor,
      }}
    >
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
      </div>
      <h4>{message}</h4>
    </div>
  );
};
