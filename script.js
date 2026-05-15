import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { 
    getAuth, 
    signInWithRedirect, 
    getRedirectResult, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// --- CONFIG ---
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

// UI Elements
const authScreen = document.getElementById('auth-screen');
const appScreen = document.getElementById('app-screen');
const googleBtn = document.getElementById('google-login');
const logoutBtn = document.getElementById('logout-btn');
const contactList = document.getElementById('contact-list');
const msgContainer = document.getElementById('message-container');
const msgInput = document.getElementById('msg-input');
const sendBtn = document.getElementById('send-btn');

// --- AUTH LOGIC ---

// Catch the result of the redirect
getRedirectResult(auth)
    .then((result) => {
        if (result?.user) {
            console.log("Signed in!");
        }
    })
    .catch((error) => console.error(error));

// Monitor State
onAuthStateChanged(auth, (user) => {
    if (user) {
        authScreen.classList.remove('active');
        appScreen.classList.add('active');
        document.getElementById('my-pfp').src = user.photoURL;
        loadFriends();
    } else {
        authScreen.classList.add('active');
        appScreen.classList.remove('active');
    }
});

// Login button now redirects (to prevent auto-close bug)
googleBtn.onclick = () => signInWithRedirect(auth, provider);
logoutBtn.onclick = () => signOut(auth);

// --- APP LOGIC ---
const friends = [
    { id: 1, name: 'Alex Rivera', pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { id: 2, name: 'Sarah Tech', pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }
];

function loadFriends() {
    contactList.innerHTML = '';
    friends.forEach(f => {
        const div = document.createElement('div');
        div.className = 'contact-card';
        div.innerHTML = `<img src="${f.pfp}"><div><h4>${f.name}</h4><p>Online</p></div>`;
        div.onclick = () => {
            document.getElementById('no-chat').classList.add('hidden');
            document.getElementById('chat-active').classList.remove('hidden');
            document.getElementById('target-name').innerText = f.name;
            document.getElementById('target-pfp').src = f.pfp;
            msgContainer.innerHTML = '';
        };
        contactList.appendChild(div);
    });
}

function send() {
    const text = msgInput.value.trim();
    if(!text) return;
    const m = document.createElement('div');
    m.className = 'msg sent'; m.innerText = text;
    msgContainer.appendChild(m);
    msgInput.value = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;
    setTimeout(() => {
        const r = document.createElement('div');
        r.className = 'msg received'; r.innerText = "Blink received 🔥";
        msgContainer.appendChild(r);
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }, 1000);
}

sendBtn.onclick = send;
msgInput.onkeypress = (e) => { if(e.key === 'Enter') send(); };
