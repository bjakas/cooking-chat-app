import React, { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage/index";
import Header from "./components/Header";
import Messages from "./components/Messages/index";
import InputField from "./components/InputField/index";

function App() {
  const [chatState, setChatState] = useState({
    messages: [],
    member: {
      username: "",
      avatar: "",
    },
  });

  const enterChat = (username, avatar) => {
    chatState.member = {
      username: username,
      avatar: avatar,
    };
    setChatState({ ...chatState }, chatState.member);
  };

  // connecting to a channel

  const [drone, setDrone] = useState(null);

  useEffect(() => {
    if (chatState.member.username !== "" && chatState.member.avatar !== "") {
      const drone = new window.Scaledrone("SLXKUvglcHAG7ZXm", {
        data: chatState.member,
      });
      setDrone(drone);
    }
  }, [chatState.member]);

  if (drone) {
    // a connection has been opened
    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      chatState.member.id = drone.clientId;
      setChatState({ ...chatState }, chatState.member);

      const room = drone.subscribe("observable-room"); // observable rooms act like regular rooms but provide additional functionality for keeping track of connected members and linking messages to members

      room.on("message", (message) => {
        const { member, data, id, timestamp } = message;
        chatState.messages.push({ member, data, id, timestamp });
        setChatState({ ...chatState }, chatState.messages);
      });
    });
  }

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message,
    });
  };

  return chatState.member.username === "" && chatState.member.avatar === "" ? (
    <LoginPage enterChat={enterChat} />
  ) : (
    <div className="App-chat-page">
      <Header />

      <Messages
        messages={chatState.messages}
        currentMember={chatState.member}
      />
      <InputField onSendMessage={onSendMessage} />
    </div>
  );
}

export default App;
