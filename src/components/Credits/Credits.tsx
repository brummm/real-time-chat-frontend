import axios, { AxiosError } from "axios";
import { marked } from "marked";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { Fingerprint } from "@styled-icons/boxicons-regular";
import "./Credits.scss";

const Credits: React.FC = () => {
  const { isLoading, data, isError, error } = useQuery<Props, AxiosError>(
    "CREDITS",
    async () => {
      const { data } = await axios.get("https://api.github.com/users/brummm");
      return data;
    }
  );

  return (
    <div className="Credits">
      {isLoading && <Loading />}
      {isError && error && (
        <p>There was an error while trying to load the data.</p>
      )}
      {data && <GitHubProfile {...data} />}
    </div>
  );
};

interface Props {
  bio: string;
  name: string;
  avatar_url: string;
  location: string;
  html_url: string;
}
const GitHubProfile: React.FC<Props> = ({
  bio,
  name,
  avatar_url,
  location,
  html_url,
}) => {
  return (
    <>
      <header>
        <figure>
          <img src={avatar_url} alt="Me." />
        </figure>
        <div>
          <h2>{name}</h2>
          <p>{location}</p>
        </div>
      </header>
      <div className="text" dangerouslySetInnerHTML={{ __html: marked(bio) }} />
      <footer>
        <a href={html_url} target="_blank" rel="noreferrer">
          <Fingerprint size={20} />
          <span>Check my GitHub Profile</span>
        </a>
      </footer>
    </>
  );
};

export default Credits;
