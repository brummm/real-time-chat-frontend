import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { StyledIcon } from "@styled-icons/styled-icon";
import "./Button.scss";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: StyledIcon;
  label: string;
}
export const Button: React.FC<Props> = (props) => {
  const { icon: Icon, label, type = "button" } = props;
  return (
    <div className="Button">
      <button {...props}>
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

export default Button;
