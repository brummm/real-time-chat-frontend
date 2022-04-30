import axios from "axios";
import { marked } from "marked";
import React from "react";
import { useAutoLoadAPI } from "../../lib/api";
import Loading from "../Loading/Loading";
import "./Credits.scss";

const Credits: React.FC = () => {
  const { loading, data, error } = useAutoLoadAPI(() =>
    axios.get("https://raw.githubusercontent.com/brummm/brummm/main/README.md")
  );

  return (
    <div className="Credits">
      {loading && <Loading />}
      {error && <p>There was an error while trying to load the data.</p>}
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
