/* ── Wrapper ── */
.wrap {
  position: relative;
}

.content {
  transition: opacity 0.25s ease, filter 0.25s ease;
}
.contentDim {
  opacity: 0.15;
  filter: blur(3px);
  pointer-events: none;
}

/* ── Full-screen overlay ── */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(7, 7, 7, 0.82);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: overlayFadeIn 0.18s ease forwards;
}

@keyframes overlayFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── Spinner wrap ── */
.spinnerWrap {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Outer spinning ring */
.ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #9333ea;
  border-right-color: #9333ea44;
  animation: spin 0.9s linear infinite;
}

/* Inner ring — opposite spin */
.ring2 {
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-bottom-color: #00ffff66;
  border-left-color: #ff00ff44;
  animation: spinReverse 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes spinReverse {
  to { transform: rotate(-360deg); }
}

/* ── Logo image ── */
.logoImg {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

/* Glitch layer 1 — cyan offset */
.glitch1 {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: glitch1 0.9s steps(1) infinite;
  mix-blend-mode: screen;
  opacity: 0.6;
}

/* Glitch layer 2 — magenta offset */
.glitch2 {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: glitch2 0.9s steps(1) infinite;
  mix-blend-mode: screen;
  opacity: 0.5;
}

@keyframes glitch1 {
  0%, 85%, 100% { transform: translate(0, 0); filter: none; opacity: 0; }
  10%  { transform: translate(-4px, 1px); filter: hue-rotate(90deg) saturate(3); opacity: 0.55; }
  20%  { transform: translate(3px, -2px); filter: hue-rotate(200deg); opacity: 0.4; }
  30%  { transform: translate(0, 0); opacity: 0; }
  55%  { transform: translate(5px, 0); filter: hue-rotate(120deg) saturate(4); opacity: 0.5; }
  65%  { transform: translate(-3px, 2px); opacity: 0; }
}

@keyframes glitch2 {
  0%, 80%, 100% { transform: translate(0, 0); filter: none; opacity: 0; }
  15%  { transform: translate(4px, -1px); filter: hue-rotate(-90deg) saturate(3); opacity: 0.5; }
  25%  { transform: translate(-3px, 2px); opacity: 0; }
  50%  { transform: translate(-5px, 1px); filter: hue-rotate(-150deg) saturate(4); opacity: 0.45; }
  70%  { transform: translate(2px, -3px); opacity: 0; }
}
