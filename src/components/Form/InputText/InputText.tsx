import { StyledIcon } from "@styled-icons/styled-icon";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import variables from "../../../styles/variables.scss";
import "./InputText.scss";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  icon?: StyledIcon;
  error?: string;
}
export const InputText: React.FC<Props> = (props) => {
  const {
    label,
    icon: Icon,
    type = "text",
    error,
    name,
    ...inputProps
  } = props;
  const classNames = ["InputText"];

  if (Icon) {
    classNames.push("hasIcon");
  }

  if (error !== undefined) {
    classNames.push("hasError");
  }

  return (
    <div className={classNames.join(" ")}>
      {Icon && (
        <div className="icon">
          <Icon width={18} fill={variables.pallete3} />
        </div>
      )}
      <input
        type={type}
        name={name}
        id={`input_${name}`}
        placeholder={label}
        {...inputProps}
      />
      <label htmlFor={`input_${name}`}>{label}</label>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default InputText;
