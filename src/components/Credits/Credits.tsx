import React, { useCallback, useEffect, useState } from "react";
import { marked } from "marked";
import "./Credits.scss";

const Credits: React.FC = () => {
  const [readmeText, setReadmeText] = useState("");
  const getReadmeFromGithub = useCallback(async () => {
    const readme = await fetch(
      "https://raw.githubusercontent.com/brummm/brummm/main/README.md"
    );
    try {
      const text = await readme.text();
      setReadmeText(marked(text));
    } catch (e) {
      return null;
    }
  }, []);
  useEffect(() => {
    getReadmeFromGithub();
  });
  //
  return (
    <div className="Credits">
      {readmeText && (
        <div
          className="text"
          dangerouslySetInnerHTML={{ __html: readmeText }}
        />
      )}
    </div>
  );
};

export default Credits;
