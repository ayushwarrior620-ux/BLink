import { auth }
from "./firebase.js";

import { redirectIfLoggedIn } from "./auth-guard.js"

import {
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

redirectIfLoggedIn();

const provider =
    new GoogleAuthProvider();


const loginBtn =
    document.getElementById("googleLoginBtn");


loginBtn.addEventListener(
    "click",
    async () => {

        try {
            const result =
                await signInWithPopup(
                    auth,
                    provider
                );

            const user =
                result.user;

            const token =
                await user.getIdToken();

            const response =
                await fetch(
                    "https://blink-g8w4.onrender.com/users/me",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            if (!response.ok) {

                throw new Error(
                    "Backend auth failed"
                );
            }

            window.location.href =
                "/index.html";

        } catch (error) {
            console.error(error);
        }
    }
);