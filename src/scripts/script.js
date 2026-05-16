import { initializeApp } from "firebase/app";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1Xm5xjv31dPz1XS0jN6KMycJmInuPAX4",
  authDomain: "arr-3301.firebaseapp.com",
  projectId: "arr-3301",
  storageBucket: "arr-3301.firebasestorage.app",
  messagingSenderId: "567076914671",
  appId: "1:567076914671:web:aa31a650ffb73846afe21a",
  measurementId: "G-7TNRNVHDBT"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const googleLoginBtn =
    document.getElementById("googleLoginBtn");

const message =
    document.getElementById("message");

googleLoginBtn.addEventListener("click", async () => {

    try {
        const result =
            await signInWithPopup(auth, provider);

        const user = result.user;

        message.textContent =
            `Logged in as ${user.displayName}`;

        console.log(user);
    } catch (error) {
        console.error(error);

        message.textContent = error.message;
    }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Logged in:", user.email);
    } else {
        console.log("No user logged in");
    }
});