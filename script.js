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

// --- 1. Catch Redirect Result ---
getRedirectResult(auth).catch(err => console.error("Redirect Error:", err));

// --- 2. THE UI SWITCHER ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Logged in as:", user.displayName);
        // Force the switch
        authScreen.style.display = 'none';
        appScreen.style.display = 'block';
        appScreen.classList.remove('hidden');
        
        document.getElementById('my-pfp').src = user.photoURL;
        loadContacts();
    } else {
        console.log("No user found.");
        authScreen.style.display = 'flex';
        appScreen.style.display = 'none';
    }
});

// --- 3. Button Triggers ---
document.getElementById('google-login').onclick = () => signInWithRedirect(auth, provider);
document.getElementById('logout-btn').onclick = () => signOut(auth).then(() => location.reload());

// --- 4. Chat Logic ---
function loadContacts() {
    const contactList = document.getElementById('contact-list');
    const friends = [
        { name: 'Alex Rivera', pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
        { name: 'Sarah Tech', pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }
    ];
    
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
        };
        contactList.appendChild(div);
    });
}
