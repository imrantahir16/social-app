import styles from "./message.module.css";
import { format } from "timeago.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../api/axios";

const Message = ({ message, own }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.get(`/user/?userId=${message.sender}`);
        // console.log(res.data.profilePicture);
        setProfilePic(res.data.profilePicture);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, [message.sender]);

  return (
    <div className={`${styles.message} ${own ? styles.ownMessage : ""}`}>
      <div className={styles.messageTop}>
        <img
          className={styles.messageImg}
          src={
            profilePic
              ? `${PF}profiles/${profilePic}`
              : `${PF}profiles/noAvatar.png`
          }
          alt="user profile"
        />
        <p className={styles.messageText}>{message.text}</p>
      </div>
      <div className={styles.messageBottom}>{format(message.createdAt)}</div>
    </div>
  );
};
export default Message;
