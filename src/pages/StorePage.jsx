import { useState, useRef, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import styles from './StorePage.module.css'

const CATEGORIES = ['All', ...new Set(products.map(p => p.category))]

export default function StorePage({ cart, onAdd, user, onAuthOpen }) {
  const [active, setActive] = useState('All')
  const [hovered, setHovered] = useState(null)
  const filterRef = useRef(null)
  const inkRef = useRef(null)

  const filtered = active === 'All' ? products : products.filter(p => p.category === active)

  // Liquid ink animation on filter click
  const handleCatClick = (cat, e) => {
    setActive(cat)
    const btn = e.currentTarget
    const ink = inkRef.current
    if (!ink || !btn) return
    const rect = btn.getBoundingClientRect()
    const filterRect = filterRef.current.getBoundingClientRect()
    ink.style.width = `${rect.width}px`
    ink.style.height = `${rect.height}px`
    ink.style.top = `${rect.top - filterRect.top}px`
    ink.style.left = `${rect.left - filterRect.left}px`
    ink.classList.remove(styles.inkActive)
    void ink.offsetWidth
    ink.classList.add(styles.inkActive)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>✦ The Pagecraft Collection</p>
        <h1 className={styles.title}>Our Books</h1>
        <p className={styles.sub}>Books on India's history, politics, and nature — by Ritesh Sharma</p>
        {!user && (
          <div className={styles.loginNotice}>
            <span>🔒</span>
            <span>
              <button className={styles.loginLink} onClick={onAuthOpen}>Create an account or login</button>
              {' '}to purchase books directly
            </span>
          </div>
        )}
      </div>

      <div className={styles.layout}>
        {/* ── Sidebar Filter ── */}
        <aside className={styles.sidebar}>
          <p className={styles.filterLabel}>Filter by</p>
          <div className={styles.filterList} ref={filterRef}>
            {/* liquid ink blob */}
            <div className={styles.inkBlob} ref={inkRef} />

            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${active === cat ? styles.filterActive : ''}`}
                onClick={e => handleCatClick(cat, e)}
                onMouseEnter={() => setHovered(cat)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className={styles.filterDot} />
                <span>{cat}</span>
                <span className={styles.filterCount}>
                  {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Wavy decoration */}
          <div className={styles.sideWave}>
            <svg viewBox="0 0 80 300" preserveAspectRatio="none">
              <path d="M40 0 Q70 75 40 150 Q10 225 40 300" stroke="rgba(147,51,234,0.2)" strokeWidth="1.5" fill="none"/>
              <path d="M40 0 Q60 60 40 120 Q20 180 40 240 Q60 270 40 300" stroke="rgba(147,51,234,0.1)" strokeWidth="1" fill="none"/>
            </svg>
          </div>
        </aside>

        {/* ── Grid ── */}
        <div className={styles.main}>
          <div className={styles.resultBar}>
            <span className={styles.resultCount}>{filtered.length} book{filtered.length !== 1 ? 's' : ''}</span>
            {active !== 'All' && (
              <button className={styles.clearFilter} onClick={() => setActive('All')}>
                Clear filter ✕
              </button>
            )}
          </div>

          <div className={styles.grid}>
            {filtered.map((product, i) => (
              <div key={product.id} className={styles.cardWrap} style={{ animationDelay: `${i * 0.08}s` }}>
                <ProductCard
                  product={product}
                  inCart={cart.some(c => c.id === product.id)}
                  onAdd={(p) => {
                    if (!user) { onAuthOpen(); return }
                    onAdd(p)
                  }}
                  user={user}
                  onAuthOpen={onAuthOpen}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
