import { useRef, useEffect } from 'react'
import Hero from '../components/Hero'
import styles from './HomePage.module.css'

const THOUGHTS = [
  {
    id: 1,
    type: 'thought',
    text: "History is not a burden on the memory but an illumination of the soul. Every page we write today becomes the echo of tomorrow.",
    date: "June 2026",
  },
  {
    id: 2,
    type: 'quote',
    text: "The freedom we enjoy today was built on the sacrifices of those who dared to dream of a better future.",
    source: "— Echoes of Freedom",
  },
  {
    id: 3,
    type: 'news',
    tag: 'News',
    headline: 'Echoes of Freedom — Now Available on Amazon',
    text: "My debut book is live! A deeply personal project about India's independence movement, the unsung heroes, and the spirit that drives a nation. Available as Kindle and paperback.",
    date: "2026",
    link: "https://www.amazon.in/Echoes-Freedom-Stories-Independence-Uncovered-ebook/dp/B0GSS7P99D",
  },
  {
    id: 4,
    type: 'thought',
    text: "Nature never deceives us. It is always we who deceive ourselves. Every time I walked through India's forests and fields, I understood something no classroom ever taught me.",
    date: "May 2026",
  },
  {
    id: 5,
    type: 'quote',
    text: "Bihar is not what they show you on the news. Bihar is what you feel when you sit with an old farmer at sunset and hear stories that historians forgot to write.",
    source: "— The Real Bihar (Coming Soon)",
  },
  {
    id: 6,
    type: 'news',
    tag: 'Coming Soon',
    headline: 'Two New Titles in Progress',
    text: "'The Real Bihar' and 'Nature Never Lies!' are both in the final stages. These books are close to my heart — they are about truth, roots, and the India I've witnessed firsthand.",
    date: "2026",
  },
  {
    id: 7,
    type: 'experience',
    text: "I once sat on the banks of the Ganga in Patna, watching the sun go down, and I realized — every river in India carries a story. Not just water. Stories of people, protests, prayers, and persistence.",
    date: "Personal Experience",
  },
]

function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.dataset.visible = 'true'; obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function ThoughtEntry({ item, index }) {
  const ref = useReveal()

  if (item.type === 'quote') return (
    <div className={styles.pullQuote} ref={ref} data-visible="false" style={{ transitionDelay: `${index * 0.07}s` }}>
      <div className={styles.pullLine} />
      <blockquote className={styles.pullText}>{item.text}</blockquote>
      <cite className={styles.pullSource}>{item.source}</cite>
    </div>
  )

  if (item.type === 'news') return (
    <div className={styles.newsEntry} ref={ref} data-visible="false" style={{ transitionDelay: `${index * 0.07}s` }}>
      <div className={styles.newsLeft}>
        <span className={styles.newsTag}>{item.tag}</span>
        <span className={styles.newsDate}>{item.date}</span>
      </div>
      <div className={styles.newsRight}>
        <h3 className={styles.newsHeadline}>{item.headline}</h3>
        <p className={styles.newsBody}>{item.text}</p>
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.newsLink}>
            Read on Amazon ↗
          </a>
        )}
      </div>
    </div>
  )

  if (item.type === 'experience') return (
    <div className={styles.expEntry} ref={ref} data-visible="false" style={{ transitionDelay: `${index * 0.07}s` }}>
      <span className={styles.expGlyph}>✦</span>
      <p className={styles.expText}>{item.text}</p>
      <span className={styles.expLabel}>{item.date}</span>
    </div>
  )

  // thought
  return (
    <div className={styles.thoughtEntry} ref={ref} data-visible="false" style={{ transitionDelay: `${index * 0.07}s` }}>
      <span className={styles.thoughtDate}>{item.date}</span>
      <p className={styles.thoughtText}>{item.text}</p>
    </div>
  )
}

