import {
  Bookmark,
  Chat,
  Event,
  Group,
  HelpOutline,
  PlayCircleFilledOutlined,
  RssFeed,
  School,
  WorkOutline,
} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import ClosedFriends from "../closedFriends/ClosedFriends";
import styles from "./leftSideBar.module.css";

const LeftSideBar = () => {
  const { user } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // console.log(user);
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/user/friend/" + user._id);
        // console.log("leftsidebar friendlist");
        // console.log(friendList.data);
        setFriends(friendList.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFriends();
  }, [user._id]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          <li key={1} className={styles.listItem}>
            <RssFeed className={styles.icon} />
            <span className={styles.listItemText}>Feed</span>
          </li>
          <li key={2} className={styles.listItem}>
            <Chat className={styles.icon} />
            <span className={styles.listItemText}>Chats</span>
          </li>
          <li key={3} className={styles.listItem}>
            <PlayCircleFilledOutlined className={styles.icon} />
            <span className={styles.listItemText}>Videos</span>
          </li>
          <li key={4} className={styles.listItem}>
            <Group className={styles.icon} />
            <span className={styles.listItemText}>Groups</span>
          </li>
          <li key={5} className={styles.listItem}>
            <Bookmark className={styles.icon} />
            <span className={styles.listItemText}>Bookmark</span>
          </li>
          <li key={6} className={styles.listItem}>
            <HelpOutline className={styles.icon} />
            <span className={styles.listItemText}>Questions</span>
          </li>
          <li key={7} className={styles.listItem}>
            <WorkOutline className={styles.icon} />
            <span className={styles.listItemText}>Jobs</span>
          </li>
          <li key={8} className={styles.listItem}>
            <Event className={styles.icon} />
            <span className={styles.listItemText}>Events</span>
          </li>
          <li key={9} className={styles.listItem}>
            <School className={styles.icon} />
            <span className={styles.listItemText}>Course</span>
          </li>
        </ul>
        <button className={styles.button}>Show more</button>
        <hr className={styles.hr} />
        <ul className={styles.friendsList}>
          {friends.length ? (
            friends.map((friend) => (
              <ClosedFriends key={friend._id} friend={friend} />
            ))
          ) : (
            <p>No friends</p>
          )}
        </ul>
      </div>
    </div>
  );
};
export default LeftSideBar;
