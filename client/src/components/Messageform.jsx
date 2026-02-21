import { useState } from "react";

export default function MessageForm() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false); // new state to disable button

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return alert("Message cannot be empty");

    setSending(true); // disable button immediately

    try {
      const res = await fetch("http://localhost:5678/webhook/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      console.log("n8n response:", data);

      alert(
        `Message sent successfully!\nYou can send another message after 5 seconds.`,
      );
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message");
    }

    // re-enable button after 5 seconds
    setTimeout(() => {
      setSending(false);
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        style={{ width: "400px", marginRight: "10px" }}
      />
      <button type="submit" disabled={sending}>
        {sending ? "Wait 5s..." : "Send"}
      </button>
    </form>
  );
}
