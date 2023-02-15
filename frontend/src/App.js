import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import DevComponent from "./components/dev/DevComponent";

function App() {
  const { user } = useContext(AuthContext);
  const [gotIt, setGotIt] = useState(false);

  return (
    <>
      {!gotIt && <DevComponent setGotIt={setGotIt} />}
      <Router>
        <Routes>
          <Route path="/" exact element={user ? <Home /> : <Login />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/profile/:username" element={<Profile />} />
          <Route
            path="/messenger"
            element={!user ? <Navigate to="/login" /> : <Messenger />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<p>404 page</p>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
