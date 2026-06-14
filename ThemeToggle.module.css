import { useState, useEffect } from 'react'
import styles from './PromoPopup.module.css'

export default function PromoPopup({ onNavigate }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('pagecraft_promo_dismissed')
    if (dismissed) return
    const t = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setVisible(false)
    sessionStorage.setItem('pagecraft_promo_dismissed', '1')
  }

  const handleExplore = () => {
    close()
    onNavigate?.('/ebooks')
  }

  if (!visible) return null

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && close()}>
      <div className={styles.card}>
        <button className={styles.closeBtn} onClick={close} aria-label="Close">✕</button>
        <img src="/echoes-of-freedom.jpg" alt="Echoes of Freedom" className={styles.cover} />
        <div className={styles.body}>
          <p className={styles.badge}>✦ Now Live</p>
          <h2 className={styles.title}>Echoes of Freedom</h2>
          <p className={styles.sub}>Untold Stories from India's Fight for Independence — by Ritesh Sharma</p>
          <div className={styles.btns}>
            <button className={styles.btnPrimary} onClick={handleExplore}>Explore eBooks →</button>
            <button className={styles.btnGhost} onClick={close}>Maybe Later</button>
          </div>
        </div>
      </div>
    </div>
  )
}
