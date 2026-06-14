*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg: #070707;
  --bg-2: #0a0a0f;
  --bg-3: #0f0f1a;
  --bg-4: #14142a;
  --surface: #0d0d18;
  --gold: #9333ea;
  --gold-2: #a855f7;
  --gold-dim: rgba(147,51,234,0.12);
  --white: #f0ede8;
  --text: #ccc9c0;
  --text-2: #888480;
  --text-3: #444240;
  --border: rgba(147,51,234,0.12);
  --border-2: rgba(147,51,234,0.25);
  --green: #a3e635;
  --purple: #a855f7;
  --blue: #60a5fa;
  --red: #f87171;
  --orange: #fb923c;
  --teal: #2dd4bf;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --radius: 14px;
  --radius-sm: 8px;
}

html { scroll-behavior: smooth; }

[data-theme="light"] {
  --bg: #faf9f7;
  --bg-2: #ffffff;
  --bg-3: #f3f1ee;
  --bg-4: #ece9e4;
  --surface: #ffffff;
  --white: #1a1a1a;
  --text: #2b2a28;
  --text-2: #6b6863;
  --text-3: #a8a39c;
  --border: rgba(147,51,234,0.15);
  --border-2: rgba(147,51,234,0.3);
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  transition: background 0.3s ease, color 0.3s ease;
}
button { cursor: pointer; font-family: var(--font-body); border: none; }
input, textarea, select { font-family: var(--font-body); }
a { text-decoration: none; color: inherit; }
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
.revealed { opacity: 1 !important; transform: translateY(0) !important; }

@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes scaleIn { from { transform: scale(0.94); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes slideInRight { from { transform: translateX(110%); } to { transform: translateX(0); } }
@keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes readerSway { 0%,100% { transform: rotate(-1deg); } 50% { transform: rotate(1deg); } }
@keyframes pageTurn { 0%,100% { transform: rotateY(0deg) rotateZ(0deg); } 50% { transform: rotateY(-18deg) rotateZ(-2deg); } }
@keyframes particleDrift {
  0% { opacity: 0; transform: translateY(0) scale(1); }
  15% { opacity: 0.7; }
  100% { opacity: 0; transform: translateY(-80px) scale(0.3); }
}
@keyframes gradShift {
  0%,100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
