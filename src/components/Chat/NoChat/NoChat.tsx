import React from "react";

interface Props {
  isLoading: boolean;
  isError: boolean;
  error: string;
}
export const NoChat: React.FC<Props> = ({ isLoading, isError, error }) => {
  return <div>NoChat</div>;
};
