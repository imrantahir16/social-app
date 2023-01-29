import { Link } from "react-router-dom";
import styles from "./closedFriends.module.css";

const ClosedFriends = ({ friend }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log("colose friend");
  // console.log(friend);
  return (
    <Link className={styles.link} to={`/profile/${friend.username}`}>
      <li className={styles.friend}>
        <img
          className={styles.image}
          src={
            friend.profilePicture
              ? `${PF}profiles/${friend.profilePicture}`
              : `${PF}profiles/noAvatar.png`
          }
          alt={`${friend.username}'s profile`}
        />
        <span className={styles.name}>{friend.username}</span>
      </li>
    </Link>
  );
};
export default ClosedFriends;
