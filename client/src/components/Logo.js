import React from 'react'
import Logo1 from '../assets/logo.png'

const Logo = () => {
  return (
    <div className='logo-container'>
      <img src={Logo1} alt="logo"/>
      <div className='logo-text'>Order Taker</div>
    </div>
  )
}

export default Logo
