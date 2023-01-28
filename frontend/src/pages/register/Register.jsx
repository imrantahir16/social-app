import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "../../api/axios";
import styles from "./register.module.css";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity("Password don't match!");
    }
    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value,
    };
    try {
      await axios.post("/auth/register", user);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
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
          <form className={styles.form} onSubmit={registerHandler}>
            <input
              type="text"
              required
              className={styles.input}
              placeholder="username"
              ref={username}
            />
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
            <input
              type="password"
              required
              className={styles.input}
              placeholder="confirm password"
              ref={confirmPassword}
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
