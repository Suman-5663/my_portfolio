import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import Homeinfo from '../components/Homeinfo'
import sakura from '../assets/sakura.mp3'
import soundoff from '../assets/icons/soundoff.png'
import soundon from '../assets/icons/soundon.png'

const Home = () => {
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const audioRef = useRef(null)

  // ✅ Create audio only once when Home mounts
  useEffect(() => {
    const audio = new Audio(sakura)
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    // ✅ Cleanup when leaving Home page
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  // ✅ Play / Pause control
  useEffect(() => {
    if (!audioRef.current) return

    if (isAudioPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isAudioPlaying])

  const adjustIslandForScreenSize = () => {
    let screenScale = [6, 6, 6]
    let screenPosition = [0, -7, -43]
    let rotation = [0.1, 4.7, 0]

    return [screenScale, screenPosition, rotation]
  }

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition

    if (window.innerWidth < 768) {
      screenScale = [3, 3, 3]
      screenPosition = [-2, 1, -6]
    } else {
      screenScale = [3, 3, 3]
      screenPosition = [-2, 1, -6]
    }

    return [screenScale, screenPosition]
  }

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize()

  const [planeScale, planePosition] =
    adjustPlaneForScreenSize()

  return (
    <section className="w-full h-screen relative">
      
      {/* Stage Info */}
      <div className="absolute bottom-12 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <Homeinfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen ${
          isRotating ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <color attach="background" args={['#87CEEB']} />

        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[1, 5, 5]} intensity={3} />
          <hemisphereLight
            skyColor="#ffffff"
            groundColor="#444444"
            intensity={1}
          />
          <pointLight position={[-5, 5, 5]} intensity={1} />

          <Bird />
          <Sky isRotating={isRotating} />

          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />

          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>

      {/* Audio Button */}
      <div className="absolute bottom-2 left-2">
        <img
          src={!isAudioPlaying ? soundoff : soundon}
          alt="sound"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={() => setIsAudioPlaying(!isAudioPlaying)}
        />
      </div>
    </section>
  )
}

export default Home
