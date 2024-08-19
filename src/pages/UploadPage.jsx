// src/pages/UploadPage.jsx
import React from "react";
import UploadPhoto from "../components/UploadPhoto";
import styles from "./UploadPage.module.css";

const UploadPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sube tu Foto</h1>
      <UploadPhoto />
    </div>
  );
};

export default UploadPage;
