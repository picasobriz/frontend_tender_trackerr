import React, { useState } from 'react'
import BidRow from '../components/BidRow'
import Pager from '../components/Pager'

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3

  // Sample tender list data
  const tenders = [
    { id: 1, title: 'Road Infrastructure Upgrade', category: 'Construction', budget: '150,000', deadline: '2026-06-30' },
    { id: 2, title: 'IT Cloud Migration Services', category: 'Technology', budget: '85,000', deadline: '2026-07-15' },
    { id: 3, title: 'Hospital Medical Equipment Supply', category: 'Healthcare', budget: '220,000', deadline: '2026-08-01' },
  ]

  const handleViewDetails = (id) => {
    alert(`Viewing details for tender ID: ${id}`)
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Tender Dashboard</h2>
      <p style={{ color: '#666' }}>Browse and manage active procurement tenders.</p>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left', color: '#333' }}>
            <th style={{ padding: '0.75rem' }}>Title</th>
            <th style={{ padding: '0.75rem' }}>Category</th>
            <th style={{ padding: '0.75rem' }}>Budget</th>
            <th style={{ padding: '0.75rem' }}>Deadline</th>
            <th style={{ padding: '0.75rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => (
            <BidRow key={tender.id} tender={tender} onViewDetails={handleViewDetails} />
          ))}
        </tbody>
      </table>

      <Pager 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={(newPage) => setCurrentPage(newPage)} 
      />
    </div>
  )
}
