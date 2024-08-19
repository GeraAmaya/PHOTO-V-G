// src/components/PhotoDisplay.jsx
import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";
import styles from './PhotoDisplay.module.css';

const storage = getStorage();

function PhotoDisplay() {
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);

      try {
        const photosCollection = collection(firestore, "photos");
        const q = query(photosCollection, orderBy("timestamp", "desc"), limit(1));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const latestPhoto = snapshot.docs[0].data().url;
            setCurrentPhoto(latestPhoto);
          } else {
            setCurrentPhoto(null);
          }
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching photos:", error);
        setLoading(false);
      }
    };

    fetchPhotos();

    return () => {};
  }, []);

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!fullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setFullscreen(!fullscreen);
  };

  return (
    <div className={`${styles.photoContainer} ${fullscreen ? styles.fullscreen : ''}`}>
      {loading ? (
        <div className={styles.loader}>Loading...</div>
      ) : (
        currentPhoto && (
          <>
            <div className={styles.header}>
              <h1>Nuestra Boda V & G</h1>
              <div className={styles.ribbon}></div>
            </div>
            <img src={currentPhoto} alt="Latest upload" className={styles.photo} />
            <button className={styles.fullscreenButton} onClick={toggleFullscreen}>
              {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
            <div className={styles.frame}></div>
          </>
        )
      )}
    </div>
  );
}

export default PhotoDisplay;
