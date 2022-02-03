import React from "react";
import './InputText.scss';

interface Props {
  label: string;
  name: string;
}
export const InputText: React.FC<Props> = ({ label, name }) => {
  return (
    <div className="formGroup">
      <input type="text" name={name} id={`input_${name}`} placeholder={label} required />
      <label htmlFor={`input_${name}`}>{label}</label>
    </div>
  );
};

export default InputText;
