import { MessageSquareX } from "@styled-icons/boxicons-solid";
import variables from "../../styles/variables.scss";
import ErrorMessage from "../Error/ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";

interface NoChatProps {
  isLoading: boolean;
  isError: boolean;
  error: string;
}
export const NoChat: React.FC<NoChatProps> = ({
  isLoading,
  isError,
  error,
  children,
}) => {
  return (
    <div className="NoChat">
      <div className="bg"></div>
      <main>
        {isLoading && <Loading />}
        {isError && <ErrorMessage message={error} />}
        {!isLoading && !isError && (
          <>
            <figure>
              <MessageSquareX size={90} fill={variables.pallete2} />
            </figure>
            <h3>Nothing to see here.</h3>
            <p className="text">
              Select a chat from the side bar or use the button bellow to start
              one.
            </p>
            <div className="children">{children}</div>
          </>
        )}
      </main>
    </div>
  );
};
