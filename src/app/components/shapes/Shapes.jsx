"use client"

import * as THREE from 'three';
import {Canvas} from '@react-three/fiber';
import { ContactShadows, Float, Environment } from '@react-three/drei';
import { Suspense, use, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { func } from 'three/examples/jsm/nodes/Nodes.js';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from "../../firebase";

export default function Shapes() {
    return(
        <>
            <Canvas className='z-0' shadows gl={{antialias:false}} dpr={[1, 1.5]} camera={{position:[0,0,25], fov:30, near:1, far:40}}>
                <Suspense fallback={null}>
                    <Geometries/>
                    <ContactShadows position={[0,-3.5,0]} opacity={0.65} scale={40} blur={1} far={9}/>
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </>
    );
}

function Geometries() {


    const geometries=[
        {
            position:[0,0,0],
            r: 0.4,
            geometry: new THREE.IcosahedronGeometry(3) // center
        },
        {
            position:[2,-0.75,1],
            r: 0.6,
            geometry: new THREE.TorusKnotGeometry( 1, 0.14, 64, 8,2,3 ) 
        },
        {
            position:[-2,-0.75,1],
            r: 0.5,
            geometry: new THREE.CapsuleGeometry(1,2,2,16) 
        },
    ];

    const materials =[
        new THREE.MeshNormalMaterial(),
        new THREE.MeshStandardMaterial({color: 0x2a9d8f, roughness: 0.1}),
        new THREE.MeshStandardMaterial({color: 0xe9c46a, roughness: 0.3}),
        new THREE.MeshStandardMaterial({color: 0xe76f51, roughness: 0.2, metalness: 0.5}),
        new THREE.MeshStandardMaterial({color: 0xffb703, roughness: 0.4}),
        new THREE.MeshStandardMaterial({color: 0x4f772d, roughness: 0.1}),
        new THREE.MeshStandardMaterial({color: 0xd00000, roughness: 0.3, metalness: 0.5}),
        new THREE.MeshStandardMaterial({color: 0x00a6fb, roughness: 0.3}),
        new THREE.MeshStandardMaterial({color: 0xf6aa1c, roughness: 0.2, metalness: 0.5}),
        new THREE.MeshStandardMaterial({color: 0x564d4a, roughness: 0.1}),
    ]

    return geometries.map(({position, r, geometry})=>(
        <Geometry 
        key={JSON.stringify(position)}
        position={position.map((p)=>p*2)}
        geometry={geometry}
        materials={materials}
        r={r}/>
    ))
}

function Geometry({position, r, geometry, materials}) {
    const meshRef = useRef();
    const [ visible, setVisible ] = useState(true);

    const startingMatrial = getRandomMaterial();

    function getRandomMaterial() {
        return gsap.utils.random(materials);
    }

    function handleClick(e){
        const mesh = e.object;
        gsap.to(mesh.rotation,{
            x: `+=${gsap.utils.random(0,2)}`,
            y: `+=${gsap.utils.random(0,2)}`,
            z: `+=${gsap.utils.random(0,2)}`,
            duration: 1.3,
            ease: 'elastic.out(1,0.3)',
        })
        mesh.material = getRandomMaterial();
    }

    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";
    }

    const handlePointerOut = () => {
        document.body.style.cursor = "default";
    }

    useEffect(()=>{
        let ctx = gsap.context(()=>{
            setVisible(true);
            gsap.from(meshRef.current.scale,{
                x: 0,
                y: 0,
                z: 0,
                duration: 1.3,
                ease:   'elastic.out(1,0.3)',
                delay: 0.3,
            })
        })

        return () => ctx.revert();
    },[])

    return(
        <>
        <group position={position} ref={meshRef}>
            <Float speed={5*r} rotationIntensity={6*r} floatIntensity={5*r}>
                <mesh 
                geometry={geometry}
                onClick={handleClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                visible={visible}
                material={startingMatrial}
                />
            </Float>
        </group>
        </>
    )

}