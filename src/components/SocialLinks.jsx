import React from 'react'
import { SocialIcon } from 'react-social-icons'
import '../styles/Home.css'

const SocialLinks = () => {
  return (
    <>
        <div className="social">
            <span>Find us on</span>
            <p><SocialIcon url="https://twitter.com/" /></p>
            <p><SocialIcon url="https://linkedin.com/in/" /></p>
            <p><SocialIcon url="https://instagram.com/in/" /></p>
        </div>
    </>
  )
}

export default SocialLinks
