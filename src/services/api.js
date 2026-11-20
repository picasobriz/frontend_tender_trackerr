const API_BASE_URL = 'http://localhost:5000/api' // Update to match your backend port

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to log in')
  }
  return response.json()
}

export async function fetchTenders(token, page = 1, category = 'All') {
  const response = await fetch(`${API_BASE_URL}/tenders?page=${page}&category=${category}`, {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
  })
  if (!response.ok) throw new Error('Failed to fetch tenders from database')
  return response.json()
}
