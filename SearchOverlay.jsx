.nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(7,7,7,0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 0 56px;
  height: 62px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.3s;
}
.scrolled { box-shadow: 0 1px 40px rgba(0,0,0,0.6); }
.logo { display: flex; flex-direction: column; line-height: 1.15; cursor: pointer; gap: 1px; }
.logoText { font-family: var(--font-display); font-size: 19px; font-weight: 900; color: var(--white); letter-spacing: -0.3px; }
.logoSub { font-size: 8px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--text-3); }
.links { display: flex; gap: 2px; align-items: center; }
.link {
  color: var(--text-2); font-size: 13px; font-weight: 500;
  padding: 6px 14px; border-radius: 8px; transition: all 0.2s;
  letter-spacing: 0.2px;
}
.link:hover { color: var(--white); }
.active { color: var(--white) !important; }
.activeGold { color: var(--gold) !important; }
.actions { display: flex; gap: 8px; align-items: center; }
.loginBtn {
  background: var(--gold); color: #000;
  padding: 8px 20px; font-size: 12px; font-weight: 700;
  letter-spacing: 0.5px; border-radius: 8px; transition: all 0.2s;
}
.loginBtn:hover { background: var(--gold-2); }
.userBtn {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-3); border: 1px solid var(--border);
  padding: 5px 12px 5px 5px; border-radius: 24px; cursor: pointer; transition: border-color 0.2s;
}
.userBtn:hover { border-color: var(--gold); }
.userAvatar {
  width: 28px; height: 28px; background: var(--gold); color: #fff;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700;
}
.userAvatarImg {
  width: 28px; height: 28px; border-radius: 50%; object-fit: cover; display: block;
}
.userName { font-size: 12px; font-weight: 600; color: var(--text); max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cartBtn {
  background: var(--bg-3); color: var(--text);
  border: 1px solid var(--border); width: 38px; height: 38px;
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  position: relative; transition: all 0.2s;
}
.cartBtn:hover { border-color: var(--gold); color: var(--gold); }
.badge {
  position: absolute; top: -5px; right: -5px;
  background: var(--red); color: #fff; border-radius: 50%;
  width: 16px; height: 16px; font-size: 9px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
@media (max-width: 768px) { .nav { padding: 0 20px; } .links { display: none; } }

.myBooksBtn {
  display: flex; align-items: center; gap: 6px;
  background: rgba(201,146,42,0.08);
  border: 1px solid rgba(201,146,42,0.2);
  color: var(--gold);
  padding: 7px 13px; border-radius: 9px;
  font-size: 12px; font-weight: 600;
  transition: all 0.2s; cursor: pointer;
}
.myBooksBtn:hover {
  background: rgba(201,146,42,0.15);
  border-color: rgba(201,146,42,0.4);
}
.myBooksLabel { font-size: 12px; }
