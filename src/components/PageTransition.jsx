import { useEffect, useRef, useState } from 'react'
import styles from './PageTransition.module.css'

/**
 * PageTransition — shows a glitch logo spinner overlay between page changes,
 * then fades away. The actual children are always rendered (no stale closure issues).
 */
export default function PageTransition({ pageKey, children }) {
  const [prevKey, setPrevKey] = useState(pageKey)
  const [showOverlay, setShowOverlay] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (pageKey === prevKey) return

    // Show the logo spinner overlay
    setShowOverlay(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setShowOverlay(false)
      setPrevKey(pageKey)
    }, 900) // spinner visible for 900ms

    return () => clearTimeout(timerRef.current)
  }, [pageKey]) // eslint-disable-line

  return (
    <div className={styles.wrap}>
      {/* Content — always live, never stale */}
      <div className={`${styles.content} ${showOverlay ? styles.contentDim : ''}`}>
        {children}
      </div>

      {/* Logo spinner overlay */}
      {showOverlay && (
        <div className={styles.overlay}>
          <div className={styles.spinnerWrap}>
            <div className={styles.ring} />
            <div className={styles.ring2} />
            <img src="/logo.jpg" alt="The Craft Page" className={styles.logoImg} />
            <div className={styles.glitch1} aria-hidden="true">
              <img src="/logo.jpg" alt="" className={styles.logoImg} />
            </div>
            <div className={styles.glitch2} aria-hidden="true">
              <img src="/logo.jpg" alt="" className={styles.logoImg} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
