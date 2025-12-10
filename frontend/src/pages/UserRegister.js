import React from 'react'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const UserRegister = () => {
  const navigate = useNavigate()

  const submitHandler= async(e)=>{
    e.preventDefault()
    
    const fullname = e.target.fullname.value
    const email = e.target.email.value
    const password = e.target.password.value
    
    const response = await axios.post('http://localhost:5000/user/register',{
      fullname,
      email,
      password
    },{
      withCredentials:true
    })

    // console.log(response.data)

    navigate('/')
    
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create account</h2>
        <p className="auth-sub">Sign up to order your favorite meals</p>

        <form className="auth-form" onSubmit={submitHandler}>
          <label className="auth-label">
            Full name
            <input className="auth-input" name='fullname' type="text" placeholder="Jane Doe" />
          </label>

          <label className="auth-label">
            Email
            <input className="auth-input" type="email" name='email' placeholder="you@example.com" />
          </label>

          <label className="auth-label">
            Password
            <input className="auth-input" type="password" name='password'placeholder="Create a password" />
          </label>

          {/* Confirm Password removed per request */}

          <button className="auth-btn" type="submit">Create account</button>
        </form>

        <div className="auth-foot">Already have an account? <Link to="/user/login">Log in</Link></div>
        <div className="auth-foot">Want to register as a food partner? <Link to="/food-partner/register">Partner sign up</Link> or <Link to="/food-partner/login">Partner sign in</Link></div>
      </div>
    </div>
  )
}

export default UserRegister
