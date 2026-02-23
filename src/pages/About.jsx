import React from 'react'
import { skills } from '../constants'
import 'react-vertical-timeline-component/style.min.css'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const About = () => {
  return (
    <section className='max-container'>

      {/* Heading */}
      <h1 className='head-text'>
        Hello, I'm{' '}
        <span className='blue-gradient_text font-semibold drop-shadow'>
          Suman
        </span>
      </h1>

      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
         Full Stack Developer with hands-on experience in React.js, Node.js, MongoDB, and AWS cloud environments.
Experienced in building and deploying scalable web applications, designing REST APIs, and implementing
CI/CD pipelines. Strong foundation in Data Structures and Algorithms with practical backend development
exposure.
        </p>
      </div>

      
      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>

        <div className='mt-16 flex flex-wrap justify-center gap-10'>
          {skills.map((skill) => (
            <div
              key={skill.name}
              className='block-container w-20 h-20'
            >
              <div className='btn-back rounded-xl' />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Experience */}
      <div className='py-16'>
        <h3 className='subhead-text'>Professional Experience</h3>

        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>
            As a recent graduate, I am focused on building practical experience
            through hands-on projects, continuous learning, and solving
            real-world problems using modern technologies.
          </p>
        </div>
      </div>
      <hr className='border-slate-200'/>
      <CTA/>
      <Footer/>
    </section>
  )
}

export default About
