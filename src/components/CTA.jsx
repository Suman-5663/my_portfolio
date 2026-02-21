import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className='cta flex flex-col items-center text-center gap-4'>
      
      <p className='cta-text'>
        Have a project in mind??
        <br className='sm:block hidden'/>
        Let's Build together!
      </p>

      <Link 
        to="/contact" 
        className='btn max-md:self-end'
      >
        Contact
      </Link>

    </section>
  )
}

export default CTA
