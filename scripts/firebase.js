import { initializeApp } from "firebase/app";

import { getAuth }
from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1Xm5xjv31dPz1XS0jN6KMycJmInuPAX4",
  authDomain: "arr-3301.firebaseapp.com",
  projectId: "arr-3301",
  storageBucket: "arr-3301.firebasestorage.app",
  messagingSenderId: "567076914671",
  appId: "1:567076914671:web:aa31a650ffb73846afe21a",
  measurementId: "G-7TNRNVHDBT"
};

const app =
    initializeApp(firebaseConfig);

export const auth =
    getAuth(app);