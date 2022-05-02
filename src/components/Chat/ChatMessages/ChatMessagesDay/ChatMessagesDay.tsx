import { daysAreEqual } from "../../../../lib/date";
import "./ChatMessagesDay.scss";
interface Props {
  date: Date;
}

export const ChatMessagesDay: React.FC<Props> = ({ date }) => {
  let label = "";
  const today = new Date();
  const isToday = daysAreEqual(today, date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = daysAreEqual(yesterday, date);

  if (isToday) {
    label = "Today";
  } else if (isYesterday) {
    label = "Yesterday";
  } else {
    label = Intl.DateTimeFormat("en-US", {}).format(date);
  }

  return <div className="ChatMessagesDay">{label}</div>;
};
