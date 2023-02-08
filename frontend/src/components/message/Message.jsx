import styles from "./message.module.css";
import { format } from "timeago.js";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Message = ({ message, own }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  return (
    <div className={`${styles.message} ${own ? styles.ownMessage : ""}`}>
      <div className={styles.messageTop}>
        <img
          className={styles.messageImg}
          src={
            user?.profilePicture
              ? `${PF}profiles/${user.profilePicture}`
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
