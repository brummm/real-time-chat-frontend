import { Search } from "@styled-icons/boxicons-regular";
import { User as UserIcon } from "@styled-icons/boxicons-regular/User";
import React, { useCallback, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import { fetchUserAPI, useLoadAPI } from "../../../lib/api";
import { User, validateUsername } from "../../../lib/models/user";
import ErrorMessage from "../../Error/ErrorMessage/ErrorMessage";
import Button from "../../Form/Button/Button";
import InputText, { InputTextState } from "../../Form/InputText/InputText";
import Loading from "../../Loading/Loading";
import UserCard from "../UserCard/UserCard";
import "./FindUser.scss";

export const FindUser: React.FC<{
  selectUserCallback: (user: User) => void;
  excludeCurrentUser?: boolean;
}> = ({ selectUserCallback, excludeCurrentUser = true }) => {
  const { user } = useUserContext();
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

  const preventSelectionForCurrentUser = useCallback(
    (input: string) => {
      if (excludeCurrentUser && input === user?.userName) {
        throw Error("Do you want to chat with yourself?");
      }
    },
    [excludeCurrentUser]
  );

  return (
    <div className="FindUser">
      <form onSubmit={onSubmit}>
        <div className="input">
          <InputText
            label="Username"
            validate={(input: string) => {
              preventSelectionForCurrentUser(input);
              validateUsername(input);
            }}
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
        {error && <ErrorMessage message={error} />}

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
