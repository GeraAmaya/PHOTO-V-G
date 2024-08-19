// src/components/UploadPhoto.jsx
import React, { useState } from "react";
import { storage, firestore } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import Compressor from 'compressorjs'; // Asegúrate de instalar este paquete
import styles from "./UploadPhoto.module.css";

const UploadPhoto = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      Swal.fire("Error", "Por favor, selecciona una foto", "error");
      return;
    }

    setLoading(true); // Start loading
    setUploadStatus("Esperando...");

    new Compressor(file, {
      quality: 0.8,
      success: async (result) => {
        setUploadStatus("Estamos subiendo la imagen...");

        const storageRef = ref(storage, `photos/${result.name}`);
        try {
          await uploadBytes(storageRef, result);
          const url = await getDownloadURL(storageRef);

          await addDoc(collection(firestore, "photos"), {
            url,
            timestamp: serverTimestamp(),
          });

          setUploadStatus("Listo! Mira la pantalla.");

          setTimeout(() => {
            Swal.fire("Éxito", "Tu foto ha sido subida", "success");
            setFile(null);
            setUploadStatus("");
            setLoading(false);
          }, 2000); // Mensaje final visible por 2 segundos

        } catch (error) {
          Swal.fire("Error", "Hubo un problema al subir tu foto", "error");
          setUploadStatus("");
          setLoading(false);
        }
      },
      error: (err) => {
        Swal.fire("Error", "Hubo un problema al comprimir la foto", "error");
        setUploadStatus("");
        setLoading(false);
      },
    });
  };

  return (
    <div className={styles.uploadContainer}>
      <input type="file" onChange={handleFileChange} />
      <button className={styles.uploadButton} onClick={handleUpload} disabled={loading}>
        {loading ? "Subiendo..." : "Subir Foto"}
      </button>
      {loading && <p className={styles.uploadStatus}>{uploadStatus}</p>}
    </div>
  );
};

export default UploadPhoto;
