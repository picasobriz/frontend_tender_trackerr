import React, { useState } from 'react'
import BidRow from '../components/BidRow'
import Pager from '../components/Pager'

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState('All')
  const [darkMode, setDarkMode] = useState(false)
  const [activeBtn, setActiveBtn] = useState(null)
  const totalPages = 3

  const tenders = [
    { id: 1, title: 'Road Infrastructure Upgrade', category: 'Construction', budget: '$150,000', deadline: '2026-06-30', status: 'Active' },
    { id: 2, title: 'IT Cloud Migration Services', category: 'Technology', budget: '$85,000', deadline: '2026-07-15', status: 'Pending' },
    { id: 3, title: 'Hospital Medical Equipment Supply', category: 'Healthcare', budget: '$220,000', deadline: '2026-08-01', status: 'Active' },
  ]

  const filteredTenders = filter === 'All' 
    ? tenders 
    : tenders.filter(t => t.category === filter)

  const handleViewDetails = (id) => {
    alert(`Opening rich details panel for tender ID: ${id}`)
  }

  // Theme configuration styles
  const theme = {
    bg: darkMode ? '#0f172a' : '#f8fafc',
    cardBg: darkMode ? '#1e293b' : '#ffffff',
    textPrimary: darkMode ? '#f8fafc' : '#0f172a',
    textSecondary: darkMode ? '#94a3b8' : '#64748b',
    border: darkMode ? '#334155' : '#e2e8f0',
    tableHeaderBg: darkMode ? '#1e293b' : '#f8fafc',
  }

  return (
    <div style={{ padding: '2.5rem', fontFamily: 'Inter, system-ui, sans-serif', background: theme.bg, minHeight: '100vh', color: theme.textPrimary, transition: 'background 0.3s ease, color 0.3s ease' }}>
      
      {/* Top Navbar Toolbar with Theme Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Workspace / Procurement Portal
        </span>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: darkMode ? '#f1f5f9' : '#1e293b',
            color: darkMode ? '#0f172a' : '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.1s ease',
          }}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Unique Tender Tracker Hero Visual Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)', 
        borderRadius: '16px', 
        padding: '2.5rem', 
        color: '#fff', 
        marginBottom: '2rem', 
        boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.2)', display: 'inline-block', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.8rem', letterSpacing: '0.05em' }}>
            Tender Tracker Pro v2.6
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 0.5rem 0', lineHeight: '1.2' }}>
            Smart Bid Management & Intelligence Hub
          </h1>
          <p style={{ margin: 0, fontSize: '1rem', opacity: '0.9', lineHeight: '1.5' }}>
            Streamline your organizational pipeline, track compliance milestones, and win high-value contracts faster.
          </p>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '1.5rem', borderRadius: '12px', minWidth: '200px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', opacity: '0.8', fontWeight: '600' }}>Active Success Rate</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', margin: '0.3rem 0' }}>94.2%</div>
          <div style={{ fontSize: '0.75rem', color: '#93c5fd' }}>↑ 4.5% from last month</div>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
        <div style={{ background: theme.cardBg, padding: '1.2rem 1.5rem', borderRadius: '12px', border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.3s' }}>
          <span style={{ color: theme.textSecondary, fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase' }}>Total Tenders</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '700', marginTop: '0.4rem', color: theme.textPrimary }}>12</div>
        </div>
        <div style={{ background: theme.cardBg, padding: '1.2rem 1.5rem', borderRadius: '12px', border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.3s' }}>
          <span style={{ color: theme.textSecondary, fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase' }}>Active Bids</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '700', marginTop: '0.4rem', color: '#16a34a' }}>8</div>
        </div>
        <div style={{ background: theme.cardBg, padding: '1.2rem 1.5rem', borderRadius: '12px', border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.3s' }}>
          <span style={{ color: theme.textSecondary, fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase' }}>Pipeline Budget</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '700', marginTop: '0.4rem', color: '#2563eb' }}>$455,000</div>
        </div>
      </div>

      {/* Filter Toolbar with Interactive Motion Buttons */}
      <div style={{ background: theme.cardBg, padding: '1.2rem 1.5rem', borderRadius: '12px 12px 0 0', border: `1px solid ${theme.border}`, borderBottom: 'none', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', transition: 'all 0.3s' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: '600', color: theme.textSecondary }}>Filter by Category:</span>
        {['All', 'Construction', 'Technology', 'Healthcare'].map((cat) => {
          const isSelected = filter === cat
          const isClicked = activeBtn === cat
          return (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              onMouseDown={() => setActiveBtn(cat)}
              onMouseUp={() => setActiveBtn(null)}
              style={{
                background: isSelected ? '#2563eb' : (darkMode ? '#334155' : '#f1f5f9'),
                color: isSelected ? '#fff' : theme.textPrimary,
                border: 'none',
                padding: '0.45rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.85rem',
                transform: isClicked ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 0.1s ease, background 0.2s',
                boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none'
              }}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Table Container */}
      <div style={{ background: theme.cardBg, borderRadius: '0 0 12px 12px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', overflow: 'hidden', transition: 'all 0.3s' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: theme.tableHeaderBg, borderBottom: `1px solid ${theme.border}`, color: theme.textSecondary, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>Category</th>
              <th style={{ padding: '1rem' }}>Budget</th>
              <th style={{ padding: '1rem' }}>Deadline</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenders.length > 0 ? (
              filteredTenders.map((tender) => (
                <BidRow key={tender.id} tender={tender} onViewDetails={handleViewDetails} />
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: theme.textSecondary }}>
                  No tenders found for this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pager Section */}
        <div style={{ padding: '1rem 1.5rem', background: theme.cardBg, borderTop: `1px solid ${theme.border}` }}>
          <Pager 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={(newPage) => setCurrentPage(newPage)} 
          />
        </div>
      </div>

    </div>
  )
}
