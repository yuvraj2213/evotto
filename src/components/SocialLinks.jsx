import React from 'react'
import { SocialIcon } from 'react-social-icons'
import '../styles/Home.css'

const SocialLinks = () => {
  return (
    <>
        <div className="social">
            <span>Find us on</span>
            <p><SocialIcon url="https://x.com/Evottoofficial" /></p>
            <p><SocialIcon url="https://www.linkedin.com/company/evotto-official" /></p>
            <p><SocialIcon url="https://www.instagram.com/evottoofficial?igsh=YXFrazNiZG40eXpl" /></p>
        </div>
    </>
  )
}

export default SocialLinks
