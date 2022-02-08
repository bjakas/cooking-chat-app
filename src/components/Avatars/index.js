import React from "react";
import "./Avatars.css";

import avatar1 from "../../svg/avatar1.svg";
import avatar2 from "../../svg/avatar2.svg";
import avatar3 from "../../svg/avatar3.svg";
import avatar4 from "../../svg/avatar4.svg";
import avatar5 from "../../svg/avatar5.svg";
import avatar6 from "../../svg/avatar6.svg";
import avatar7 from "../../svg/avatar7.svg";
import avatar8 from "../../svg/avatar8.svg";
import avatar9 from "../../svg/avatar9.svg";
import avatar10 from "../../svg/avatar10.svg";
import avatar11 from "../../svg/avatar11.svg";
import avatar12 from "../../svg/avatar12.svg";
import avatar13 from "../../svg/avatar13.svg";
import avatar14 from "../../svg/avatar14.svg";
import avatar15 from "../../svg/avatar15.svg";
import avatar16 from "../../svg/avatar16.svg";

const Avatars = (props) => {
  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
    avatar11,
    avatar12,
    avatar13,
    avatar14,
    avatar15,
    avatar16,
  ];

  return (
    <ul className="list--avatars">
      {avatars.map((item, index) => {
        return (
          <li key={Math.random().toString()}>
            <img
              className="img--avatar"
              src={item}
              alt={`Avatar ${index + 1}`}
              onClick={props.selectedAvatar}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Avatars;
