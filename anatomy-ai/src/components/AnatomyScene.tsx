import React, { Suspense, useRef, useImperativeHandle, forwardRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Center } from '@react-three/drei';
import * as THREE from 'three'; // Import THREE for MouseButton constants

export interface AnatomySceneRef {
  zoomIn: () => void;
  zoomOut: () => void;
  rotate: () => void;
  reset: () => void;
  togglePanMode: () => void; // New function to toggle interaction mode
}

function Model({ url, scale = 1 }: { url: string; scale?: number | [number, number, number] }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} />;
}

function Loader() {
  return <Html center><span className="text-primary font-bold">Loading Model...</span></Html>;
}

interface SceneContentProps {
  modelUrl: string;
  scale?: number | [number, number, number];
  panMode: boolean; // Prop to control mode
}

const SceneContent = forwardRef<AnatomySceneRef, SceneContentProps>(({ modelUrl, scale, panMode }, ref) => {
  const controlsRef = useRef<any>(null);
  
  useImperativeHandle(ref, () => ({
    zoomIn: () => {
      controlsRef.current?.dollyIn(1.2); 
      controlsRef.current?.update();
    },
    zoomOut: () => {
      controlsRef.current?.dollyOut(1.2);
      controlsRef.current?.update();
    },
    rotate: () => {
      const currentAngle = controlsRef.current?.getAzimuthalAngle();
      controlsRef.current?.setAzimuthalAngle(currentAngle + Math.PI / 4);
      controlsRef.current?.update();
    },
    reset: () => {
      controlsRef.current?.reset();
    },
    togglePanMode: () => {
       // handled by prop update in parent
    }
  }));

  return (
    <>
      <ambientLight intensity={0.5} /> 
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      <Center>
        <Model url={modelUrl} scale={scale} />
      </Center>

      <OrbitControls 
        ref={controlsRef} 
        makeDefault 
        enableDamping 
        dampingFactor={0.1}
        minDistance={0.3}
        maxDistance={8}
        enablePan={true} // Ensure panning is enabled
        
        // IF panMode is TRUE: Left click pans. 
        // IF panMode is FALSE: Left click rotates (Standard behavior).
        mouseButtons={{
            LEFT: panMode ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: panMode ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN
        }}
        // On Touch: 1 finger move
        touches={{
            ONE: panMode ? THREE.TOUCH.PAN : THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
        }}
      />
    </>
  );
});

interface AnatomySceneProps {
  modelUrl: string;
  scale?: number | [number, number, number];
  panMode?: boolean; // Receive panMode from Dashboard
}

export const AnatomyScene = forwardRef<AnatomySceneRef, AnatomySceneProps>(({ modelUrl, scale, panMode = false }, ref) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 1.5], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          <SceneContent ref={ref} modelUrl={modelUrl} scale={scale} panMode={panMode} />
        </Suspense>
      </Canvas>
    </div>
  );
});