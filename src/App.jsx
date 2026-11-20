import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './components/Login'

// Protected Route Guard Component (Strictly blocks dashboard access without login)
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

// Landing Page Component
function LandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('userRole')
    if (token) {
      setIsAuthenticated(true)
      setUserRole(role || 'User')
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', background: '#0f172a', color: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      {/* Navbar with Clear Sign In and Register Options */}
      <header style={{ padding: '1rem 3rem', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800' }}>T</div>
          <div>
            <span style={{ fontSize: '1.15rem', fontWeight: '800', display: 'block', lineHeight: '1.1' }}>Tender Tracker</span>
            <span style={{ fontSize: '0.65rem', color: '#60a5fa', fontWeight: '700', textTransform: 'uppercase' }}>Enterprise Edition</span>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>Home</Link>
          <Link to="/dashboard" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>Dashboard (Protected)</Link>
          
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#93c5fd' }}>Role: <b>{userRole}</b></span>
              <button 
                onClick={handleSignOut}
                style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Link to="/login" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600', padding: '0.5rem 1rem', background: '#1e293b', borderRadius: '6px', border: '1px solid #334155' }}>Sign In</Link>
              <Link to="/register" style={{ background: '#2563eb', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>Register</Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', flex: 1, textAlign: 'center' }}>
        <div style={{ background: 'rgba(37, 99, 235, 0.15)', color: '#60a5fa', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'inline-block', border: '1px solid rgba(37, 99, 235, 0.3)' }}>
          🔒 Authentication Required for Portal Access
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: '1.15', margin: '0 0 1.2rem 0', color: '#fff' }}>
          Secure Enterprise Tender & Bid Management
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: '1.6', margin: '0 0 2rem 0', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
          You must <b>Sign In</b> or <b>Register</b> with your assigned role (Contractor, Tender Manager, or Admin) before accessing the live database dashboard.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/login" style={{ background: '#2563eb', color: '#fff', padding: '0.8rem 1.75rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
            Sign In Now
          </Link>
          <Link to="/register" style={{ background: '#1e293b', color: '#fff', padding: '0.8rem 1.75rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem', border: '1px solid #334155' }}>
            Create Account (Register)
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid #1e293b', color: '#64748b', fontSize: '0.85rem' }}>
        © 2026 Tender Tracker Inc. Secure Role-Based Gateway.
      </footer>

    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Strictly Protected Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
