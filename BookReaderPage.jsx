import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import styles from './AuthPage.module.css'

function StepItem({ number, text, active }) {
  return (
    <div className={`${styles.stepItem} ${active ? styles.stepActive : styles.stepInactive}`}>
      <div className={`${styles.stepNum} ${active ? styles.stepNumActive : styles.stepNumInactive}`}>
        {number}
      </div>
      <span className={styles.stepText}>{text}</span>
    </div>
  )
}

function SocialButton({ icon, label }) {
  return (
    <button className={styles.socialBtn} type="button">
      <span className={styles.socialIcon}>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function InputGroup({ label, placeholder, type = 'text', value, onChange, onKeyDown, rightEl }) {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.inputLabel}>{label}</label>
      <div className={styles.inputWrap}>
        <input
          className={styles.input}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {rightEl && <div className={styles.inputRight}>{rightEl}</div>}
      </div>
    </div>
  )
}

export default function AuthPage({ onClose, onAuth }) {
  const [mode, setMode] = useState('signup')
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [])

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))


  const handleGoogleLogin = async () => {
    setError(''); setLoading(true)
    try {
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: { access_type: 'offline', prompt: 'consent' }
        }
      })
      if (err) throw err
      // Page will redirect to Google — loading stays true intentionally
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setError(''); setLoading(true)
    try {
      if (mode === 'signup') {
        if (!form.firstName.trim()) { setError('First name is required'); setLoading(false); return }
        const { data, error: err } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { full_name: `${form.firstName} ${form.lastName}`.trim() } }
        })
        if (err) throw err
        setSuccess('Account created! Check your email to verify.')
      } else if (mode === 'login') {
        const { data, error: err } = await supabase.auth.signInWithPassword({
          email: form.email, password: form.password
        })
        if (err) throw err
        onAuth(data.user); onClose()
      } else {
        const { error: err } = await supabase.auth.resetPasswordForEmail(form.email)
        if (err) throw err
        setSuccess('Reset link sent to your email!')
      }
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  const switchMode = (m) => { setMode(m); setError(''); setSuccess('') }

  const steps = [
    { text: 'Create profile' },
    { text: 'Verify email' },
    { text: 'Start reading' },
  ]

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`${styles.modal} ${visible ? styles.modalVisible : ''}`}>

        {/* LEFT PANEL */}
        <div className={styles.leftPanel}>
          <div className={styles.leftTop}>
            <div className={styles.brandMark}>
              <img src="/logo.jpg" alt="The Craft Page" className={styles.brandLogo} />
              <span>The Pagecraft</span>
            </div>
            <h2 className={styles.leftHeadline}>
              Begin your<br />reading<br /><em>journey.</em>
            </h2>
            <p className={styles.leftSub}>
              Join thousands of readers exploring India's untold history, politics, and nature.
            </p>
          </div>

          <div className={styles.stepsSection}>
            {steps.map((s, i) => (
              <StepItem key={i} number={i + 1} text={s.text}
                active={mode === 'signup' ? i === 0 : i === 0} />
            ))}
          </div>

          <div className={styles.leftQuote}>
            <div className={styles.quoteBar} />
            <p>"Every book is a new world waiting to be discovered."</p>
            <span>— Ritesh Sharma</span>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.rightPanel}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

          <div className={`${styles.formWrap} ${visible ? styles.formWrapVisible : ''}`}>
            {/* Header */}
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>
                {mode === 'signup' ? 'Create New Profile' : mode === 'login' ? 'Welcome Back' : 'Reset Password'}
              </h3>
              <p className={styles.formSub}>
                {mode === 'signup'
                  ? 'Input your basic details to begin the journey.'
                  : mode === 'login'
                  ? 'Sign in to continue your reading journey.'
                  : 'Enter your email to receive a reset link.'}
              </p>
            </div>

            {error && <div className={styles.errorBox}>{error}</div>}
            {success && <div className={styles.successBox}>{success}</div>}

            {/* Social login — shown for signup and login */}
            {(mode === 'signup' || mode === 'login') && (
              <>
                <button
                  type="button"
                  className={styles.googleBtn}
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>

                <div className={styles.divider}>
                  <div className={styles.dividerLine} />
                  <span className={styles.dividerText}>or continue with email</span>
                  <div className={styles.dividerLine} />
                </div>
              </>
            )}

            {/* Form fields */}
            <div className={styles.fields}>
              {mode === 'signup' && (
                <div className={styles.nameGrid}>
                  <InputGroup label="First Name" placeholder="Ritesh"
                    value={form.firstName} onChange={set('firstName')} />
                  <InputGroup label="Last Name" placeholder="Sharma"
                    value={form.lastName} onChange={set('lastName')} />
                </div>
              )}

              <InputGroup label="Email Address" placeholder="you@example.com"
                type="email" value={form.email} onChange={set('email')} />

              {mode !== 'forgot' && (
                <div>
                  <InputGroup
                    label="Password"
                    placeholder="••••••••"
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={set('password')}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    rightEl={
                      <button type="button" className={styles.eyeBtn}
                        onClick={() => setShowPass(s => !s)} aria-label="Toggle password">
                        {showPass ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        )}
                      </button>
                    }
                  />
                  <p className={styles.passHelper}>Requires at least 8 symbols.</p>
                </div>
              )}

              {mode === 'login' && (
                <button type="button" className={styles.forgotLink}
                  onClick={() => switchMode('forgot')}>
                  Forgot password?
                </button>
              )}
            </div>

            {/* Submit */}
            <button className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <span className={styles.spinner} />
              ) : mode === 'signup' ? 'Create Account'
                : mode === 'login' ? 'Sign In'
                : 'Send Reset Link'}
            </button>

            {/* Footer link */}
            <p className={styles.footerLink}>
              {mode === 'signup' ? (
                <>Member already?{' '}
                  <button type="button" onClick={() => switchMode('login')}>Log in</button>
                </>
              ) : (
                <>New here?{' '}
                  <button type="button" onClick={() => switchMode('signup')}>Create account</button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
