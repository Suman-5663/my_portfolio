import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import skyScene from '../assets/3d/sky.glb'

const Sky = ({ isRotating }) => {
  const { scene } = useGLTF(skyScene)
  const skyRef = useRef()

  useFrame((_, delta) => {
    if (!skyRef.current) return

    if (isRotating) {
      skyRef.current.rotation.y += 0.3 * delta
    }
  })

  return <primitive ref={skyRef} object={scene} />
}

export default Sky
