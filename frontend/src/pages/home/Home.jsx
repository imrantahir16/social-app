import Feed from "../../components/feed/Feed";
import NavBar from "../../components/navbar/NavBar";
import LeftSideBar from "../../components/sidebars/LeftSideBar";
import RightSideBar from "../../components/sidebars/RightSideBar";
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
