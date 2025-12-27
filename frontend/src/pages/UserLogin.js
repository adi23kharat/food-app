import React from 'react'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const UserLogin = () => {
  const navigate = useNavigate()

  const submitHandler = async(e)=>{
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    await axios.post('http://localhost:5000/user/login',{
      email,
      password
    },{
      withCredentials:true
    })

    navigate('/home')
  }
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Sign in to continue ordering</p>

        <form className="auth-form" onSubmit={submitHandler}>
          <label className="auth-label">
            Email
            <input className="auth-input" type="email" name='email' placeholder="you@example.com" />
          </label>

          <label className="auth-label">
            Password
            <input className="auth-input" type="password" name='password' placeholder="Your password" />
          </label>

          <label className="auth-row">
            <input type="checkbox" /> <span className="auth-remember">Remember me</span>
          </label>

          <button className="auth-btn" type="submit" >Sign in</button>
        </form>

        <div className="auth-foot">New here? <Link to="/user/register">Create an account</Link></div>
        <div className="auth-foot">Are you a food partner? <Link to="/food-partner/register">Partner sign up</Link> or <Link to="/food-partner/login">Partner sign in</Link></div>
      </div>
    </div>
  )
}

export default UserLogin
