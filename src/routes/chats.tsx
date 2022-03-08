import ChatList from "../components/Chat/ChatList/ChatList";
import { Page } from "../components/Page/Page";

export default function ChatsRoute() {
  return (
    <Page variation="top">
      <ChatList />
    </Page>
  );
}
