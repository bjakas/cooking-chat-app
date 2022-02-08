import React, { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage/index";
import Header from "./components/Header";
import Messages from "./components/Messages/index";
import InputField from "./components/InputField/index";

function App(props) {
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

  // when we are setting state in order to prevent rerendering we use useEffect to tacle side effects in React
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

      // All messages move within rooms. In order to listen to messages we need to subscribe to a specific room (user can connect to multiple rooms - this does not create extra connections)

      const room = drone.subscribe("observable-room"); // observable rooms act like regular rooms but provide additional functionality for keeping track of connected members and linking messages to members

      room.on("message", (message) => {
        const { member, data, id, timestamp } = message; // one more is clientId // destructuring message we get data, id, clientId, timestamp and member
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
