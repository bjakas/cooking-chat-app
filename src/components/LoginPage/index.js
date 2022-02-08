import React, { useState } from "react";
import Avatars from "../Avatars/index";
import "./LoginPage.css";

const LoginPage = (props) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
    console.log(event.target.value + " is the name that has been entered");
  };

  const handleSelectedAvatar = (event) => {
    setAvatar(event.target.src);
    console.log(event.target.src + " is the avatar that has been selected");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name !== "" && avatar !== "") {
      props.enterChat(name, avatar);
    }
    setName("");
    setAvatar("");
  };

  return (
    <div className="App-login-page" style={props.style}>
      <h1 className="App-login-page--h1">
        Welcome to the chat app tailored for chefs!
      </h1>
      <form action="" onSubmit={handleSubmit} className="card">
        <label className="label--name" htmlFor="name">
          Enter your name:
        </label>
        <input
          className="input--name"
          type="text"
          id="name"
          value={name}
          onChange={handleChange}
          required
        />
        <div className="avatar--section">
          <p className="avatar--text">Choose your avatar:</p>
          <Avatars src={avatar} selectedAvatar={handleSelectedAvatar} />
        </div>
        <div className="avatar--choosen">
          {avatar ? (
            <div>
              <span>{name} </span>
              <img className="img--avatar-choosen" src={avatar} alt="img" />
            </div>
          ) : (
            ""
          )}
        </div>
        <button className="button--login" type="submit">
          ENTER CHAT
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
