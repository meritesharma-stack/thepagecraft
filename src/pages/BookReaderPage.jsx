import { useEffect, useRef, useState } from 'react'
import styles from './BookReaderPage.module.css'

// Book content keyed by product id
const BOOK_CONTENT = {
  1: {
    title: 'Echoes of Freedom',
    chapters: [
      {
        title: 'Chapter 1: The First Spark',
        content: `Long before the guns of 1857 roared across the plains of Hindustan, the seeds of resistance had already been quietly sown — in the hearts of weavers whose looms had been stilled, in the eyes of farmers whose harvests were taxed into dust, and in the whispers of scholars who had read enough to know that what was being done to them had a name.

The British East India Company arrived as a trader and stayed as a conqueror. It is a story so familiar now that we sometimes forget how audacious it truly was — a private commercial enterprise, backed by a distant island nation, gradually dismantling the sovereignty of one of the world's oldest civilisations.

But sovereignty is not so easily dismantled. For every administrator who believed India had been "pacified," there was a village elder who remembered differently. For every regiment that pledged loyalty to the Crown, there was a soldier who kept another loyalty closer to his chest.

The first sparks of freedom were not grand. They were intimate. A mother telling her son the name of the king who had ruled before the foreigners came. A poet slipping verses of defiance into devotional songs that the censors could not understand. A merchant refusing, at great personal cost, to trade in goods that enriched only the Empire.

These small resistances accumulated like dry leaves in autumn. No one could say exactly when the pile became large enough to catch fire. But it did.`
      },
      {
        title: 'Chapter 2: Voices That Would Not Be Silenced',
        content: `History is written by those who survive it, and survival in colonial India required a particular kind of courage — not the loud courage of the battlefield, but the quiet courage of continuing to exist on one's own terms.

Bal Gangadhar Tilak understood this. When he declared that freedom was his birthright and he would have it, the words landed like a stone dropped into still water. The ripples did not stop at the shore of his prison cell. They crossed the oceans of time and reached men and women who had not yet been born.

Lala Lajpat Rai understood it too. Beaten on the streets of Lahore for leading a protest against the Simon Commission — a body that presumed to decide India's future without a single Indian voice — he reportedly said that every blow struck against him would one day strike the nails into the coffin of British rule. He was right, though he would not live to see it.

And then there was Sarojini Naidu, the Nightingale of India, who used the language of poetry to carry truths that prose could not safely speak. She walked with Gandhi through the salt flats of Dandi and sang the nation back to itself when it most needed singing.

These were not superhuman figures. They were people who had chosen, at great cost, to say what they saw. And in saying it, they made it possible for others to see it too.`
      },
      {
        title: 'Chapter 3: The Fire Spreads',
        content: `By the 1920s, the freedom movement had ceased to be the province of lawyers and poets alone. It had entered the fields.

Gandhi's genius — and it was, whatever one thinks of his methods, an undeniable genius — was to understand that India could not be freed by India's elite alone. The farmers who fed the nation, the weavers who clothed it, the labourers who built its roads and railways: these people were not passive spectators to history. They were its most essential participants. They needed only to be shown that they could act.

The Non-Cooperation Movement of 1920 gave them that demonstration. Across the country, students left British-run schools. Lawyers walked out of British-run courts. Consumers boycotted British cloth and burned it in public bonfires that lit up the night sky over a hundred cities.

The British had always known, at some level, that their hold on India was a feat of psychology as much as of arms. Empire runs on the consent of the colonised — a consent that is coerced, yes, but consent nonetheless. Once that consent began to crack, once ordinary Indians started to look at the Empire and see not an invincible machine but a structure built on their own compliance, the end became, if not imminent, then inevitable.

The fire had been lit. There was no putting it out now.`
      },
      {
        title: 'Chapter 4: The Cost of Freedom',
        content: `Freedom is never free. This is not a cliché — it is a fact written in blood across the pages of history, and India's freedom story is no exception.

Jallianwala Bagh on April 13, 1919, is the most infamous chapter in that story. General Dyer ordered his troops to fire on a peaceful gathering of thousands — men, women, and children who had come together on a festival day, in a walled garden in Amritsar, with no way out. The firing continued until the ammunition ran low. Hundreds were killed. Thousands were wounded.

The massacre did not break the movement. It hardened it.

Bhagat Singh was only twelve years old when news of the massacre reached his village. He reportedly walked to Amritsar and filled a bottle with soil soaked in the martyrs' blood. He kept that bottle. And when he was old enough, he made the choice that would define his short life: that some things were worth dying for, and freedom was one of them.

He was hanged at the age of twenty-three, along with Rajguru and Sukhdev. He faced the gallows not with resignation but with something that those present described as joy — the joy of a man who has lived exactly as he believed he should.

The cost of freedom was paid in lives like his. We owe it to them not to forget.`
      },
      {
        title: 'Chapter 5: The Dawn We Almost Missed',
        content: `The final years before independence were the most turbulent. The Second World War had exhausted Britain. The Quit India Movement of 1942, Gandhi's most radical call to civil disobedience, had demonstrated that India's will to be free could not be broken even by mass imprisonment.

But freedom, when it came, came shadowed. The partition of 1947 — the division of the subcontinent into India and Pakistan along religious lines — resulted in one of the largest forced migrations in human history. Millions of people crossed borders that had not existed the week before. Hundreds of thousands did not survive the crossing.

The independence we celebrate on the fifteenth of August must always be held alongside the grief of that partition. The two are inseparable. To honour one without acknowledging the other is to tell only half a story.

Yet the dawn did come. Jawaharlal Nehru stood at the microphone in the Constituent Assembly and spoke of a tryst with destiny — of how India had made a pledge long ago and was now, after years of struggle and sacrifice, about to redeem it.

Outside, across a newly free nation, people who had waited their entire lives for this moment wept and laughed at the same time. The tricolour rose over Red Fort. A country that had been told, for two centuries, that it was not capable of governing itself, began the improbable, magnificent, ongoing experiment of doing exactly that.

This is their story. It belongs to all of us.`
      },
    ]
  },
}

