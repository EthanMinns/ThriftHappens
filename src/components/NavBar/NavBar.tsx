import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.container}>
      <img src="src/assets/images/logo.png" alt="Thrift Happens Logo" width={100}/>
      <h1>Thrift Happens</h1>
    </div>
  );
}
