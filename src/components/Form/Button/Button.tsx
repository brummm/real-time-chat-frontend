import { StyledIcon } from "@styled-icons/styled-icon";
import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from "react";
import { Link, LinkProps } from "react-router-dom";
import "./Button.scss";
import variables from '../../../styles/variables.scss';

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
          <span className="icon">
            <Icon size={28} fill={variables.pallete4} />
          </span>
        )}
        <span className="label">{label}</span>
      </button>
    </div>
  );
};

interface ButtonAnchorProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  icon?: StyledIcon;
}
export const ButtonAnchor: React.FC<ButtonAnchorProps> = (props) => {
  const { icon: Icon, children } = props;
  return (
    <div className="Button">
      <a {...props}>
        {Icon && (
          <span className="icon">
            <Icon size={28} fill={variables.pallete4} />
          </span>
        )}
        <span className="label">{children}</span>
      </a>
    </div>
  );
};


interface ButtonLinkProps
  extends LinkProps,
    React.RefAttributes<HTMLAnchorElement> {
  icon?: StyledIcon;
}
export const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
  const { icon: Icon, children, ...otherProps } = props;
  return (
    <div className="Button">
      <Link {...otherProps}>
        {Icon && (
          <span className="icon">
            <Icon size={28} fill={variables.pallete4} />
          </span>
        )}
        <span className="label">{children}</span>
      </Link>
    </div>
  );
};

export default Button;
