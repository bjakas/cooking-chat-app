import "./InputField.css";
import React, { useState } from "react";

const InputField = (props) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    setInputMessage("");
    props.onSendMessage(inputMessage);
  };

  return (
    <div className="App-chat-page--input-field">
      <form className="form--message" onSubmit={handleSubmitMessage}>
        <input
          className="input--message"
          type="text"
          id="inputMessage"
          placeholder="Enter message here..."
          value={inputMessage}
          onChange={handleChange}
          required
        />
        <button className="button--message" type="submit">
          SEND MESSAGE
        </button>
      </form>
    </div>
  );
};

export default InputField;
