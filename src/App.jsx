import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Ticker from './components/Ticker'
import Navbar from './components/Navbar'
import CartPanel from './components/CartPanel'
import AuthPage from './pages/AuthPage'
import AccountPage from './pages/AccountPage'
import HomePage from './pages/HomePage'
import StorePage from './pages/StorePage'
import DashboardPage from './pages/DashboardPage'
import BookReaderPage from './pages/BookReaderPage'
import AnimatedBackground from './components/AnimatedBackground'
import PageTransition from './components/PageTransition'
import SearchOverlay from './components/SearchOverlay'
import styles from './App.module.css'

function getPage() {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path.startsWith('/store')) return 'store'
    if (path.startsWith('/dashboard')) return 'dashboard'
    if (path.startsWith('/read/')) return 'reader'
  }
  return 'home'
}

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [page, setPage] = useState(getPage())
  const [readerBookId, setReaderBookId] = useState(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes — this fires after Google OAuth redirect too
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)

      // Auto-close auth modal on successful login (email OR Google OAuth)
      if (event === 'SIGNED_IN' && currentUser) {
        setAuthOpen(false)
      }

      // On sign out, close account panel and reset cart
      if (event === 'SIGNED_OUT') {
        setAccountOpen(false)
        setCart([])
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handlePopState = () => setPage(getPage())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (to) => {
    window.history.pushState({}, '', to)
    if (to.startsWith('/store')) setPage('store')
    else if (to.startsWith('/dashboard')) setPage('dashboard')
    else setPage('home')
    window.scrollTo(0, 0)
  }

  const openReader = (bookId) => {
    setReaderBookId(bookId)
    setPage('reader')
    window.history.pushState({}, '', `/read/${bookId}`)
    window.scrollTo(0, 0)
  }

  const closeReader = () => {
    navigate('/dashboard')
  }

  const addToCart = (product) => setCart(prev => prev.find(i => i.id === product.id) ? prev : [...prev, product])
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))

  const isDashboard = page === 'dashboard'
  const isReader = page === 'reader'

  // Reader page — fullscreen, no navbar/footer
  if (isReader) {
    return (
      <div className={styles.app}>
        <PageTransition pageKey="reader">
          <BookReaderPage productId={readerBookId} onBack={closeReader} />
        </PageTransition>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <AnimatedBackground />
      <div className={styles.content}>
        {!isDashboard && <Ticker />}
        <Navbar
          cartCount={cart.length}
          onCartOpen={() => setCartOpen(true)}
          user={user}
          onAuthOpen={() => setAuthOpen(true)}
          onAccountOpen={() => setAccountOpen(true)}
          onNavigate={navigate}
          currentPage={page}
        />

        <main>
          <PageTransition pageKey={page}>
            {page === 'home' && <HomePage onAuthOpen={() => setAuthOpen(true)} user={user} onNavigate={navigate} />}
            {page === 'store' && (
              <StorePage cart={cart} onAdd={addToCart} user={user} onAuthOpen={() => setAuthOpen(true)} />
            )}
            {page === 'dashboard' && (
              <DashboardPage user={user} onReadBook={openReader} />
            )}
          </PageTransition>
        </main>

        {!isDashboard && (
          <footer className={styles.footer}>
            <div className={styles.footerTop}>
              <div>
                <p className={styles.footerLogo}>The Pagecraft</p>
                <p className={styles.footerTagline}>Books that matter. Stories that last.</p>
              </div>
              <div className={styles.footerLinks}>
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/store')}>Books</button>
                <button onClick={() => navigate('/dashboard')}>Dashboard</button>
                <button onClick={() => user ? setAccountOpen(true) : setAuthOpen(true)}>
                  {user ? 'My Account' : 'Login'}
                </button>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <p>© {new Date().getFullYear()} The Pagecraft — thepagecraft.in. All rights reserved.</p>
            </div>
          </footer>
        )}
      </div>

      {!isDashboard && !isReader && <SearchOverlay onNavigate={navigate} />}
      {cartOpen && <CartPanel cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />}
      {authOpen && <AuthPage onClose={() => setAuthOpen(false)} onAuth={setUser} />}
      {accountOpen && user && (
        <AccountPage
          user={user}
          onClose={() => setAccountOpen(false)}
          onLogout={() => setUser(null)}
          onNavigate={navigate}
        />
      )}
    </div>
  )
}
