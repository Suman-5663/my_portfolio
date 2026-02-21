import React from 'react'
import projects from '../constants/projects'
import CTA from '../components/CTA'
import { Link } from 'react-router-dom'
import arrow from '../assets/icons/arrow.svg'
import Footer from '../components/Footer'

const Projects = () => {
  return (
    <section className='max-container'>

      <h1 className='head-text'>
        My{' '}
        <span className='blue-gradient_text font-semibold drop-shadow'>
          Projects
        </span>
      </h1>

      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
       <p>
  I build <span className="font-semibold text-black">scalable</span>,
  <span className="font-semibold text-black"> performant</span>, and
  <span className="font-semibold text-black"> user-focused</span> web applications
  using React, Node.js, MongoDB, and cloud technologies.
  Each project reflects creativity, clean architecture, and real-world impact.
</p>
      </div>

      <div className='flex flex-wrap my-20 gap-16'>
        {projects.map((project) => (
          <div className='lg:w-[400] w-full' key={project.name}>
            <div className='block-container w-12 h-12'>
              <div className={`btn-back rounded-xl ${project.theme}`}/>
              <div className='btn-front rounded-xl flex justify-center iteams-center'>
                <img src={project.iconUrl} alt='Project Icon' className='w-1/2 h-1/2 object-contain'/>
              </div>
            </div>
            <div className='mt-5 flex flex-col '>
              <h4 className='text-2xl font-poppins font-semibold'>
                {project.name}
              </h4>
              <p className='mt-2 text-slate-500'>
                {project.description}
              </p>
              <div className='mt-5 flex items-center gap-2 font-poppins'>
                <Link to={project.link} target='_blank' rel='noopener noreferrer' className='font-semibold text-blue-500'>
                    Live Link
                </Link>
                <img src={arrow}
                  alt='arrow'
                  className='w-4 h-4 object-contain'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className='border-slate-200'/>
      <CTA/>
      <Footer />
      </section>
  )
}

export default Projects
