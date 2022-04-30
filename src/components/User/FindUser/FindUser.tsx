import { Search } from "@styled-icons/boxicons-regular";
import { User as UserIcon } from "@styled-icons/boxicons-regular/User";
import { Formik } from "formik";
import React, { useCallback, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import { useLoadAPI } from "../../../lib/api";
import axios from "../../../lib/axios";
import { User, validateUsername } from "../../../lib/models/user";
import ErrorMessage from "../../Error/ErrorMessage/ErrorMessage";
import Button from "../../Form/Button/Button";
import InputText, { InputTextState } from "../../Form/InputText/InputText";
import Loading from "../../Loading/Loading";
import UserCard from "../UserCard/UserCard";
import "./FindUser.scss";
import * as yup from "yup";

const validations = yup.object({
  username: yup.string().required("First name is required."),
});
export const FindUser: React.FC<{
  selectUserCallback: (user: User) => void;
  excludeCurrentUser?: boolean;
}> = ({ selectUserCallback, excludeCurrentUser = true }) => {
  const { user } = useUserContext();
  const [formData, setFormData] = useState<InputTextState>({});
  const { call, loading, data, error } = useLoadAPI(() => {
    return axios.get(`/users/profile/${formData.username.value}`);
  });

  const onSubmit = useCallback(async () => {
    call();
  }, [call]);

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
    [excludeCurrentUser, user?.userName]
  );

  return (
    <div className="FindUser">
      <Formik
        initialValues={{
          username: "",
        }}
        onSubmit={onSubmit}
        validationSchema={validations}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form>
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
        )}
      </Formik>
    </div>
  );
};

export default FindUser;
