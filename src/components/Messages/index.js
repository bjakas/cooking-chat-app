import "./Messages.css";

const Messages = (props) => {
  console.log(props.currentMember);
  const renderMessage = (message) => {
    const { member, data, id, timestamp } = message;
    const messageFromMe = member.id === props.currentMember.id;
    const className = messageFromMe
      ? "messages--message currentMember"
      : "messages--message";

    const setTimestamp = (timestamp) => {
      const date = new Date(timestamp * 1000);
      // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
      return date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    };

    return (
      <li className={className} key={id}>
        {/* avatar & username */}
        <div className="info--content">
          <span className="username">{member.clientData.username}</span>
          <img className="avatar" src={member.clientData.avatar} alt="avatar" />
        </div>
        {/* text */}
        <div className="message--content">
          <p className="text">{data}</p>
          <span className="timestamp">{setTimestamp(timestamp)}</span>
        </div>
      </li>
    );
  };

  return (
    <div className="App-chat-page--messages-field">
      <ul className="messages--list">
        {props.messages.map((item) => renderMessage(item))}
      </ul>
    </div>
  );
};

export default Messages;
