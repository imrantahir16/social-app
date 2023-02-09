import axios from "./axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  // console.log("login start");
  console.log(userCredentials);

  try {
    const { email, password } = userCredentials;
    const res = await axios.post("/auth/login", { email, password });
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
