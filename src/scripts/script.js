import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
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

const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        message.textContent =
            `Logged in as ${userCredential.user.email}`;
    } catch (loginError) {
        try {
            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
            message.textContent =
                `Account created for ${userCredential.user.email}`;
        } catch (signupError) {
            message.textContent = signupError.message;
            console.error(signupError);
        }
    }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in:", user.email);
    } else {
        console.log("No user logged in");
    }
});