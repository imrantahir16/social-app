import styles from "./online.module.css";
const Online = ({ user }) => {
  return (
    <li className={styles.friend}>
      <div className={styles.profileImgContainer}>
        <img
          className={styles.profile}
          src={user.profilePicture}
          alt={`${user.username}'s profile`}
        />
        <span className={user.online ? styles.online : styles.offline} />
      </div>
      <span className={styles.username}>{user.username}</span>
    </li>
  );
};
export default Online;
