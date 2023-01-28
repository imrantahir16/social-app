import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@mui/icons-material";
import { useRef, useContext, useState } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import styles from "./share.module.css";

const Share = () => {
  // const [user, setUser] = useState({});
  const { user } = useContext(AuthContext);
  const description = useRef();
  const [file, setFile] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const shareSubmitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      description: description.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("/post", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <img
            className={styles.profileImage}
            src={`assets/${user.profilePicture}`}
            alt=""
          />
          <textarea
            className={styles.input}
            rows={3}
            placeholder={`what's in your mind ${user.username}?`}
            ref={description}
          />
        </div>
        <hr className={styles.hr} />
        {file && (
          <div className={styles.shareImageContainer}>
            <img
              className={styles.shareImage}
              src={URL.createObjectURL(file)}
              alt=""
            />
            <Cancel
              className={styles.shareCancel}
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className={styles.bottom} onSubmit={shareSubmitHandler}>
          <div className={styles.options}>
            <label htmlFor="file" className={styles.option}>
              <PermMedia className={styles.icon} />
              <span className={styles.optionText}>Photo or Video</span>
              <input
                type="file"
                id="file"
                className={styles.file}
                accept=".png, .jpg, .jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className={styles.option}>
              <Label className={styles.icon} />
              <span className={styles.optionText}>Tag</span>
            </div>
            <div className={styles.option}>
              <Room />
              <span className={styles.optionText}>Location</span>
            </div>
            <div className={styles.option}>
              <EmojiEmotions className={styles.icon} />
              <span className={styles.optionText}>Feelings</span>
            </div>
          </div>
          <button className={styles.button} type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};
export default Share;
