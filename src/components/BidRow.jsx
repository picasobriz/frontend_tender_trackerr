import React from 'react'

export default function BidRow({ tender, onViewDetails }) {
  return (
    <tr style={{ borderBottom: '1px solid #eee' }}>
      <td style={{ padding: '0.75rem' }}>{tender.title}</td>
      <td style={{ padding: '0.75rem' }}>{tender.category}</td>
      <td style={{ padding: '0.75rem' }}>${tender.budget}</td>
      <td style={{ padding: '0.75rem' }}>{tender.deadline}</td>
      <td style={{ padding: '0.75rem' }}>
        <button 
          onClick={() => onViewDetails(tender.id)}
          style={{ padding: '0.4rem 0.8rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          View
        </button>
      </td>
    </tr>
  )
}
