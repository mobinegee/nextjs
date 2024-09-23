// components/Loading.js
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
