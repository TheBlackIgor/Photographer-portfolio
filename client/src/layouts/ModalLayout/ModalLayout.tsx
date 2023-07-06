/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import "./ModalLayout.scss";

interface ModalLayoutProps {
  children: JSX.Element;
  close: () => void;
}

export const ModalLayout = ({ children, close }: ModalLayoutProps) => {
  return (
    <div className="modal-layout-main">
      <div className="modal-layout-bg" onClick={close} />
      <div className="modal-layout-content">{children}</div>
    </div>
  );
};
