import { useEffect } from "react";
import { useState } from "react";
import axios from "../../api/axios";
import styles from "./conversation.module.css";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find(
      (member) => member !== currentUser._id
    );

    const getUser = async () => {
      try {
        const res = await axios.get(`/user/?userId=${friendId}`);
        setUser(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [conversation, currentUser._id]);

  return (
    <div className={styles.conversation}>
      <img
        className={styles.conversationImg}
        src={
          user?.profilePicture
            ? `${PF}profiles/${user.profilePicture}`
            : `${PF}profiles/noAvatar.png`
        }
        alt="user profile"
      />
      <span className={styles.name}>{user?.username}</span>
    </div>
  );
};
export default Conversation;
