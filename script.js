document.addEventListener('DOMContentLoaded', () => {
    const authS = document.getElementById('auth-screen');
    const appS = document.getElementById('app-screen');
    const contactList = document.getElementById('contact-list');
    const msgContainer = document.getElementById('message-container');
    const msgInput = document.getElementById('msg-input');

    let currentUser = JSON.parse(localStorage.getItem('blink_v2_user')) || null;
    let currentChat = null;

    const friends = [
        { id: 1, name: 'Alex Rivera', pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
        { id: 2, name: 'Sarah Tech', pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
        { id: 3, name: 'Zane X', pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zane' }
    ];

    // Auth Initialization
    if(currentUser) startApp();
    else authS.classList.add('active');

    document.getElementById('signup-btn').onclick = () => {
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        if(email && pass) {
            currentUser = { email, pass, pfp: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}` };
            localStorage.setItem('blink_v2_user', JSON.stringify(currentUser));
            startApp();
        }
    };

    document.getElementById('login-btn').onclick = () => {
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        const saved = JSON.parse(localStorage.getItem('blink_v2_user'));
        if(saved && saved.email === email && saved.pass === pass) {
            currentUser = saved;
            startApp();
        } else alert("Invalid Credentials Bro.");
    };

    function startApp() {
        authS.classList.remove('active');
        appS.style.display = 'block';
        document.getElementById('my-pfp').src = currentUser.pfp;
        loadContacts();
    }

    // Load Contacts
    function loadContacts() {
        contactList.innerHTML = '';
        friends.forEach(f => {
            const div = document.createElement('div');
            div.className = 'contact-card';
            div.innerHTML = `<img src="${f.pfp}"><div><h4>${f.name}</h4><p>online</p></div>`;
            div.onclick = () => openChat(f);
            contactList.appendChild(div);
        });
    }

    function openChat(friend) {
        currentChat = friend;
        document.getElementById('no-chat').classList.add('hidden');
        document.getElementById('chat-active').classList.remove('hidden');
        document.getElementById('target-name').innerText = friend.name;
        document.getElementById('target-pfp').src = friend.pfp;
        renderMessages();
    }

    function renderMessages() {
        msgContainer.innerHTML = '';
        const history = JSON.parse(localStorage.getItem(`blink_chat_${currentChat.id}`)) || [];
        history.forEach(m => {
            const div = document.createElement('div');
            div.className = `msg ${m.type}`;
            div.innerText = m.text;
            msgContainer.appendChild(div);
        });
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    document.getElementById('send-btn').onclick = sendMessage;
    msgInput.onkeypress = (e) => { if(e.key === 'Enter') sendMessage(); };

    function sendMessage() {
        const text = msgInput.value.trim();
        if(!text) return;
        
        const history = JSON.parse(localStorage.getItem(`chat_${currentChat.id}`)) || [];
        history.push({ text, type: 'sent' });
        localStorage.setItem(`chat_${currentChat.id}`, JSON.stringify(history));
        
        const div = document.createElement('div');
        div.className = 'msg sent';
        div.innerText = text;
        msgContainer.appendChild(div);
        msgInput.value = '';
        msgContainer.scrollTop = msgContainer.scrollHeight;

        // Auto Bot Reply
        setTimeout(() => {
            const reply = "Yo, this UI is actually insane 🔥";
            history.push({ text: reply, type: 'received' });
            localStorage.setItem(`chat_${currentChat.id}`, JSON.stringify(history));
            const rDiv = document.createElement('div');
            rDiv.className = 'msg received';
            rDiv.innerText = reply;
            msgContainer.appendChild(rDiv);
            msgContainer.scrollTop = msgContainer.scrollHeight;
        }, 1000);
    }

    // Settings & Logout
    document.getElementById('open-settings').onclick = () => document.getElementById('settings-modal').style.display = 'flex';
    document.getElementById('close-settings').onclick = () => document.getElementById('settings-modal').style.display = 'none';
    document.getElementById('logout').onclick = () => { localStorage.removeItem('blink_v2_user'); location.reload(); };
});