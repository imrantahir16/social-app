import { Chat, Notifications, Search, Person } from "@mui/icons-material";
import { useContext, useState } from "react";
import { Link, redirect } from "react-router-dom";
import styles from "./navBar.module.css";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState("");

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const logoutHandler = () => {
    localStorage.setItem("user", "");
    if (localStorage.getItem("user") === "") {
      redirect("/login");
      window.location.reload();
    }
  };

  const searchInputHandler = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(user);
  return (
    <div className={styles.container}>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <div className={styles.left}>
          <span className={styles.logo}>Social App</span>
        </div>
      </Link>
      <div className={styles.center}>
        <form className={styles.searchBar}>
          <Search className={styles.searchIcon} />
          <input
            className={styles.input}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search friends"
          />
        </form>
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
            src={
              user.profilePicture
                ? `${PF}profiles/${user.profilePicture}`
                : `${PF}profiles/noAvatar.png`
            }
            alt=""
            className={styles.profile}
          />
        </Link>
        <button onClick={logoutHandler}>Log out</button>
      </div>
    </div>
  );
};
export default NavBar;
