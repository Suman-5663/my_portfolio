import React, { useRef, useEffect } from 'react'
import birdScene from '../assets/3d/bird.glb'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Bird = () => {
  const birdRef = useRef()
  const { scene, animations } = useGLTF(birdScene)
  const { actions } = useAnimations(animations, birdRef)

  useEffect(() => {
    actions?.['Take 001']?.play()
  }, [actions])

  useFrame((state) => {
    if (!birdRef.current) return

    const time = state.clock.elapsedTime

    // island center
    const centerX = 0
    const centerZ = -43

    // orbit radius & speed
    const radius = 30
    const speed = 0.5

    birdRef.current.position.x = centerX + Math.cos(time * speed) * radius
    birdRef.current.position.z = centerZ + Math.sin(time * speed) * radius
    birdRef.current.position.y = Math.sin(time * 2) * 0.3 + 2

    // face movement direction
    birdRef.current.rotation.y = -time * speed - Math.PI / 2
  })

  return (
    <primitive
      ref={birdRef}
      object={scene}
      scale={[0.01, 0.01, 0.01]} // ✅ increased scale for visibility
      position={[0, 10, -43]}    // ✅ initial position near island
    />
  )
}

export default Bird
