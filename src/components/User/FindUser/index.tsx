import { Search, User } from "@styled-icons/boxicons-regular";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser, fetchUserAPI, useLoadAPI } from "../../../lib/api";
import { validateUsername } from "../../../lib/models/user";
import ErrorMessage from "../../ErrorMessage";
import Button from "../../Form/Button";
import InputText, { InputTextState } from "../../Form/InputText";

export const FindUser: React.FC = () => {
  const [formData, setFormData] = useState<InputTextState>({});
  const [call, loading, data, error] = useLoadAPI(() => {
    return fetchUserAPI(formData.username.value);
  });
  const navigate = useNavigate();
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.username.valid) call();
  };

  useEffect(() => {
    if (data) {
      navigate(`/chats/${formData.username.value}`);
    }
  }, [data]);

  return (
    <div className="FindUser">
      <form onSubmit={onSubmit}>
        <div className="input">
          <InputText
            label="Username"
            validate={validateUsername}
            name="username"
            icon={User}
            state={[formData, setFormData]}
          />
        </div>
        <div className="button">
          <Button label="Find User" type="submit" icon={Search} />
        </div>
        {error && <ErrorMessage message="Usuário não encontrado." />}
      </form>
    </div>
  );
};

export default FindUser;
