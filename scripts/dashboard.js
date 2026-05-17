import { auth }
from "./firebase.js";

import {
    requireAuth
}
from "./auth-guard.js";

import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";

requireAuth(async (user) => {

    console.log(user.email);
});

const nameElement =
    document.getElementById("name");

const logoutBtn =
    document.getElementById("logoutBtn");


onAuthStateChanged(
    auth,

    async (user) => {

        if (!user) {
            window.location.href =
                "/";

            return;
        }

        try {
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

            const data =
                await response.json();

            nameElement.textContent =
                data.name;

        } catch (error) {

            console.error(error);
        }
    }
);

logoutBtn.addEventListener(
    "click",

    async () => {

        await signOut(auth);

        window.location.href =
            "/";
    }
);