import React, { Suspense, useRef, useImperativeHandle, forwardRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Center } from '@react-three/drei';

export interface AnatomySceneRef {
  zoomIn: () => void;
  zoomOut: () => void;
  rotate: () => void;
  reset: () => void;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function Loader() {
  return <Html center><span className="text-primary font-bold">Loading Model...</span></Html>;
}

const SceneContent = forwardRef<AnatomySceneRef, { modelUrl: string }>(({ modelUrl }, ref) => {
  const controlsRef = useRef<any>(null);
  
  useImperativeHandle(ref, () => ({
    zoomIn: () => {
      // DollyIn moves camera CLOSER (Zoom In)
      // Increase the value (e.g. 1.2) for faster zoom, decrease (1.05) for smoother/slower
      controlsRef.current?.dollyIn(1.2); 
      controlsRef.current?.update();
    },
    zoomOut: () => {
      // DollyOut moves camera AWAY (Zoom Out)
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
    }
  }));

  return (
    <>
      <ambientLight intensity={0.5} /> 
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      <Center>
        <Model url={modelUrl} />
      </Center>

      <OrbitControls 
        ref={controlsRef} 
        makeDefault 
        enableDamping 
        dampingFactor={0.1}
        // LIMITS:
        minDistance={0.3} // Allows getting very close (Macro view)
        maxDistance={16}   // Allows zooming out far enough to see whole canvas
      />
    </>
  );
});

interface SceneProps {
  modelUrl: string;
}

export const AnatomyScene = forwardRef<AnatomySceneRef, SceneProps>(({ modelUrl }, ref) => {
  return (
    <div className="w-full h-full">
      {/* Camera Z position: 1.5 ensures the model fills the screen nicely on load */}
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], rotateOnWorldAxis: [0, 0, 40],fov: 10 }}>
        <Suspense fallback={<Loader />}>
          <SceneContent ref={ref} modelUrl={modelUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
});

export default AnatomyScene;