"use client";

import styles from "@/app/room/[roomID]/page.module.css";
import useFrontendStore from "@/app/store";
import Avataar from "@/components/Avataar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

type Message = {
  from: string;
  content: string;
  roomID: string;
  type: string;
  level: number;
  id: string;
};

function RoomPage({ params }: { params: { roomID: string } }) {
  const router = useRouter();
  const { roomID } = params;
  const { browserId } = useFrontendStore();
  var wsURL = "ws://localhost:8080/join?room=" + roomID + "&uuid=" + browserId;

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket(wsURL);
    setWs(ws);
    ws.onopen = () => {
      console.log("Connected to server");
    };
    ws.onmessage = (event) => {
      console.log(event.data);
      const message = JSON.parse(event.data) as Message;
      if (message.level === 3 && message.type === "message") {
        setMessages((prevMessages) => [message, ...prevMessages]);
        console.log(messages);
      } else if (message.level === 0 && message.type === "error") {
        setNotification(message.content);
        // redirect to home page after 5 seconds
        setTimeout(() => {
          router.push("/");
        }, 5000);
      } else if (message.level === 2 && message.type === "notif") {
        setNotification(message.content);
      }
    };
    ws.onclose = () => {
      console.log("Disconnected from server");
    };
    return () => {
      ws.close();
    };
  }, [wsURL]);

  const sendMessage = (message: Message) => {
    if (!ws) {
      console.error("WebSocket not connected");
      return;
    }
    try {
      ws.send(JSON.stringify(message));
    } catch (error) {
      console.error(error);
    }
  };

  // clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification]);

  return (
    <div className={styles.roomPage}>
      <div className={styles.heading}>
        <h2>Game arena</h2>
        <p>{roomID}</p>
      </div>
      <br />
      {notification && (
        <div className={styles.notification}>
          <p>{notification}</p>
        </div>
      )}
      <div className={styles.messages} key={messages.length}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={styles.message}
            style={{
              flexDirection: message.from === browserId ? "row-reverse" : "row",
            }}
          >
            <p
              className={styles.messagecontent}
              style={{
                flexDirection:
                  message.from === browserId ? "row-reverse" : "row",
                padding:
                  message.from === browserId ? "0 0 0 10px" : "0 10px 0 0",
                textAlign: message.from === browserId ? "right" : "left",
              }}
            >
              <Avataar id={message.from} />
              <p>{message.content}</p>
            </p>
          </div>
        ))}
      </div>
      <div className={styles.textInput}>
        <input
          type="text"
          id="message"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
        <button
          onClick={() => {
            const message: Message = {
              from: browserId,
              content: text,
              roomID: roomID,
              type: "message",
              level: 3,
              id: v4(),
            };
            sendMessage(message);
            setText("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default RoomPage;
