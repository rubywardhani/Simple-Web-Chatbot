function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = userInput.value.trim();
    if (message === "") return;

    // View chat
    chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;

    // Reply simulation
    const botReply = getBotReply(message);
    chatBox.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;

    // Auto scroll
    chatBox.scrollTop = chatBox.scrollHeight;
    userInput.value = "";
}

function getBotReply(msg) {
    // Respond
    if (msg.toLowerCase().includes("hello")) return "Hello there!";
    if (msg.toLowerCase().includes("Who are you")) return "I'm your chatbot!";
    return "Sorry, I don't understand what you mean";
}

document.getElementById("user-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});