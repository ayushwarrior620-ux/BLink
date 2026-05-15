import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { 
    getAuth, 
    signInWithRedirect, 
    getRedirectResult, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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
const contactList = document.getElementById('contact-list');
const msgContainer = document.getElementById('message-container');
const msgInput = document.getElementById('msg-input');
const sendBtn = document.getElementById('send-btn');

// --- AUTH LOGIC ---

// 1. Catch result after Google redirect
getRedirectResult(auth)
    .then((result) => {
        if (result?.user) {
            console.log("Login caught from redirect!");
            showInterface(result.user);
        }
    }).catch(err => console.error("Redirect Error:", err));

// 2. Monitor Auth State (Handles refresh/persistence)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Auth state: Logged in", user.displayName);
        showInterface(user);
    } else {
        console.log("Auth state: Logged out");
        authScreen.classList.add('active');
        appScreen.classList.add('hidden');
        appScreen.classList.remove('active');
    }
});

// 3. Login/Logout
document.getElementById('google-login').onclick = () => {
    console.log("Button clicked, redirecting...");
    signInWithRedirect(auth, provider);
};

document.getElementById('logout-btn').onclick = () => {
    signOut(auth).then(() => window.location.reload());
};

// --- THE INTERFACE FIX ---
function showInterface(user) {
    console.log("Switching to app interface...");
    
    // Switch Screens
    authScreen.classList.remove('active');
    authScreen.classList.add('hidden');
    
    appScreen.classList.remove('hidden');
    appScreen.classList.add('active');

    // Update Profile Pic
    const pfp = document.getElementById('my-pfp');
    if (pfp) pfp.src = user.photoURL;

    renderFriends();
}

// --- MESSAGING LOGIC ---
const friends = [
    { id: 1, name: 'Alex Rivera', pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { id: 2, name: 'Sarah Tech', pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { id: 3, name: 'Zane X', pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zane' }
];

function renderFriends() {
    if (!contactList) return;
    contactList.innerHTML = '';
    friends.forEach(f => {
        const div = document.createElement('div');
        div.className = 'contact-card';
        div.innerHTML = `<img src="${f.pfp}"><div><h4>${f.name}</h4><p>Online</p></div>`;
        div.onclick = () => openChat(f);
        contactList.appendChild(div);
    });
}

function openChat(f) {
    console.log("Opening chat with:", f.name);
    document.getElementById('no-chat').classList.add('hidden');
    document.getElementById('chat-active').classList.remove('hidden');
    document.getElementById('target-name').innerText = f.name;
    document.getElementById('target-pfp').src = f.pfp;
    msgContainer.innerHTML = '';
}

function send() {
    const text = msgInput.value.trim();
    if(!text) return;
    
    const m = document.createElement('div');
    m.className = 'msg sent';
    m.innerText = text;
    msgContainer.appendChild(m);
    
    msgInput.value = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;

    setTimeout(() => {
        const r = document.createElement('div');
        r.className = 'msg received';
        r.innerText = "Blink received. This UI is actually working now! 🔥";
        msgContainer.appendChild(r);
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }, 1000);
}

if (sendBtn) sendBtn.onclick = send;
if (msgInput) msgInput.onkeypress = (e) => { if(e.key === 'Enter') send(); };
