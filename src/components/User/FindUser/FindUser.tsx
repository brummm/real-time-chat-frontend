import { Search } from "@styled-icons/boxicons-regular";
import { User as UserIcon } from "@styled-icons/boxicons-regular/User";
import { Formik } from "formik";
import React, { useCallback } from "react";
import * as yup from "yup";
import { useUserContext } from "../../../contexts/UserContext";
import { useLoadAPI } from "../../../lib/api";
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
  const { user } = useUserContext();
  const { call, loading, data, error } = useLoadAPI((username: string) =>
    axios.get(`/users/profile/${username}`)
  );

  const onSubmit = useCallback(
    async (values) => {
      call(values.username);
    },
    [call]
  );

  const validations = yup.object({
    username: yup
      .string()
      .required("username is required.")
      .test(
        "is-not-current",
        (d) => "Do you want to chat with yourself?",
        (value) => !(excludeCurrentUser && value === user?.userName)
      ),
  });

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
