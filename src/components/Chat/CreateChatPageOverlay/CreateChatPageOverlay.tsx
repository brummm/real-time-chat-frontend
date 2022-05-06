import { AxiosError } from "axios";
import React, { useCallback, useEffect } from "react";
import { useMutation } from "react-query";
import axios from "../../../lib/axios";
import { Chat } from "../../../lib/models/chat";
import { User } from "../../../lib/models/user";
import ErrorMessage from "../../Error/ErrorMessage/ErrorMessage";
import Loading from "../../Loading/Loading";
import { PageOverlay } from "../../Page/PageOverlay/PageOverlay";
import FindUser from "../../User/FindUser/FindUser";

export const NEW_CHAT_ANCHOR = "#new-chat";

interface Props {
  onCreateChat: (chat: Chat) => void;
  onClose: () => void;
}
export const CreateChatPageOverlay: React.FC<Props> = ({
  onCreateChat,
  onClose,
}) => {
  const {
    mutate: createChat,
    data: dataCreateChat,
    isError: isErrorCreateChat,
    error: errorCreateChat,
    isLoading: isLoadingCreateChat,
  } = useMutation<Chat, AxiosError, { userIds: string[] }>(
    async (params): Promise<Chat> => {
      const { data } = await axios.post("/chats", params);
      return data.chat;
    }
  );

  const selectUserCallback = useCallback(
    async (user: User) => {
      createChat({ userIds: [user._id] });
    },
    [createChat]
  );

  useEffect(() => {
    if (dataCreateChat) {
      console.log(dataCreateChat);
      onCreateChat(dataCreateChat);
    }
  }, [dataCreateChat, onCreateChat]);

  return (
    <PageOverlay onClose={onClose} title="Find user to start chatting">
      <FindUser selectUserCallback={selectUserCallback} />
      {isLoadingCreateChat && <Loading />}
      {isErrorCreateChat && errorCreateChat && (
        <ErrorMessage message={errorCreateChat.message} />
      )}
    </PageOverlay>
  );
};
