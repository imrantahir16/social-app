import styles from "./login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <h3 className={styles.logo}>Social App</h3>
          <span className={styles.description}>
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className={styles.right}>
          <form className={styles.form}>
            <input
              type="email"
              required
              className={styles.input}
              placeholder="example@gmail.com"
            />
            <input
              required
              type="password"
              className={styles.input}
              placeholder="password"
            />
            <button className={styles.button} type="submit">
              Log In
            </button>
            <div className={styles.links}>
              <Link className={styles.link} to="/register">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
