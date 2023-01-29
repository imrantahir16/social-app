import styles from "./online.module.css";
const Online = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log("online user status");
  // console.log(user);
  return (
    <li className={styles.friend}>
      <div className={styles.profileImgContainer}>
        <img
          className={styles.profile}
          src={
            user.profilePicture
              ? `${PF}profiles/${user.profilePicture}`
              : `${PF}profiles/noAvatar.png`
          }
          alt={`${user.username}'s profile`}
        />
        <span className={user.online ? styles.online : styles.offline} />
      </div>
      <span className={styles.username}>{user.username}</span>
    </li>
  );
};
export default Online;
