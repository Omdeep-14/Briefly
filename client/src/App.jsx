// import { useState } from "react";

// const WEBHOOK_URL = "http://localhost:5678/webhook-test/process-meeting";

// export default function App() {
//   const [notes, setNotes] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(null); // { type: 'success' | 'error', msg: string }

//   const sendWebhook = async () => {
//     if (!notes.trim()) {
//       setStatus({
//         type: "error",
//         msg: "Please paste some meeting notes first.",
//       });
//       return;
//     }

//     setLoading(true);
//     setStatus(null);

//     try {
//       const response = await fetch(WEBHOOK_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ meetingNotes: notes.trim() }),
//       });

//       if (response.ok) {
//         setStatus({
//           type: "success",
//           msg: `Webhook triggered successfully! Status: ${response.status}`,
//         });
//       } else {
//         setStatus({
//           type: "error",
//           msg: `Server responded with ${response.status}: ${response.statusText}`,
//         });
//       }
//     } catch (err) {
//       setStatus({
//         type: "error",
//         msg: `Failed to reach n8n. Make sure it's running on localhost:5678. (${err.message})`,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.body}>
//       <div style={styles.card}>
//         {/* Header */}
//         <div style={styles.labelRow}>
//           <div style={styles.dot} />
//           <span style={styles.tag}>n8n workflow</span>
//         </div>
//         <h1 style={styles.h1}>
//           Meeting Notes
//           <br />
//           Processor
//         </h1>
//         <p style={styles.subtitle}>
//           Paste notes → trigger webhook → n8n handles the rest
//         </p>

//         {/* Textarea */}
//         <div style={styles.fieldLabel}>Meeting Notes</div>
//         <textarea
//           style={styles.textarea}
//           placeholder="Today we discussed launching the new dashboard. Rahul will finalize the UI by Friday..."
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//           onFocus={(e) => {
//             e.target.style.borderColor = "#c8f060";
//             e.target.style.boxShadow = "0 0 0 3px rgba(200,240,96,0.08)";
//           }}
//           onBlur={(e) => {
//             e.target.style.borderColor = "#2a2d35";
//             e.target.style.boxShadow = "none";
//           }}
//         />
//         <div style={styles.charCount}>{notes.length} characters</div>

//         {/* Button */}
//         <button
//           style={{
//             ...styles.button,
//             ...(loading ? styles.buttonDisabled : {}),
//           }}
//           onClick={sendWebhook}
//           disabled={loading}
//           onMouseEnter={(e) => {
//             if (!loading) {
//               e.target.style.background = "#d8ff70";
//               e.target.style.boxShadow = "0 0 20px rgba(200,240,96,0.3)";
//               e.target.style.transform = "translateY(-1px)";
//             }
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.background = "#c8f060";
//             e.target.style.boxShadow = "none";
//             e.target.style.transform = "translateY(0)";
//           }}
//         >
//           {loading ? (
//             <span style={styles.loadingRow}>
//               <span style={styles.spinner} />
//               Sending...
//             </span>
//           ) : (
//             "Send to n8n"
//           )}
//         </button>

//         {/* Status */}
//         {status && (
//           <div
//             style={{
//               ...styles.statusBox,
//               ...(status.type === "success"
//                 ? styles.statusSuccess
//                 : styles.statusError),
//             }}
//           >
//             <span style={{ marginRight: 8 }}>
//               {status.type === "success" ? "✓" : "✕"}
//             </span>
//             {status.msg}
//           </div>
//         )}

//         {/* Webhook URL display */}
//         <div style={styles.webhookUrl}>
//           POST →{" "}
//           <span style={{ color: "#c8f060", opacity: 0.8 }}>{WEBHOOK_URL}</span>
//         </div>
//       </div>

//       {/* Spinner keyframes injected via style tag */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&display=swap');
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// }

