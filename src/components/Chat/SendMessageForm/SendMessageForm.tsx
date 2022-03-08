import { Send } from "@styled-icons/boxicons-solid";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import "./SendMessageForm.scss";

export type MessageSize = {
  size: "normal" | "medium" | "large";
};

const styleIntVal = (element: HTMLElement, style: string): number => {
  // @ts-ignore
  const value = window.getComputedStyle(element)[style].replace(/[^0-9]/gi, "");
  return parseInt(value);
};

let initialPadding: number;
let textAreaLineHeight: number;

const MAX_LINES = 3;
interface Props {
  updateMessageSize?: (size: MessageSize["size"]) => void;
  sendMessage: (message: string) => void;
}
export const SendMessageForm: React.FC<Props> = ({
  updateMessageSize,
  sendMessage,
}) => {
  const [message, setMessage] = useState("");
  const [messageSize, setMessageSize] = useState<MessageSize["size"]>("normal");
  const messageInputRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (messageInputRef.current) {
      initialPadding =
        styleIntVal(messageInputRef.current, "paddingTop") +
        styleIntVal(messageInputRef.current, "paddingBottom");
      textAreaLineHeight = styleIntVal(messageInputRef.current, "lineHeight");
    }
  }, []);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message !== "") {
      sendMessage(message);
      setMessage("");
      if (messageInputRef.current) {
        messageInputRef.current.innerText = "";
        updateTextareaHeight(messageInputRef.current);
      }
    }
  };

  const evaluateMessageSize = (lines: number) => {
    let size: MessageSize["size"] = "normal";
    if (lines === 2) size = "medium";
    if (lines >= 3) size = "large";
    return size;
  };

  const updateTextareaHeight = (textarea: HTMLParagraphElement): void => {
    let lines =
      Math.ceil(
        (textarea.scrollHeight - initialPadding) / textAreaLineHeight
      ) || 1;
    if (lines > MAX_LINES) lines = MAX_LINES;

    const newMessageSize = evaluateMessageSize(lines);
    if (newMessageSize !== messageSize) {
      setMessageSize(newMessageSize);
      if (updateMessageSize) {
        updateMessageSize(newMessageSize);
      }
    }
  };

  const handleChange = (e: FormEvent<HTMLParagraphElement>) => {
    const text = messageInputRef.current?.innerText || "";
    updateTextareaHeight(e.currentTarget);
    setMessage(text);
  };

  return (
    <form className={`SendMessageForm ${messageSize}`} onSubmit={submit}>
      <p
        className="messageInput"
        ref={messageInputRef}
        placeholder="Type here..."
        onInput={handleChange}
        contentEditable
      />
      <button type="submit">
        <Send title="Send Message." size={24} />
      </button>
    </form>
  );
};

export default SendMessageForm;
