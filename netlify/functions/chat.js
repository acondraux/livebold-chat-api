<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Live Bold Planner</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: sans-serif;
      background: #f3f4f6;
      padding: 2rem;
    }
    #chatbox {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
      padding: 1.5rem;
    }
    #chat-log {
      border: 1px solid #ccc;
      padding: 1rem;
      min-height: 200px;
      background: #f9fafb;
      border-radius: 10px;
      overflow-y: auto;
      max-height: 300px;
      margin-bottom: 1rem;
    }
    #chat-form {
      display: flex;
      gap: 0.5rem;
    }
    #user-input {
      flex: 1;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 10px;
    }
    button {
      padding: 12px 20px;
      background-color: #38bdf8;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="chatbox">
    <h2 style="text-align: center;">Live Bold Trip Planner</h2>
    <div id="chat-log"></div>
    <form id="chat-form">
      <input type="text" id="user-input" placeholder="Ask your travel question..." autocomplete="off" />
      <button type="submit">Send</button>
    </form>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("chat-form");
      const input = document.getElementById("user-input");
      const log = document.getElementById("chat-log");

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userMessage = input.value.trim();
        if (!userMessage) return;

        log.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
        input.value = "";
        log.innerHTML += `<div><em>Thinking...</em></div>`;
        log.scrollTop = log.scrollHeight;

        try {
          const response = await fetch("https://liveboldtravel.netlify.app/.netlify/functions/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
          });

          const data = await response.json();

          if (data.error) {
            throw new Error(data.error);
          }

          const reply = data.message || "Hmm, no response from the planner.";
          log.innerHTML += `<div><strong>Live Bold:</strong> ${reply}</div>`;
        } catch (err) {
          log.innerHTML += `<div style="color: red;"><strong>Error:</strong> ${err.message}</div>`;
        } finally {
          log.scrollTop = log.scrollHeight;
        }
      });
    });
  </script>
</body>
</html>
