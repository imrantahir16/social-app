import { Chat, Notifications, Search, Person } from "@mui/icons-material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span className={styles.logo}>Social App</span>
      </div>
      <div className={styles.center}>
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} />
          <input
            className={styles.input}
            placeholder="Search friends or post"
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.Links}>
          <a href="/" className={styles.link}>
            Homepage
          </a>
          <a href="/" className={styles.link}>
            Timeline
          </a>
        </div>
        <div className={styles.icons}>
          <div className={styles.icon}>
            <Person />
            <span className={styles.iconBadge}>1</span>
          </div>
          <div className={styles.icon}>
            <Chat />
            <span className={styles.iconBadge}>1</span>
          </div>
          <div className={styles.icon}>
            <Notifications />
            <span className={styles.iconBadge}>1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={`assets/${user.profilePicture}`}
            alt=""
            className={styles.profile}
          />
        </Link>
      </div>
    </div>
  );
};
export default NavBar;
