import { useEffect, useRef, useState } from 'react'
import { products } from '../data/products'
import styles from './Hero.module.css'

const BOOKS = products

export default function Hero({ onNavigate }) {
  const heroRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [animDir, setAnimDir] = useState('in') // 'in' | 'out'

  // Auto-advance slideshow
  useEffect(() => {
    const t = setInterval(() => {
      setAnimDir('out')
      setTimeout(() => {
        setActiveIdx(i => (i + 1) % BOOKS.length)
        setAnimDir('in')
      }, 400)
    }, 3200)
    return () => clearInterval(t)
  }, [])

  const goTo = (idx) => {
    if (idx === activeIdx) return
    setAnimDir('out')
    setTimeout(() => { setActiveIdx(idx); setAnimDir('in') }, 350)
  }

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const handleMouse = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty('--mx', x)
      el.style.setProperty('--my', y)
    }
    el.addEventListener('mousemove', handleMouse)
    return () => el.removeEventListener('mousemove', handleMouse)
  }, [])

  const book = BOOKS[activeIdx]

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.bgLayer1} />
      <div className={styles.bgLayer2} />
      <div className={styles.grain} />

      <div className={styles.inner}>
        {/* Left */}
        <div className={styles.left}>
          <div className={styles.brandBadge}>
            <span className={styles.brandDot} />
            The Pagecraft
          </div>

          <h1 className={styles.headline}>
            <span className={styles.headlineTop}>Stories that</span>
            <em className={styles.headlineAccent}>echo through</em>
            <span className={styles.headlineBottom}>history.</span>
          </h1>

          <p className={styles.sub}>
            Powerful books on India's history, politics, and nature — written by Ritesh Sharma to challenge what you think you know.
          </p>

          <div className={styles.actions}>
            <a href="/ebooks" onClick={e => { e.preventDefault(); onNavigate('/ebooks') }} className={styles.btnPrimary}>
              Explore Books
            </a>
            <a href="#thoughts" className={styles.btnGhost}>Read Thoughts</a>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}><strong>3</strong><span>Titles</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>5K+</strong><span>Readers</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>4.9★</strong><span>Rating</span></div>
          </div>
        </div>

        {/* Right — Book Slideshow */}
        <div className={styles.right}>
          <div className={styles.bookShowcase}>
            {/* Glow behind active book */}
            <div className={styles.bookGlow} />

            {/* All 3 book covers arranged in cascade */}
            <div className={styles.bookStack}>
              {BOOKS.map((b, i) => {
                const offset = i - activeIdx
                const wrappedOffset = ((offset % BOOKS.length) + BOOKS.length) % BOOKS.length
                // 0 = active, 1 = next, 2 = prev (shown behind)
                const pos = wrappedOffset <= 1 ? wrappedOffset : -1
                return (
                  <div
                    key={b.id}
                    className={`${styles.bookCard} ${i === activeIdx ? styles.bookActive : styles.bookInactive}`}
                    data-pos={pos}
                    onClick={() => goTo(i)}
                    style={{
                      '--pos': pos,
                      zIndex: i === activeIdx ? 3 : pos === 1 ? 2 : 1,
                    }}
                  >
                    <img src={b.image} alt={b.title} className={styles.bookCover} />
                    <div className={styles.bookShine} />
                  </div>
                )
              })}
            </div>

            {/* Active book info */}
            <div className={`${styles.bookInfo} ${animDir === 'out' ? styles.bookInfoOut : styles.bookInfoIn}`}>
              <span className={styles.bookBadge}>{book.badge}</span>
              <h3 className={styles.bookTitle}>{book.title}</h3>
              <p className={styles.bookSubtitle}>{book.subtitle}</p>
              {book.status === 'available' && book.amazonLink ? (
                <a href={book.amazonLink} target="_blank" rel="noopener noreferrer" className={styles.bookLink}>
                  Buy on Amazon ↗
                </a>
              ) : (
                <span className={styles.bookComingSoon}>Coming Soon</span>
              )}
            </div>

            {/* Dots */}
            <div className={styles.slideDots}>
              {BOOKS.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Book ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  )
}
