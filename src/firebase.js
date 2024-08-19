
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCG4GR_davvkGRM5ArhRq6a_oL8wuGCjOM",
    authDomain: "photo-v-g-4f6d0.firebaseapp.com",
    projectId: "photo-v-g-4f6d0",
    storageBucket: "photo-v-g-4f6d0.appspot.com",
    messagingSenderId: "292840328992",
    appId: "1:292840328992:web:ad4d7717baaab414231145"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore };
