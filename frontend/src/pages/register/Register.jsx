import { Link } from "react-router-dom";

import styles from "./register.module.css";
const Register = () => {
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
              type="text"
              required
              className={styles.input}
              placeholder="username"
            />
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
            <input
              type="password"
              required
              className={styles.input}
              placeholder="password"
            />
            <button className={styles.button} type="submit">
              Sign Up
            </button>
            <div className={styles.links}>
              <span>Already have an accout?</span>
              <Link className={styles.login} to="/login">
                Log In
              </Link>
              <Link className={styles.forgot} to="/forgot">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
