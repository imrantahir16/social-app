import { Users } from "../../utils/DummyData";
import Online from "../online/Online";
import styles from "./homeRightBar.module.css";
const HomeRightBar = () => {
  return (
    <>
      <div className={styles.container}>
        <img className={styles.birthdayImg} src="assets/gift.png" alt="" />
        <span className={styles.birthdayText}>
          <strong>John Doe</strong> and <strong>3 other friends</strong> have
          birthday today
        </span>
      </div>
      <img className={styles.ads} src="assets/post/1.jpg" alt="company ads" />
      <h4 className={styles.title}>Online friends</h4>
      <ul className={styles.friendsList}>
        {Users.map((user) => (
          <Online key={user.id} user={user} />
        ))}
      </ul>
    </>
  );
};
export default HomeRightBar;
