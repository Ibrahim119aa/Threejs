

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF} from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    MaterialFBXASC032FBXASC0352142146907: THREE.Mesh
    MaterialFBXASC032FBXASC03511186: THREE.Mesh
    MaterialFBXASC032FBXASC0352142146802: THREE.Mesh
  }
  materials: {
    MaterialFBXASC032FBXASC0352142146907: THREE.MeshStandardMaterial
    MaterialFBXASC032FBXASC03511186: THREE.MeshStandardMaterial
    MaterialFBXASC032FBXASC0352142146802: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/Model/Computer/Computer.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-39.769, 2.09, -28.414]} rotation={[-1.682, -0.056, 0.342]} scale={[-0.245, 0.1, 0.139]}>
            <mesh geometry={nodes.MaterialFBXASC032FBXASC0352142146907.geometry} material={materials.MaterialFBXASC032FBXASC0352142146907} />
            <mesh geometry={nodes.MaterialFBXASC032FBXASC03511186.geometry} material={materials.MaterialFBXASC032FBXASC03511186} />
            <mesh geometry={nodes.MaterialFBXASC032FBXASC0352142146802.geometry} material={materials.MaterialFBXASC032FBXASC0352142146802} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Model/Computer/Computer.gltf')
