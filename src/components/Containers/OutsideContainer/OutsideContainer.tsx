import React from "react";
import "./OutsideContainer.scss";

interface Props {
  size?: "small" | "medium" | "large" | "auto";
}
export const OutsideContainer: React.FC<Props> = ({
  children,
  size = "auto",
}) => {
  return <div className={`OutsideContainer ${size}`}>{children}</div>;
};

export default OutsideContainer;
