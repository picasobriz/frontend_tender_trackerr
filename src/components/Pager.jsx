import React from 'react'

export default function Pager({ currentPage, totalPages, onPageChange }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage <= 1}
        style={{ padding: '0.5rem 1rem', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer' }}
      >
        Previous
      </button>
      
      <span>Page {currentPage} of {totalPages}</span>
      
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage >= totalPages}
        style={{ padding: '0.5rem 1rem', cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer' }}
      >
        Next
      </button>
    </div>
  )
}
