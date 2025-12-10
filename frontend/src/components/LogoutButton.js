import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LogoutButton = ({ redirectTo = '/user/login' }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/user/logout', { withCredentials: true })
    } catch (err) {
      // ignore errors - still navigate back to login
    }
    navigate(redirectTo)
  }

  return (
    <button type="button" className="nav-item logout-btn" onClick={handleLogout}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>logout</span>
    </button>
  )
}

export default LogoutButton