// const styles = {
//   body: {
//     minHeight: "100vh",
//     background: "#0e0f11",
//     backgroundImage:
//       "radial-gradient(ellipse 60% 40% at 70% 20%, rgba(200,240,96,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 20% 80%, rgba(200,240,96,0.04) 0%, transparent 60%)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "2rem",
//     fontFamily: "'DM Mono', monospace",
//   },
//   card: {
//     width: "100%",
//     maxWidth: 680,
//     background: "#16181c",
//     border: "1px solid #2a2d35",
//     borderRadius: 16,
//     padding: "2.5rem",
//     boxShadow: "0 0 80px rgba(200,240,96,0.05), 0 4px 40px rgba(0,0,0,0.6)",
//     animation: "fadeUp 0.5s ease both",
//   },
//   labelRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: "0.75rem",
//     marginBottom: "0.5rem",
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: "50%",
//     background: "#c8f060",
//     boxShadow: "0 0 8px #c8f060",
//     flexShrink: 0,
//   },
//   tag: {
//     fontSize: "0.72rem",
//     textTransform: "uppercase",
//     letterSpacing: "0.1em",
//     color: "#7a7f8e",
//   },
//   h1: {
//     fontFamily: "'DM Serif Display', serif",
//     fontSize: "1.9rem",
//     fontWeight: 400,
//     color: "#e8eaf0",
//     letterSpacing: "-0.02em",
//     lineHeight: 1.2,
//   },
//   subtitle: {
//     fontSize: "0.78rem",
//     color: "#7a7f8e",
//     margin: "0.4rem 0 2rem 0",
//     letterSpacing: "0.05em",
//     textTransform: "uppercase",
//   },
//   fieldLabel: {
//     fontSize: "0.72rem",
//     textTransform: "uppercase",
//     letterSpacing: "0.1em",
//     color: "#7a7f8e",
//     marginBottom: "0.6rem",
//   },
//   textarea: {
//     width: "100%",
//     minHeight: 220,
//     background: "#0e0f11",
//     border: "1px solid #2a2d35",
//     borderRadius: 10,
//     color: "#e8eaf0",
//     fontFamily: "'DM Mono', monospace",
//     fontSize: "0.875rem",
//     lineHeight: 1.7,
//     padding: "1rem 1.1rem",
//     resize: "vertical",
//     outline: "none",
//     transition: "border-color 0.2s, box-shadow 0.2s",
//   },
//   charCount: {
//     textAlign: "right",
//     fontSize: "0.7rem",
//     color: "#7a7f8e",
//     marginTop: "0.4rem",
//     marginBottom: "1.5rem",
//   },
//   button: {
//     width: "100%",
//     padding: "0.9rem 1.5rem",
//     background: "#c8f060",
//     color: "#0e0f11",
//     border: "none",
//     borderRadius: 10,
//     fontFamily: "'DM Mono', monospace",
//     fontSize: "0.9rem",
//     fontWeight: 500,
//     letterSpacing: "0.05em",
//     cursor: "pointer",
//     transition: "background 0.15s, transform 0.1s, box-shadow 0.15s",
//   },
//   buttonDisabled: {
//     opacity: 0.5,
//     cursor: "not-allowed",
//   },
//   loadingRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },
//   spinner: {
//     display: "inline-block",
//     width: 14,
//     height: 14,
//     border: "2px solid #0e0f11",
//     borderTopColor: "transparent",
//     borderRadius: "50%",
//     animation: "spin 0.7s linear infinite",
//   },
//   statusBox: {
//     marginTop: "1.2rem",
//     padding: "0.9rem 1.1rem",
//     borderRadius: 10,
//     fontSize: "0.82rem",
//     animation: "fadeUp 0.3s ease both",
//   },
//   statusSuccess: {
//     background: "rgba(200,240,96,0.08)",
//     border: "1px solid rgba(200,240,96,0.3)",
//     color: "#c8f060",
//   },
//   statusError: {
//     background: "rgba(255,90,90,0.08)",
//     border: "1px solid rgba(255,90,90,0.3)",
//     color: "#ff8a8a",
//   },
//   webhookUrl: {
//     marginTop: "2rem",
//     padding: "0.8rem 1rem",
//     background: "rgba(255,255,255,0.03)",
//     border: "1px dashed #2a2d35",
//     borderRadius: 8,
//     fontSize: "0.72rem",
//     color: "#7a7f8e",
//     wordBreak: "break-all",
//   },
// };

import { useState } from "react";

const WEBHOOK_URL = "http://localhost:5678/webhook-test/process-meeting";

