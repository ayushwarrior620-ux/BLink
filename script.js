document.addEventListener('DOMContentLoaded', () => {
    const authScreen = document.getElementById('auth-screen');
    const appScreen = document.getElementById('app-screen');
    const contactList = document.getElementById('contact-list');
    const msgContainer = document.getElementById('message-container');
    const msgInput = document.getElementById('msg-input');
    const sendBtn = document.getElementById('send-btn');

    let currentUser = JSON.parse(localStorage.getItem('blink_v3_user')) || null;
    let currentChat = null;

    const friends = [
        { id: 1, name: 'Alex Rivera', pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
        { id: 2, name: 'Sarah Tech', pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
        { id: 3, name: 'Zane X', pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zane' }
    ];

    if(currentUser) launchApp();

    // --- AUTH LOGIC ---
    document.getElementById('signup-btn').onclick = () => {
        const email = document.getElementById('email-input').value;
        const pass = document.getElementById('pass-input').value;
        if(email && pass) {
            currentUser = { email, pfp: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}` };
            localStorage.setItem('blink_v3_user', JSON.stringify(currentUser));
            launchApp();
        }
    };

    document.getElementById('login-btn').onclick = () => {
        const email = document.getElementById('email-input').value;
        if(email) {
            currentUser = { email, pfp: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}` };
            launchApp();
        }
    };

    function launchApp() {
        authScreen.classList.remove('active');
        appScreen.classList.add('active');
        document.getElementById('my-pfp').src = currentUser.pfp;
        loadFriends();
    }

    // --- CONTACTS ---
    function loadFriends() {
        contactList.innerHTML = '';
        friends.forEach(f => {
            const div = document.createElement('div');
            div.className = 'contact-card';
            div.innerHTML = `<img src="${f.pfp}"><div><h4>${f.name}</h4><p>Online</p></div>`;
            div.onclick = () => {
                currentChat = f;
                document.getElementById('no-chat').classList.add('hidden');
                document.getElementById('chat-active').classList.remove('hidden');
                document.getElementById('target-name').innerText = f.name;
                document.getElementById('target-pfp').src = f.pfp;
                msgContainer.innerHTML = ''; 
            };
            contactList.appendChild(div);
        });
    }

    // --- MESSAGING ---
    function send() {
        const text = msgInput.value.trim();
        if(!text || !currentChat) return;

        const m = document.createElement('div');
        m.className = 'msg sent';
        m.innerText = text;
        msgContainer.appendChild(m);
        msgInput.value = '';
        msgContainer.scrollTop = msgContainer.scrollHeight;

        setTimeout(() => {
            const r = document.createElement('div');
            r.className = 'msg received';
            r.innerText = "Yo, this UI is actually insane 🔥";
            msgContainer.appendChild(r);
            msgContainer.scrollTop = msgContainer.scrollHeight;
        }, 1000);
    }

    sendBtn.onclick = send;
    msgInput.onkeypress = (e) => { if(e.key === 'Enter') send(); };

    // --- SETTINGS ---
    const modal = document.getElementById('settings-modal');
    document.getElementById('open-settings').onclick = () => modal.style.display = 'flex';
    document.getElementById('close-settings').onclick = () => modal.style.display = 'none';

    document.getElementById('save-settings').onclick = () => {
        const seed = document.getElementById('new-seed').value;
        if(seed) {
            currentUser.pfp = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
            document.getElementById('my-pfp').src = currentUser.pfp;
            localStorage.setItem('blink_v3_user', JSON.stringify(currentUser));
        }
        modal.style.display = 'none';
    };

    document.getElementById('logout-btn').onclick = () => {
        localStorage.removeItem('blink_v3_user');
        location.reload();
    };
});
