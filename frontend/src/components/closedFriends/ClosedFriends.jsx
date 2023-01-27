import styles from "./closedFriends.module.css";

const ClosedFriends = ({ user }) => {
  return (
    <li className={styles.friend}>
      <img
        className={styles.image}
        src={user.profilePicture}
        alt={`${user.username}'s profile`}
      />
      <span className={styles.name}>{user.username}</span>
    </li>
  );
};
export default ClosedFriends;
