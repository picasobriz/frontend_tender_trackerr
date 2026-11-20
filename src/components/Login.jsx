import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Contractor') // Default role choice
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate backend response verification with selected role
    setTimeout(() => {
      setIsLoading(false)
      
      // Store token and selected user role in localStorage
      localStorage.setItem('token', 'mock_jwt_token_12345')
      localStorage.setItem('userRole', role)
      localStorage.setItem('userEmail', email)

      // Automatically redirect to the dashboard
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      fontFamily: 'Inter, system-ui, sans-serif', 
      background: '#0f172a',
      color: '#f8fafc'
    }}>
      
      {/* Left Branding Panel */}
      <div style={{ 
        flex: 1, 
        background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)', 
        padding: '4rem', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        display: window.innerWidth > 768 ? 'flex' : 'none'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: '38px', height: '38px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.5-3 5.5-3 5.5s-3-2-3-5.5a3 3 0 116 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 00-7.07 17.07l.71.71A2 2 0 007.12 20h9.76a2 2 0 001.41-.58l.71-.71A10 10 0 0012 2z"/></svg>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.025em' }}>Tender Tracker Pro</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', margin: '0 0 1rem 0' }}>
            Role-Based Procurement Access
          </h1>
          <p style={{ fontSize: '1.05rem', opacity: '0.9', maxWidth: '400px', lineHeight: '1.6' }}>
            Sign in as a Contractor, Tender Officer, or Administrator to access secure portal controls.
          </p>
        </div>
        
        <div style={{ fontSize: '0.85rem', opacity: '0.8' }}>
          © 2026 Tender Tracker Inc. All rights reserved.
        </div>
      </div>

      {/* Right Form Panel */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '2rem',
        background: '#f8fafc',
        color: '#0f172a'
      }}>
        <div style={{ width: '100%', maxWidth: '420px', background: '#ffffff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
          
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: '#0f172a' }}>Portal Sign In</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Select your role and enter credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            
            {/* Role Selector Choice */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                Select Role / Access Level
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {['Contractor', 'Tender', 'Admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    style={{
                      padding: '0.5rem 0.2rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      border: role === r ? '2px solid #2563eb' : '1px solid #cbd5e1',
                      background: role === r ? '#eff6ff' : '#f8fafc',
                      color: role === r ? '#1d4ed8' : '#475569',
                      transition: 'all 0.2s'
                    }}
                  >
                    {r === 'Tender' ? 'Tender Mgr' : r}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: '#334155' }}>
                Email Address
              </label>
              <input 
                type="email" 
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'all 0.25s ease',
                }}
                onFocus={(e) => { 
                  e.target.style.borderColor = '#2563eb'; 
                  e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.15)'; 
                }}
                onBlur={(e) => { 
                  e.target.style.borderColor = '#cbd5e1'; 
                  e.target.style.boxShadow = 'none'; 
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: '#334155' }}>
                Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 2.5rem 0.7rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onFocus={(e) => { 
                    e.target.style.borderColor = '#2563eb'; 
                    e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.15)'; 
                  }}
                  onBlur={(e) => { 
                    e.target.style.borderColor = '#cbd5e1'; 
                    e.target.style.boxShadow = 'none'; 
                  }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.8rem', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                padding: '0.8rem',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                marginTop: '0.5rem'
              }}
            >
              {isLoading ? 'Authenticating...' : `Sign In as ${role}`}
            </button>

          </form>

          <div style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.85rem', color: '#64748b' }}>
            Don't have an account?{' '}
            <a href="/register" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
              Create account
            </a>
          </div>

        </div>
      </div>

    </div>
  )
}
