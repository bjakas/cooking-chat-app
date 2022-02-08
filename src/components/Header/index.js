import "./Header.css";
import CookingLogo from "../../images/Cooking.png";

const Header = () => {
  return (
    <div className="App-chat-page--header">
      <img className="cooking-icon" src={CookingLogo} alt="cooking-logo" />
      <h1 className="App-chat-page--header_h1">Chatting chefs</h1>
      <h2 className="App-chat-page--header_h2">Let's get cooking</h2>
    </div>
  );
};

export default Header;
