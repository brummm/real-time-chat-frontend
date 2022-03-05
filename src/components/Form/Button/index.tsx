import { StyledIcon } from "@styled-icons/styled-icon";
import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from "react";
import "./Button.scss";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: StyledIcon;
  label: string;
}
export const Button: React.FC<ButtonProps> = (props) => {
  const { icon: Icon, label, type = "button" } = props;
  return (
    <div className="Button">
      <button {...props} type={type}>
        {Icon && (
          <div className="icon">
            <Icon width={22} fill="#f7f7f2" />
          </div>
        )}
        <span>{label}</span>
      </button>
    </div>
  );
};

interface ButtonLinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  icon?: StyledIcon;
}
export const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
  const { icon: Icon, children } = props;
  return (
    <div className="Button">
      <a {...props}>
        {Icon && (
          <div className="icon">
            <Icon width={22} fill="#f7f7f2" />
          </div>
        )}
        <span>{children}</span>
      </a>
    </div>
  );
};

export default Button;
