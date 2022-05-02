import { Search } from "@styled-icons/boxicons-regular";
import { User as UserIcon } from "@styled-icons/boxicons-regular/User";
import { AxiosError } from "axios";
import { Formik } from "formik";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import * as yup from "yup";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "../../../lib/axios";
import { User } from "../../../lib/models/user";
import ErrorMessage from "../../Error/ErrorMessage/ErrorMessage";
import Button from "../../Form/Button/Button";
import InputText from "../../Form/InputText/InputText";
import Loading from "../../Loading/Loading";
import UserCard from "../UserCard/UserCard";
import "./FindUser.scss";

export const FindUser: React.FC<{
  selectUserCallback: (user: User) => void;
  excludeCurrentUser?: boolean;
}> = ({ selectUserCallback, excludeCurrentUser = true }) => {
  const { user: userInContext } = useAuth();
  const [username, setUsername] = useState<string>();

  const {
    isLoading,
    data: user,
    isError,
    error,
  } = useQuery<User, AxiosError>(
    ["USER", username],
    async () => {
      const { data } = await axios.get(`/users/profile/${username}`);
      return data.user;
    },
    { enabled: username !== undefined }
  );

  const onSubmit = useCallback(async (values) => {
    setUsername(values.username);
  }, []);

  const validations = yup.object({
    username: yup
      .string()
      .required("username is required.")
      .test(
        "is-not-current",
        (d) => "Do you want to chat with yourself?",
        (value) => !(excludeCurrentUser && value === userInContext?.userName)
      ),
  });

  const onFoundUserClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (selectUserCallback && user) {
        selectUserCallback(user);
      }
    },
    [selectUserCallback, user]
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
          <form onSubmit={handleSubmit}>
            <div className="input">
              <InputText
                label="Username"
                name="username"
                value={values.username}
                error={errors.username}
                onBlur={handleBlur}
                onChange={handleChange}
                icon={UserIcon}
              />
            </div>
            <div className="button">
              <Button label="Find User" type="submit" icon={Search} />
              {isLoading && (
                <div className="loading">
                  <Loading size="extra-small" />
                </div>
              )}
            </div>
            {isError && error && <ErrorMessage message={error.message} />}

            {user && (
              <button className="user" onClick={onFoundUserClick}>
                <UserCard user={user} />
              </button>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FindUser;
