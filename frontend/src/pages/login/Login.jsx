import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../api/loginApi";
import { CircularProgress } from "@mui/material";
import styles from "./login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const loginHandler = async (e) => {
    e.preventDefault();
    const userCredentials = {
      email: email.current.value,
      password: password.current.value,
    };
    await loginCall(userCredentials, dispatch);
  };

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
          <form className={styles.form} onSubmit={loginHandler}>
            <input
              type="email"
              required
              className={styles.input}
              placeholder="example@gmail.com"
              ref={email}
            />
            <input
              required
              type="password"
              className={styles.input}
              placeholder="password"
              ref={password}
            />
            <button
              className={styles.button}
              type="submit"
              disabled={isFetching}
            >
              {isFetching
                ? // <CircularProgress color="" size="20px" />
                  "Loading..."
                : "Log In"}
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
