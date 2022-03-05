import React from "react";
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import Page from "../Page";
import "./Loading.scss";

export interface LoadingProps {
  size?: "extra-small" | "small" | "medium";
  speed?: number;
}

const resolveSize = (size: LoadingProps["size"]): number => {
  if (size === "extra-small") return 18;
  if (size === "small") return 32;
  return 56;
};
export const Loading: React.FC<LoadingProps> = ({
  size = "small",
  speed = 1,
}) => {
  const resolvedSize = resolveSize(size);
  return (
    <>
      <Spinner
        color="#2F2F2F"
        size={resolvedSize}
        speed={speed}
        animating={true}
      />
    </>
  );
};

export const LoadingCentered: React.FC<LoadingProps> = (props) => {
  return (
    <div className="centerd">
      <Loading {...props} />
    </div>
  );
};

export const LoadingPage: React.FC<LoadingProps> = ({
  size = "medium",
  ...props
}) => {
  return (
    <Page>
      <div className="centeredPage">
        <Loading size={size} {...props} />
      </div>
    </Page>
  );
};
export default Loading;
