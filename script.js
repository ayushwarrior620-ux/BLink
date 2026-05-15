import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";


// ==========================
// FIREBASE CONFIG
// ==========================

const firebaseConfig = {
    apiKey: "AIzaSyC1Xm5xjv31dPz1XS0jN6KMycJmInuPAX4",
    authDomain: "arr-3301.firebaseapp.com",
    projectId: "arr-3301",
    storageBucket: "arr-3301.appspot.com",
    messagingSenderId: "567076914671",
    appId: "1:567076914671:web:aa31a650ffb73846afe21a"
};


// ==========================
// INITIALIZE
// ==========================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


// ==========================
// UI ELEMENTS
// ==========================

const authScreen = document.getElementById("auth-screen");
const appScreen = document.getElementById("app-screen");

const googleBtn = document.getElementById("google-login");
const logoutBtn = document.getElementById("logout-btn");

const myPfp = document.getElementById("my-pfp");

const contactList = document.getElementById("contact-list");


// ==========================
// HANDLE REDIRECT RESULT
// ==========================

try {

    const result = await getRedirectResult(auth);

    if (result?.user) {

        console.log("Redirect Login Success");
        console.log(result.user);

    }

} catch (error) {

    console.error("Redirect Error:");
    console.error(error.code);
    console.error(error.message);

}


// ==========================
// AUTH STATE LISTENER
// ==========================

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log("User Logged In:");
        console.log(user.displayName);

        // Switch UI
        authScreen.style.display = "none";
        appScreen.style.display = "flex";

        // Profile Photo
        if (user.photoURL) {
            myPfp.src = user.photoURL;
        }

        // Load Contacts
        loadContacts();

    } else {

        console.log("No User");

        authScreen.style.display = "flex";
        appScreen.style.display = "none";

    }

});


// ==========================
// LOGIN BUTTON
// ==========================

googleBtn.addEventListener("click", async () => {

    try {

        await signInWithRedirect(auth, provider);

    } catch (error) {

        console.error("Login Error:");
        console.error(error.code);
        console.error(error.message);

    }

});


// ==========================
// LOGOUT BUTTON
// ==========================

logoutBtn.addEventListener("click", async () => {

    try {

        await signOut(auth);

        console.log("Logged Out");

    } catch (error) {

        console.error(error.code);
        console.error(error.message);

    }

});


// ==========================
// CONTACTS
// ==========================

function loadContacts() {

    const friends = [

        {
            name: "Alex Rivera",
            pfp: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
        },

        {
            name: "Sarah Tech",
            pfp: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        }

    ];

    contactList.innerHTML = "";

    friends.forEach(friend => {

        const div = document.createElement("div");

        div.className = "contact-card";

        div.innerHTML = `
            <img src="${friend.pfp}" width="45">

            <div>
                <h4>${friend.name}</h4>
                <p>Online</p>
            </div>
        `;

        div.addEventListener("click", () => {

            document
                .getElementById("no-chat")
                ?.classList.add("hidden");

            document
                .getElementById("chat-active")
                ?.classList.remove("hidden");

            document.getElementById("target-name").innerText =
                friend.name;

            document.getElementById("target-pfp").src =
                friend.pfp;

        });

        contactList.appendChild(div);

    });

}
