import { getBotReply } from './botReply.js';

// Time
document.getElementById('welcome-time').textContent = getCurrentTime();

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
}

// Auto-resize textarea
const textarea = document.getElementById('user-input');
textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = userInput.value.trim();
    if (message === "") return;

    addMessage(message, 'user');
    showTypingIndicator();

    setTimeout(() => {
        hideTypingIndicator();
        const botReply = getBotReply(message);
        addMessage(botReply, 'bot');
    }, 800 + Math.random() * 1200);

    userInput.value = "";
    userInput.style.height = 'auto';
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const currentTime = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });

    messageDiv.innerHTML = `
        <div class="message-avatar">${sender === 'user' ? 'U' : 'AI'}</div>
        <div>
            <div class="message-content">${text}</div>
            <div class="message-time">${currentTime}</div>
        </div>
    `;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
    const chatBox = document.getElementById('chat-box');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">AI</div>
        <div class="typing-indicator">
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTypingIndicator() {
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) typingMessage.remove();
}

document.getElementById("user-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});