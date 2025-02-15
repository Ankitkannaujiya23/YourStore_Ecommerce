import React from 'react'
 import Navbar from '../navbar/Navbar';
 import HomePage from '../../mainPages/homepage/HomePage';
import Footer from '../footer/Footer';
const Layout = () => {
  return (
    <div>
        <Navbar />
        <HomePage/>
        <Footer/>
    </div>
  )
}

export default Layout