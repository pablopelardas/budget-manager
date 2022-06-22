import React from 'react'
import './NavBar.scss'
import Logout from '../../components/Logout/Logout'
import logo from '../../assets/Budget Manager.png'
import { HashLink } from 'react-router-hash-link'

const NavBar = () => {
  return (
    <nav className='navbar--nav'>
      <ul className='navbar--list'>
        <img className='navbar--logo' src={logo} alt='logo' />
        <div className='navbar--buttons'>
          <li className='navbar--item'><HashLink smooth to='/#recent'>Last Moves</HashLink></li>
          <li className='navbar--item'><HashLink smooth to='/#history'>Manager</HashLink></li>
        </div>
        <Logout />
      </ul>
    </nav>
  )
}

export default NavBar
