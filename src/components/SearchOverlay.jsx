import { useState, useEffect, useRef } from 'react'
import { products } from '../data/products'
import styles from './SearchOverlay.module.css'

export default function SearchOverlay({ onNavigate }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const results = query.trim().length > 0
    ? products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200)
    } else {
      setQuery('')
    }
  }, [open])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(true) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      {/* Floating search button */}
      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Search"
      >
        <span className={styles.fabRing} />
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        }
        <span className={styles.fabPulse} />
      </button>

      {/* Overlay */}
      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div className={styles.panel} onClick={e => e.stopPropagation()}>
            <div className={styles.searchRow}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={styles.searchIcon}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                ref={inputRef}
                className={styles.input}
                placeholder="Search books, topics…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <kbd className={styles.esc} onClick={() => setOpen(false)}>ESC</kbd>
            </div>

            {query.trim() === '' && (
              <div className={styles.hint}>
                <p>Try: <span onClick={() => setQuery('History')}>History</span> · <span onClick={() => setQuery('Nature')}>Nature</span> · <span onClick={() => setQuery('Bihar')}>Bihar</span></p>
              </div>
            )}

            {results.length > 0 && (
              <div className={styles.results}>
                {results.map(p => (
                  <button
                    key={p.id}
                    className={styles.result}
                    onClick={() => { onNavigate('/store'); setOpen(false) }}
                  >
                    <span className={styles.resultCat}>{p.category}</span>
                    <span className={styles.resultTitle}>{p.title}</span>
                    <span className={styles.resultSub}>{p.subtitle}</span>
                  </button>
                ))}
              </div>
            )}

            {query.trim().length > 0 && results.length === 0 && (
              <div className={styles.empty}>No books found for "{query}"</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