export default function MeetingWebhook() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const sendWebhook = async () => {
    if (!notes.trim()) return;
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingNotes: notes.trim() }),
      });
      if (response.ok) {
        setStatus({ type: "success", msg: "Meeting summarised successfully!" });
        setNotes("");
      } else {
        setStatus({
          type: "error",
          msg: `Error ${response.status}: ${response.statusText}`,
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        msg: `Could not reach n8n. Is it running? (${err.message})`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      sendWebhook();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .briefly-page {
          min-height: 100vh;
          background: #eee8df;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          font-family: 'DM Sans', sans-serif;
        }

        .briefly-header {
          text-align: center;
          margin-bottom: 2.2rem;
          animation: fadeIn 0.5s ease both;
        }

        .briefly-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.6rem;
        }

        .briefly-logo-diamond {
          color: #c8610a;
          font-size: 1.3rem;
        }

        .briefly-logo-text {
          font-family: 'Caveat', cursive;
          font-size: 2.6rem;
          font-weight: 600;
          color: #1a1510;
          letter-spacing: -0.01em;
        }

        .briefly-tagline {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 1rem;
          color: #6b5f52;
        }

        .briefly-card {
          background: #faf7f2;
          border-radius: 4px;
          width: 100%;
          max-width: 540px;
          padding: 2rem 2rem 1.6rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08);
          position: relative;
          animation: fadeIn 0.5s ease 0.1s both;
          border-left: 3px solid #e0d8cc;
        }

        .briefly-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: repeating-linear-gradient(
            transparent,
            transparent 27px,
            #ede8e0 27px,
            #ede8e0 28px
          );
          border-radius: 4px;
          opacity: 0.5;
          pointer-events: none;
        }

        .card-inner {
          position: relative;
          z-index: 1;
        }

        .card-label {
          font-family: 'Caveat', cursive;
          font-size: 0.85rem;
          font-weight: 500;
          color: #c8610a;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.3rem;
        }

        .card-title {
          font-family: 'Caveat', cursive;
          font-size: 1.8rem;
          font-weight: 500;
          color: #1a1510;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .card-desc {
          font-family: 'Lora', serif;
          font-size: 0.88rem;
          color: #7a6e62;
          margin-bottom: 1.4rem;
          line-height: 1.5;
          text-align: center;
        }

        .briefly-textarea {
          width: 100%;
          min-height: 200px;
          background: transparent;
          border: 1px solid #ddd6cc;
          border-radius: 4px;
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 0.95rem;
          color: #2a221a;
          line-height: 1.8;
          padding: 0.9rem 1rem;
          resize: vertical;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          caret-color: #c8610a;
        }

        .briefly-textarea::placeholder {
          color: #b0a496;
          font-style: italic;
        }

        .briefly-textarea:focus {
          border-color: #c8a882;
          box-shadow: 0 0 0 3px rgba(200,160,100,0.1);
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1.1rem;
        }

        .shortcut-hint {
          font-size: 0.75rem;
          color: #b0a496;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .shortcut-hint kbd {
          background: #ede8e0;
          border: 1px solid #d5ccc2;
          border-radius: 3px;
          padding: 1px 5px;
          font-size: 0.7rem;
          font-family: 'DM Sans', sans-serif;
          color: #7a6e62;
        }

        .briefly-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #3d3530;
          color: #faf7f2;
          border: none;
          border-radius: 6px;
          padding: 0.65rem 1.3rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }

        .briefly-btn:hover:not(:disabled) {
          background: #2a211c;
          transform: translateY(-1px);
        }

        .briefly-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .briefly-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid #faf7f2;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .status-msg {
          margin-top: 1rem;
          padding: 0.7rem 1rem;
          border-radius: 4px;
          font-size: 0.83rem;
          animation: fadeIn 0.3s ease both;
        }

        .status-success {
          background: rgba(80,140,80,0.08);
          border: 1px solid rgba(80,140,80,0.25);
          color: #3a6e3a;
        }

        .status-error {
          background: rgba(180,60,60,0.08);
          border: 1px solid rgba(180,60,60,0.25);
          color: #8e3030;
        }
      `}</style>

      <div className="briefly-page">
        <div className="briefly-header">
          <div className="briefly-logo">
            <span className="briefly-logo-diamond">✦</span>
            <span className="briefly-logo-text">Briefly</span>
          </div>
          <p className="briefly-tagline">
            Paste messy meeting notes. Get structured clarity — instantly.
          </p>
        </div>

        <div className="briefly-card">
          <div className="card-inner">
            <div className="card-label">New Meeting</div>
            <div className="card-title">What happened in the meeting?</div>
            <p className="card-desc">
              Drop in your transcript, bullet points, or raw scribbles. Briefly
              extracts decisions,
              <br />
              action items, and owners.
            </p>

            <textarea
              className="briefly-textarea"
              placeholder="e.g. We agreed to push the launch to Q4. Priya will draft the press release by Thursday. Budget approved at $40k..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            {status && (
              <div
                className={`status-msg ${status.type === "success" ? "status-success" : "status-error"}`}
              >
                {status.type === "success" ? "✓ " : "✕ "}
                {status.msg}
              </div>
            )}

            <div className="card-footer">
              <span className="shortcut-hint">
                <kbd>⌘</kbd> Enter to submit
              </span>
              <button
                className="briefly-btn"
                onClick={sendWebhook}
                disabled={loading || !notes.trim()}
              >
                {loading ? (
                  <>
                    <span className="btn-spinner" />
                    Processing...
                  </>
                ) : (
                  <>→ Summarise Meeting</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
