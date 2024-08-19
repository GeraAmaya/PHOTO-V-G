
import React from "react";
import PhotoDisplay from "../components/PhotoDisplay";
import styles from "./DisplayPage.module.css";

const DisplayPage = () => {
  return (
    <div className={styles.container}>
      <PhotoDisplay />
    </div>
  );
};

export default DisplayPage;
