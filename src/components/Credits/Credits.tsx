import axios, { AxiosError } from "axios";
import { marked } from "marked";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import "./Credits.scss";

const Credits: React.FC = () => {
  const { isLoading, data, isError, error } = useQuery<string, AxiosError>(
    "CREDITS",
    async () => {
      const { data } = await axios.get(
        "https://raw.githubusercontent.com/brummm/brummm/main/README.md"
      );
      return data;
    }
  );

  return (
    <div className="Credits">
      {isLoading && <Loading />}
      {isError && error && (
        <p>There was an error while trying to load the data.</p>
      )}
      {data && (
        <div
          className="text"
          dangerouslySetInnerHTML={{ __html: marked(data) }}
        />
      )}
    </div>
  );
};

export default Credits;
