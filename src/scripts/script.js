import { initializeApp } from "firebase/app";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
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

const btn =
    document.getElementById("googleLoginBtn");

btn.addEventListener("click", async () => {

    try {

        const result =
            await signInWithPopup(auth, provider);

        const user = result.user;

        const token =
            await user.getIdToken();

        console.log(token);

        const response = await fetch(
            "https://blink-g8w4.onrender.com/users/me",
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error(error);
    }
});