import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAvBaQe6NemkA76URFTuIOWwFEe44bLlbc",
    authDomain: "vuetifychat-4c7fc.firebaseapp.com",
    projectId: "vuetifychat-4c7fc",
    storageBucket: "vuetifychat-4c7fc.appspot.com",
    messagingSenderId: "462863470307",
    appId: "1:462863470307:web:c2046f344057dcfb5effd6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };