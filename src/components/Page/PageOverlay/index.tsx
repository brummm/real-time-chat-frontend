import { X } from "@styled-icons/boxicons-regular";
import { useCallback, useEffect, useState } from "react";
import "./PageOverlay.scss";

interface Props {
  hash: string;
  title?: string;
}
export const PageOverlay: React.FC<Props> = ({ title, children, hash }) => {
  const [visible, setVisible] = useState(false);

  const close = () => {
    window.history.back();
  };

  const hashChange = useCallback(() => {
    const _visible = (window.location.hash &&
      window.location.hash === hash) as boolean;

    const html = document.getElementsByTagName("html")[0];
    if (!_visible) {
      html.classList.remove("preventScroll");
    } else {
      html.classList.add("preventScroll");
    }

    setVisible(_visible);
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", hashChange);
    hashChange();
    return () => {
      window.removeEventListener("hashchange", hashChange);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="PageOverlay">
      <div className="overlay" onClick={close}></div>
      <div className="window">
        <header>
          {title && <h2>{title}</h2>}
          <button
            className="close"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              close();
            }}
          >
            <X size={30} />
          </button>
        </header>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default PageOverlay;
