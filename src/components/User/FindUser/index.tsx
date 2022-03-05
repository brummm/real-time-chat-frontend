import { Search } from "@styled-icons/boxicons-regular";
import { User as UserIcon } from "@styled-icons/boxicons-regular/User";
import React, { useCallback, useState } from "react";
import { fetchUserAPI, useLoadAPI } from "../../../lib/api";
import { User, validateUsername } from "../../../lib/models/user";
import ErrorMessage from "../../Error/ErrorMessage";
import Button from "../../Form/Button";
import InputText, { InputTextState } from "../../Form/InputText";
import Loading from "../../Loading";
import UserCard from "../UserCard";
import "./FindUser.scss";

export const FindUser: React.FC<{
  selectUserCallback: (user: User) => void;
}> = ({ selectUserCallback }) => {
  const [formData, setFormData] = useState<InputTextState>({});
  const [call, loading, data, error] = useLoadAPI(() => {
    return fetchUserAPI(formData.username.value);
  });

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (formData.username.valid) call();
    },
    [formData]
  );

  const onFoundUserClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (selectUserCallback) {
        selectUserCallback(data.user);
      }
    },
    [selectUserCallback, data]
  );

  return (
    <div className="FindUser">
      <form onSubmit={onSubmit}>
        <div className="input">
          <InputText
            label="Username"
            validate={validateUsername}
            name="username"
            icon={UserIcon}
            state={[formData, setFormData]}
          />
        </div>
        <div className="button">
          <Button label="Find User" type="submit" icon={Search} />
          {loading && (
            <div className="loading">
              <Loading size="extra-small" />
            </div>
          )}
        </div>
        {error && <ErrorMessage message="Usuário não encontrado." />}

        {data && (
          <button className="user" onClick={onFoundUserClick}>
            <UserCard user={data.user} />
          </button>
        )}
      </form>
    </div>
  );
};

export default FindUser;
