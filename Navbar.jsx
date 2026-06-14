.hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 80px 64px 80px;
  position: relative;
  overflow: hidden;
  gap: 40px;
}

.bgLayer1 {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 60% at 80% 30%, rgba(147,51,234,0.07) 0%, transparent 65%);
  pointer-events: none;
}
.bgLayer2 {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 50% 70% at 10% 80%, rgba(167,139,250,0.04) 0%, transparent 60%);
  pointer-events: none;
}
.grain {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none; opacity: 0.4;
}
.inner { position: relative; z-index: 2; display: contents; }

/* LEFT */
.left { position: relative; z-index: 2; max-width: 520px; }
.brandBadge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(147,51,234,0.08); border: 1px solid rgba(147,51,234,0.2);
  padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600;
  letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold);
  margin-bottom: 28px; animation: fadeUp 0.7s ease both;
}
.brandDot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
.headline {
  font-family: var(--font-display); font-size: clamp(42px,5vw,68px);
  font-weight: 900; line-height: 1.06; color: var(--white); letter-spacing: -1px;
  margin-bottom: 22px; animation: fadeUp 0.7s 0.1s ease both; display: flex; flex-direction: column;
}
.headlineTop { display: block; color: rgba(240,237,232,0.55); }
.headlineAccent { display: block; font-style: italic; color: var(--gold); }
.headlineBottom { display: block; color: var(--white); }
.sub { font-size: 16px; color: var(--text-2); line-height: 1.75; max-width: 420px; margin-bottom: 36px; animation: fadeUp 0.7s 0.18s ease both; }
.actions { display: flex; gap: 12px; margin-bottom: 48px; flex-wrap: wrap; animation: fadeUp 0.7s 0.24s ease both; }
.btnPrimary { background: var(--gold); color: #000; padding: 14px 32px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; border-radius: 10px; transition: all 0.2s; display: inline-block; }
.btnPrimary:hover { background: var(--gold-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(147,51,234,0.25); }
.btnGhost { border: 1px solid rgba(255,255,255,0.1); color: var(--text-2); padding: 14px 28px; font-size: 13px; font-weight: 600; letter-spacing: 0.3px; border-radius: 10px; transition: all 0.2s; display: inline-block; background: rgba(255,255,255,0.03); }
.btnGhost:hover { border-color: rgba(255,255,255,0.2); color: var(--white); }
.stats { display: flex; gap: 0; align-items: center; animation: fadeUp 0.7s 0.3s ease both; }
.stat { display: flex; flex-direction: column; gap: 3px; padding-right: 24px; }
.stat strong { font-family: var(--font-display); font-size: 26px; font-weight: 700; color: var(--white); line-height: 1; }
.stat span { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-3); }
.statDivider { width: 1px; height: 32px; background: var(--border); margin-right: 24px; }

/* RIGHT — Book Slideshow */
.right { position: relative; z-index: 2; display: flex; justify-content: center; align-items: center; animation: fadeUp 0.9s 0.15s ease both; }

.bookShowcase {
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.bookGlow {
  position: absolute;
  top: 30px; left: 50%;
  transform: translateX(-50%);
  width: 260px; height: 260px;
  background: radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: pulse 3s ease-in-out infinite;
}

.bookStack {
  position: relative;
  width: 200px;
  height: 280px;
}

.bookCard {
  position: absolute;
  top: 0; left: 50%;
  width: 180px;
  height: 260px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease, box-shadow 0.4s ease;
  border: 1px solid rgba(255,255,255,0.08);
}

.bookActive {
  transform: translateX(-50%) translateY(0) scale(1) rotate(0deg) !important;
  opacity: 1 !important;
  box-shadow: 0 24px 64px rgba(147,51,234,0.22), 0 8px 24px rgba(0,0,0,0.5);
  z-index: 3 !important;
}

/* Inactive cards arranged behind */
.bookInactive[data-pos="1"] {
  transform: translateX(-30%) translateY(12px) scale(0.88) rotate(6deg);
  opacity: 0.5;
}
.bookInactive[data-pos="-1"] {
  transform: translateX(-70%) translateY(12px) scale(0.88) rotate(-6deg);
  opacity: 0.5;
}
.bookInactive[data-pos="2"] {
  transform: translateX(-50%) translateY(16px) scale(0.8) rotate(0deg);
  opacity: 0.25;
}

.bookCover { width: 100%; height: 100%; object-fit: cover; display: block; }

.bookShine {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%);
  pointer-events: none;
}

.bookInfo { text-align: center; width: 100%; }
.bookInfoIn { animation: fadeInfoIn 0.4s ease both; }
.bookInfoOut { animation: fadeInfoOut 0.35s ease both; }

.bookBadge {
  display: inline-block;
  background: rgba(147,51,234,0.15);
  border: 1px solid rgba(147,51,234,0.3);
  color: var(--gold);
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 8px;
}

.bookTitle {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: var(--white);
  line-height: 1.2;
  margin-bottom: 4px;
}
.bookSubtitle { font-size: 12px; color: var(--text-3); margin-bottom: 10px; }
.bookLink {
  display: inline-block;
  font-size: 12px; font-weight: 600;
  color: var(--gold); letter-spacing: 0.3px;
  border-bottom: 1px solid rgba(147,51,234,0.3);
  padding-bottom: 1px; transition: color 0.2s;
}
.bookLink:hover { color: var(--gold-2); }
.bookComingSoon { font-size: 11px; color: var(--text-3); letter-spacing: 1px; text-transform: uppercase; }

.slideDots { display: flex; gap: 8px; justify-content: center; margin-top: 4px; }
.dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--border-2); border: none;
  transition: all 0.3s ease; cursor: pointer; padding: 0;
}
.dotActive { background: var(--gold); transform: scale(1.4); }

/* Scroll hint */
.scrollHint { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 3; }
.scrollLine { width: 1px; height: 40px; background: linear-gradient(to bottom, transparent, var(--gold)); animation: pulse 1.8s ease-in-out infinite; }
.scrollHint span { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--text-3); }

@keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
@keyframes fadeInfoIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInfoOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-8px); } }

@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; padding: 60px 24px 100px; text-align: center; }
  .right { display: none; }
  .stats { justify-content: center; }
  .actions { justify-content: center; }
  .sub { margin-left: auto; margin-right: auto; }
  .brandBadge { margin-left: auto; margin-right: auto; }
}
