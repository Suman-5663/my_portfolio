
import React, { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Fox from '../models/Fox'
import Footer from '../components/Footer'

const Contact = () => {
  const formRef = useRef(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState('idle')

  // ✅ Status popup state
  const [status, setStatus] = useState({
    show: false,
    message: '',
    type: '', // success | error
  })

  const typingTimeout = useRef(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

    // fox walks while typing
    setCurrentAnimation('walk')

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current)
    }

    typingTimeout.current = setTimeout(() => {
      setCurrentAnimation('idle')
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setCurrentAnimation('hit')

    const serviceID = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID
    const templateID = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY

    emailjs
      .send(
        serviceID,
        templateID,
        {
          form_name: form.name,
          to_name: 'Suman',
          from_email: form.email,
          to_email: 'sumandash5663@gmail.com',
          message: form.message,
        },
        publicKey
      )
      .then(() => {
        setIsLoading(false)
        setCurrentAnimation('idle')

        setStatus({
          show: true,
          message: 'Message sent successfully!',
          type: 'success',
        })

        setForm({ name: '', email: '', message: '' })

        setTimeout(() => {
          setStatus({ show: false, message: '', type: '' })
        }, 3000)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
        setCurrentAnimation('idle')

        setStatus({
          show: true,
          message: 'Failed to send message!',
          type: 'error',
        })

        setTimeout(() => {
          setStatus({ show: false, message: '', type: '' })
        }, 3000)
      })
  }

  return (
    <section className="relative flex lg:flex-row flex-col w-full min-h-screen max-container items-center justify-center gap-10 h-[100vh]">

      {/* LEFT SIDE */}
      <div className="flex-1 w-full min-w-[50%] flex flex-col justify-center">
        <h1 className="head-text mb-10">Get in Touch</h1>

        {/* ✅ Popup Message */}
        {status.show && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg text-white font-medium transition-all duration-300
            ${status.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {status.message}
          </div>
        )}

        <form
          ref={formRef}
          className="w-full flex flex-col gap-7"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="John"
            required
            value={form.name}
            onChange={handleChange}
            className="input"
          />

          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            required
            value={form.email}
            onChange={handleChange}
            className="input"
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Let me know how I can help you!"
            required
            value={form.message}
            onChange={handleChange}
            className="input"
          />

          <button
            type="submit"
            className="btn"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {/* RIGHT SIDE - FOX */}
      <div className="flex-1 w-full h-[350px] md:h-[500px] lg:h-[650px]">
        <Canvas
          camera={{
            position: [0, 0, 3],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />

          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.3, 0.3, 0.3]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact;
