import ChatList from "../components/Chat/ChatList";
import { Page } from "../components/Page";

export default function ChatsRoute() {
  return (
    <Page variation="top">
      <ChatList />
    </Page>
  );
}
