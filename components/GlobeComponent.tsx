import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlobeComponent = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mountRef.current) {
        // Scene
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x92A8CE, 500, 500); // Adjust the fog color and range

        // Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
        renderer.shadowMap.enabled = true;
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const globeGeometry = new THREE.SphereGeometry(100, 128, 128);
        const globeMaterial = new THREE.MeshStandardMaterial({
            color: 0x92A8CE,
        });

        const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
        globeMesh.receiveShadow = true; 
        scene.add(globeMesh);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const l1 = new THREE.SpotLight(0xffffff, 200, 300, Math.PI / 4.5, 0, 0.9);
        l1.position.set(0,150,75);
        l1.castShadow = true; 
        scene.add(l1); 

        const l2 = new THREE.SpotLight(0xffffff, 500, 300, Math.PI / 4.5, 1, 0.95);
        l2.position.set(-200,50,150);
        l2.castShadow = true; 
        scene.add(l2); 

        const helper = new THREE.SpotLightHelper(l2, 5);
        //scene.add(helper);

        camera.position.z = 150;
        camera.position.y = -12;

        window.addEventListener('resize', () => {

            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });

        // Animation
            const animate = () => {
            requestAnimationFrame(animate);
            globeMesh.rotation.y += 0.002;
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            renderer.dispose();
            if (mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
            }
        };
    }
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh', overflow: 'hidden' }} />;
};

export default GlobeComponent;
