import { StyledIcon } from "@styled-icons/styled-icon";
import React, { useState } from "react";
import "./InputText.scss";

export interface InputTextState {
  [name: string]: {
    value: string;
    valid: boolean;
  };
}
interface Props {
  label: string;
  name: string;
  icon?: StyledIcon;
  type?: string;
  validate(data: any): void;
  state: [stateValue: any, setStateValue: CallableFunction];
}
export const InputText: React.FC<Props> = ({
  label,
  name,
  icon: Icon,
  type = "text",
  validate,
  state,
}) => {
  const classNames = ["InputText"];
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [gotBlurry, setGotBlurry] = useState(false);
  const [value, setValue] = useState("");
  const [stateValue, setStateValue] = state;

  const _validate = (inputValue: string): void => {
    try {
      validate(inputValue);
      setErrorMessage(null);
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    _validate(event.currentTarget.value);
    setGotBlurry(true);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (gotBlurry) {
      _validate(event.target.value);
    }
    setValue(event.target.value);

    let valid;
    try {
      validate(value);
      valid = true;
    } catch (e) {
      valid = false;
    }
    setStateValue({
      ...stateValue,
      [event.target.name]: {
        value,
        valid,
      },
    });
  };

  if (Icon) {
    classNames.push("hasIcon");
  }

  if (errorMessage) {
    classNames.push("hasError");
  }

  return (
    <div className={classNames.join(" ")}>
      {Icon && (
        <div className="icon">
          <Icon width={18} fill="#2f2f2f" />
        </div>
      )}
      <input
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        id={`input_${name}`}
        placeholder={label}
        value={value}
        required
      />
      <label htmlFor={`input_${name}`}>{label}</label>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default InputText;