export default function HomePage({ onAuthOpen, user, onNavigate }) {
  const aboutRef = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.dataset.visible = 'true' },
      { threshold: 0.1 }
    )
    if (aboutRef.current) obs.observe(aboutRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Hero onNavigate={onNavigate} />

      {/* ── Thoughts Feed ────────────────────── */}
      <section className={styles.feed} id="thoughts">
        <div className={styles.feedLabel}>
          <span className={styles.labelLine} />
          <span className={styles.labelText}>From Ritesh's Desk</span>
          <span className={styles.labelLine} />
        </div>
        <div className={styles.feedTitle}>
          <h2>Thoughts <em>&</em> Stories</h2>
          <p>Reflections, quotes from my books, news, and personal experiences.</p>
        </div>

        <div className={styles.entries}>
          {THOUGHTS.map((item, i) => (
            <ThoughtEntry key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── About ──────────────────────────── */}
      <section className={styles.about} id="about" ref={aboutRef} data-visible="false">
        <div className={styles.aboutInner}>
          <div className={styles.aboutLeft}>
            <p className={styles.eyebrow}>About the Author</p>
            <h2 className={styles.aboutName}>Ritesh Sharma</h2>
            <p className={styles.aboutText}>
              Independent author and publisher based in India, passionate about bringing untold stories of India's history, politics, and natural world to life through The Pagecraft.
            </p>
            <p className={styles.aboutText} style={{ marginTop: '16px' }}>
              His debut title <em>Echoes of Freedom</em> has been widely praised. More titles are on the way — each one a tribute to India's extraordinary story.
            </p>
            <div className={styles.aboutBtns}>
              <a href="/store" className={styles.btnPrimary} onClick={e => { e.preventDefault(); onNavigate('/store') }}>
                View All Books →
              </a>
              {!user && (
                <button className={styles.btnGhost} onClick={onAuthOpen}>
                  Create Account
                </button>
              )}
            </div>
          </div>
          <div className={styles.aboutRight}>
            <div className={styles.statGrid}>
              {[
                { val: '3', label: 'Titles' },
                { val: '5K+', label: 'Readers' },
                { val: '4.9★', label: 'Rating' },
                { val: '🇮🇳', label: 'Made in India' },
              ].map(s => (
                <div className={styles.stat} key={s.label}>
                  <strong>{s.val}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Us ──────────────────────── */}
      <section className={styles.contact} id="contact">
        <div className={styles.contactInner}>
          <div className={styles.contactLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Get In Touch</span>
            <span className={styles.labelLine} />
          </div>
          <h2 className={styles.contactTitle}>Contact Us</h2>
          <p className={styles.contactSub}>
            Have a question about a book, a collaboration idea, or just want to share your thoughts? 
            Ritesh reads every message personally. Reach out — he'd love to hear from you.
          </p>

          <div className={styles.contactCard}>
            <div className={styles.contactRow}>
              <div className={styles.contactIconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className={styles.contactInfo}>
                <p className={styles.contactInfoLabel}>Email</p>
                <a
                  href="mailto:thepagecraft0@gmail.com"
                  className={styles.contactEmail}
                >
                  thepagecraft0@gmail.com
                </a>
              </div>
            </div>

            <div className={styles.contactDivider} />

            <div className={styles.contactRow}>
              <div className={styles.contactIconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className={styles.contactInfo}>
                <p className={styles.contactInfoLabel}>Based In</p>
                <p className={styles.contactInfoVal}>India 🇮🇳</p>
              </div>
            </div>

            <div className={styles.contactDivider} />

            <div className={styles.contactRow}>
              <div className={styles.contactIconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className={styles.contactInfo}>
                <p className={styles.contactInfoLabel}>Response Time</p>
                <p className={styles.contactInfoVal}>Usually within 24–48 hours</p>
              </div>
            </div>
          </div>

          <div className={styles.contactIssues}>
            <p className={styles.issuesTitle}>Common queries we can help with:</p>
            <div className={styles.issuesTags}>
              {['Book inquiries', 'Bulk orders', 'Press & media', 'Collaborations', 'Reading groups', 'Feedback'].map(tag => (
                <span key={tag} className={styles.issueTag}>{tag}</span>
              ))}
            </div>
          </div>

          <a href="mailto:thepagecraft0@gmail.com" className={styles.contactBtn}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Send a Message
          </a>
        </div>
      </section>

    </>
  )
}
