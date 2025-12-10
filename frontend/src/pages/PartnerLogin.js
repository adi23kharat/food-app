import React from 'react'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const PartnerLogin = () => {
  const navigate = useNavigate()
  const submitHandler = async (e)=>{
    e.preventDefault();
    const email = e.target.email.value
    const password = e.target.password.value
    const response = await axios.post('http://localhost:5000/foodpartner/login',{
      email,
      password
    },{
      withCredentials:true
    })
    // console.log(response.data)
    navigate('/create-food')
  }
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Partner sign in</h2>
        <p className="auth-sub">Access your partner dashboard</p>

        <form className="auth-form" onSubmit={submitHandler}>
          <label className="auth-label">
            Email
            <input className="auth-input" type="email" name='email' placeholder="owner@example.com" />
          </label>

          <label className="auth-label">
            Password
            <input className="auth-input" type="password" name='password' placeholder="Your password" />
          </label>

          <button className="auth-btn" type="submit">Sign in</button>
        </form>

        <div className="auth-foot">Not a partner yet? <Link to="/food-partner/register">Create an account</Link></div>
        <div className="auth-foot">Also want a user account? <Link to="/user/register">Create user account</Link> or <Link to="/user/login">User sign in</Link></div>
      </div>
    </div>
  )
}

export default PartnerLogin
