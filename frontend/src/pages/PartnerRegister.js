import React from 'react'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const PartnerRegister = () => {
  const navigate = useNavigate()
  const submitHandler = async (e)=>{
    e.preventDefault();
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    await axios.post('http://localhost:5000/foodpartner/register',{
      name,
      email,
      password
    },{
      withCredentials:true
    })
    navigate('/create-food')
  }
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Partner sign up</h2>
        <p className="auth-sub">Create an account to manage your food listings</p>

        <form className="auth-form" onSubmit={submitHandler}>
          <label className="auth-label">
            Business name
            <input className="auth-input" type="text" name='name' placeholder="My Tasty Kitchen" />
          </label>

          <label className="auth-label">
            Contact email
            <input className="auth-input" type="email" name='email' placeholder="owner@example.com" />
          </label>

          <label className="auth-label">
            Password
            <input className="auth-input" type="password" name='password' placeholder="Create a password" />
          </label>

          <button className="auth-btn" type="submit">Register</button>
        </form>

        <div className="auth-foot">Already registered? <Link to="/food-partner/login">Log in</Link></div>
        <div className="auth-foot">Also want a regular user account? <Link to="/user/register">Create user account</Link> or <Link to="/user/login">User sign in</Link></div>
      </div>
    </div>
  )
}

export default PartnerRegister
