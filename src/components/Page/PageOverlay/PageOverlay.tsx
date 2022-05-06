import { X } from "@styled-icons/boxicons-regular";
import { useCallback, useEffect, useState } from "react";
import "./PageOverlay.scss";

interface PageOverlayProps {
  title?: string;
  onClose: CallableFunction;
}

export const PageOverlay: React.FC<PageOverlayProps> = ({
  title,
  children,
  onClose,
}) => {
  const close = () => {
    onClose();
  };

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

interface PageOverlayHashedProps extends Partial<PageOverlayProps> {
  hash: string;
  onClose?: PageOverlayProps["onClose"];
}
export const PageOverlayHashed: React.FC<PageOverlayHashedProps> = ({
  title,
  children,
  hash,
  onClose,
}) => {
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
      if (onClose) {
        onClose();
      }
    } else {
      html.classList.add("preventScroll");
    }

    setVisible(_visible);
  }, [hash, onClose]);

  useEffect(() => {
    window.addEventListener("hashchange", hashChange);
    hashChange();
    return () => {
      window.removeEventListener("hashchange", hashChange);
    };
  }, [hashChange]);

  const finalOnClose = useCallback(() => {
    if (onClose) onClose();
    close();
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <PageOverlay onClose={finalOnClose} title={title}>
      {children}
    </PageOverlay>
  );
};