export default function BookReaderPage({ productId, onBack }) {
  const book = BOOK_CONTENT[productId]
  const [chapter, setChapter] = useState(0)
  const [fontSize, setFontSize] = useState(17)
  const contentRef = useRef(null)

  // ── Anti-copy / Anti-screenshot / Anti-right-click ──
  useEffect(() => {
    // Disable right-click
    const noContext = e => e.preventDefault()
    document.addEventListener('contextmenu', noContext)

    // Disable select
    const noSelect = e => e.preventDefault()
    document.addEventListener('selectstart', noSelect)

    // Disable copy / cut
    const noCopy = e => e.preventDefault()
    document.addEventListener('copy', noCopy)
    document.addEventListener('cut', noCopy)

    // Disable PrintScreen & common screenshot shortcuts
    const noKeys = e => {
      // PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault()
        navigator.clipboard?.writeText('').catch(() => {})
        return
      }
      // Ctrl/Cmd + P (print), Ctrl/Cmd + S (save), Ctrl/Cmd + A (select all)
      if ((e.ctrlKey || e.metaKey) && ['p','s','a','c','u'].includes(e.key.toLowerCase())) {
        e.preventDefault()
      }
      // F12 devtools
      if (e.key === 'F12') e.preventDefault()
    }
    document.addEventListener('keydown', noKeys)

    // Disable drag
    const noDrag = e => e.preventDefault()
    document.addEventListener('dragstart', noDrag)

    return () => {
      document.removeEventListener('contextmenu', noContext)
      document.removeEventListener('selectstart', noSelect)
      document.removeEventListener('copy', noCopy)
      document.removeEventListener('cut', noCopy)
      document.removeEventListener('keydown', noKeys)
      document.removeEventListener('dragstart', noDrag)
    }
  }, [])

  if (!book) {
    return (
      <div className={styles.error}>
        <p>Book content not available yet.</p>
        <button onClick={onBack}>← Back</button>
      </div>
    )
  }

  const chap = book.chapters[chapter]

  return (
    <div className={styles.reader}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <button className={styles.backBtn} onClick={onBack}>← Back to Dashboard</button>
        <h2 className={styles.bookTitle}>{book.title}</h2>
        <p className={styles.chapCount}>{book.chapters.length} Chapters</p>

        <nav className={styles.chapNav}>
          {book.chapters.map((c, i) => (
            <button
              key={i}
              className={`${styles.chapBtn} ${i === chapter ? styles.chapActive : ''}`}
              onClick={() => { setChapter(i); contentRef.current?.scrollTo(0, 0) }}
            >
              <span className={styles.chapNum}>{i + 1}</span>
              <span className={styles.chapName}>{c.title}</span>
            </button>
          ))}
        </nav>

        <div className={styles.fontControls}>
          <span>Font Size</span>
          <div className={styles.fontBtns}>
            <button onClick={() => setFontSize(f => Math.max(13, f - 1))}>A−</button>
            <span>{fontSize}px</span>
            <button onClick={() => setFontSize(f => Math.min(24, f + 1))}>A+</button>
          </div>
        </div>

        <div className={styles.secureNote}>
          🔒 This content is protected. Copying, screenshots, and printing are disabled.
        </div>
      </aside>

      {/* Reader area */}
      <main className={styles.content} ref={contentRef}>
        {/* Watermark overlay */}
        <div className={styles.watermarkLayer} aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className={styles.watermark}>The Pagecraft · Protected</span>
          ))}
        </div>

        <article className={styles.article} style={{ fontSize }}>
          <h1 className={styles.chapTitle}>{chap.title}</h1>
          {chap.content.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        {/* Chapter navigation */}
        <div className={styles.chapNavBottom}>
          <button
            className={styles.navBtn}
            onClick={() => { setChapter(c => Math.max(0, c - 1)); contentRef.current?.scrollTo(0, 0) }}
            disabled={chapter === 0}
          >
            ← Previous Chapter
          </button>
          <span>{chapter + 1} / {book.chapters.length}</span>
          <button
            className={styles.navBtn}
            onClick={() => { setChapter(c => Math.min(book.chapters.length - 1, c + 1)); contentRef.current?.scrollTo(0, 0) }}
            disabled={chapter === book.chapters.length - 1}
          >
            Next Chapter →
          </button>
        </div>
      </main>
    </div>
  )
}
