import React, { useEffect, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import planeScene from '../assets/3d/plane.glb'

const Plane = ({ isRotating, ...props }) => {
  const ref = useRef()
  const { scene, animations } = useGLTF(planeScene)
  const { actions } = useAnimations(animations, ref)

  useEffect(() => {
    if (!actions || !actions['Take 001']) return

    if (isRotating) {
      actions['Take 001'].reset().play()
    } else {
      actions['Take 001'].stop()
    }
  }, [actions, isRotating])

  return (
    <primitive
      ref={ref}
      object={scene}
      {...props}
    />
  )
}

export default Plane
