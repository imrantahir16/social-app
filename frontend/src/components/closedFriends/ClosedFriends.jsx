import styles from "./closedFriends.module.css";

const ClosedFriends = ({ user }) => {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className={styles.friend}>
      <img
        className={styles.image}
        src={`assets/${user.profilePicture}`}
        alt={`${user.username}'s profile`}
      />
      <span className={styles.name}>{user.username}</span>
    </li>
  );
};
export default ClosedFriends;
