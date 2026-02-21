import { useEffect, useState } from "react";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();

    // Optional: refresh every 5s
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Message Dashboard</h2>
      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <ul>
          {messages.map((msg) => (
            <li key={msg._id}>
              <strong>{msg.priority.toUpperCase()}:</strong> {msg.text} <br />
              <em>Summary:</em> {msg.summary} <br />
              <small>{new Date(msg.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
