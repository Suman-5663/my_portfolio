import React from 'react'
import { Link } from 'react-router-dom'
import { arrow } from '../assets/icons'

const InfoBox = ({ text, link, btnText }) => (
  <div className='info-box'>
    <p className='font-medium sm:text-lg text-center mb-4'>{text}</p>
    <Link to={link} className='neo-brutalism-white neo-btn flex items-center justify-center gap-2'>
      {btnText}
      <img src={arrow} className='w-4 h-4 object-contain' />
    </Link>
  </div>
)

const renderContent = {
  1: (
    <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
      Hi, I’m <span className='font-semibold'>Suman</span> 👋
      <br />
      Just putting pieces together, quietly.
    </h1>
  ),
  2: (
    <InfoBox
      text=" Just a developer making things. "
      link="/about"
      btnText="Learn more"
    />
  ),
  3: (
    <InfoBox
      text="These are some projects I’ve worked on. Nothing flashy, just things I wanted to try."
      link="/projects"
      btnText="Projects"
    />
  ),
  4: (
    <InfoBox
      text="If you want to reach out… I might not respond immediately, but I will. Just leave a message."
      link="/contact"
      btnText="Let’s talk…"
    />
  ),
}

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null
}

export default HomeInfo
