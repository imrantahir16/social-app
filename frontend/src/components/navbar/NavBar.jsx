import {
  Chat,
  Notifications,
  Search,
  Person,
  Logout,
} from "@mui/icons-material";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import styles from "./navBar.module.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../api/axios";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const logoutHandler = () => {
    localStorage.setItem("user", "");
    if (localStorage.getItem("user") === "") {
      redirect("/login");
      window.location.reload();
    }
  };

  const searchInputHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(`user/search/${user._id}`, {
          name: searchInput,
        });
        setSearchRes(res.data);
      } catch (error) {
        console.error(error);
      }
    },
    [searchInput, user]
  );

  useEffect(() => {
    setSearchList(searchRes);
  }, [searchRes]);

  // console.log(user);
  return (
    <div className={styles.container}>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <div className={styles.left}>
          <span className={styles.logo}>Social App</span>
        </div>
      </Link>
      <div className={styles.center}>
        <form className={styles.searchBar} onSubmit={searchInputHandler}>
          <Search className={styles.searchIcon} />
          <input
            className={styles.input}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search friends"
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setTimeout(() => setSearchFocus(false), 400)}
          />
        </form>
        {searchFocus && (
          <ul className={styles.searchedContainer}>
            {!searchList.length && (
              <span className={styles.emptyList}>No result found</span>
            )}
            {searchList &&
              searchList.map((item, index) => {
                return (
                  <Link
                    to={`/profile/${item.username}`}
                    key={`searched${index}_${item._id}`}
                    className={styles.searchItem}
                  >
                    <img
                      className={styles.profile}
                      src={
                        item?.profilePicture
                          ? `${PF}/profiles/${item.profilePicture}`
                          : `${PF}profiles/noAvatar.png`
                      }
                      alt={`${item.usename} profile`}
                    />
                    <span style={{ backgroundColor: "palegreen" }}>
                      {item.username}
                    </span>
                  </Link>
                );
              })}
          </ul>
        )}
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
              user?.profilePicture
                ? `${PF}profiles/${user.profilePicture}`
                : `${PF}profiles/noAvatar.png`
            }
            alt=""
            className={styles.profile}
          />
        </Link>
        <Logout className={styles.logoutButton} onClick={logoutHandler}>
          Log out
        </Logout>
      </div>
    </div>
  );
};
export default NavBar;
