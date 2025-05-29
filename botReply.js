export function getBotReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("hello")) return "Hello there!";
    if (msg.includes("who are you")) return "I'm your chatbot!";
    return "Sorry, I don't understand what you mean.";
}