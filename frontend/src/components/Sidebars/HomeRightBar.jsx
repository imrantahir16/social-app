// import { Users } from "../../utils/DummyData";
import { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import Online from "../online/Online";
import styles from "./homeRightBar.module.css";
const HomeRightBar = () => {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    // console.log(user);
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/user/friend/" + user._id);
        // console.log("HomeRightBar friends list");
        // console.log(friendList.data);
        setFriends(friendList.data);
      } catch (error) {
        console.log("START");
        console.error(error);
        console.log("END");
      }
    };
    getFriends();
  }, [user]);
  return (
    <>
      <div className={styles.container}>
        <img className={styles.birthdayImg} src={PF + "/gift.png"} alt="" />
        <span className={styles.birthdayText}>
          <strong>John Doe</strong> and <strong>3 other friends</strong> have
          birthday today
        </span>
      </div>
      <img className={styles.ads} src={PF + "/post/1.jpg"} alt="company ads" />
      <h4 className={styles.title}>Online friends</h4>
      <ul className={styles.friendsList}>
        {friends.length ? (
          friends.map((user) => <Online key={user._id} user={user} />)
        ) : (
          <p>No friends</p>
        )}
      </ul>
    </>
  );
};
export default HomeRightBar;
