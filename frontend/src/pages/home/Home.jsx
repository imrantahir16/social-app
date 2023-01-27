import Feed from "../../components/feed/Feed";
import NavBar from "../../components/navbar/NavBar";
import LeftSideBar from "../../components/Sidebars/LeftSideBar";
import RightSideBar from "../../components/Sidebars/RightSideBar";
import styles from "./home.module.css";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <LeftSideBar />
        <Feed />
        <RightSideBar />
      </div>
    </>
  );
};
export default Home;
