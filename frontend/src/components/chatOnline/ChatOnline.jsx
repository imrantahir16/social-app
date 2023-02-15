import { useEffect } from "react";
import { useState } from "react";
import axios from "../../api/axios";
import styles from "./chatOnline.module.css";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  console.log(onlineUsers);
  console.log(currentId);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`/user/friend/${currentId}`);
        setFriends(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends, onlineUsers]);

  const clickHandler = async (user) => {
    console.log(currentId);
    console.log(user._id);
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {onlineFriends.length === 0 && <p>No one is Online</p>}
      {onlineFriends.map((onlineF) => (
        <div
          key={onlineF._id}
          className={styles.onlineFriend}
          onClick={() => clickHandler(onlineF)}
        >
          <div className={styles.imgContainer}>
            <img
              className={styles.onlineImg}
              src={
                onlineF?.profilePicture
                  ? `${PF}profiles/${onlineF.profilePicture}`
                  : `${PF}profiles/noAvatar.png`
              }
              alt={`${onlineF.username}'s profile`}
            />
            <div className={styles.onlineBadge} />
          </div>
          <span>{onlineF.username}</span>
        </div>
      ))}
    </div>
  );
};
export default ChatOnline;
