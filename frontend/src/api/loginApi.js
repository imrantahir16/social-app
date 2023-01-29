import axios from "./axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  // console.log("login start");
  // console.log(userCredentials);

  try {
    const res = await axios.post("/auth/login", userCredentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
