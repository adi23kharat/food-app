import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import PartnerRegister from '../pages/PartnerRegister'
import PartnerLogin from '../pages/PartnerLogin'
import Home from '../pages/general/Home'
import Saved from '../pages/general/Saved'
import CreateFood from '../pages/foodpartner/CreateFood'
import Profile from '../pages/foodpartner/Profile'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<PartnerRegister />} />
        <Route path="/food-partner/login" element={<PartnerLogin />} />
        <Route path='/' element={<Home />}/>
        <Route path='/saved' element={<Saved />}/>
        <Route path='/create-food' element= {<CreateFood/>}/>
        <Route path='/food-partner/:id' element= {<Profile />}/>
      </Routes>
    </Router>
  )         
}

export default AppRoutes