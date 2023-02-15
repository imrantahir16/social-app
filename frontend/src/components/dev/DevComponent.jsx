import styles from "./devComponent.module.css";

const DevComponent = ({ setGotIt }) => {
  return (
    <div className={styles.dev}>
      <p className={styles.description}>
        This site is still in Development. Some feature may not work as
        expected.
      </p>
      <button className={styles.button} onClick={() => setGotIt(true)}>
        Got it!
      </button>
    </div>
  );
};
export default DevComponent;
