import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Html } from '@react-three/drei';

// Generic Model Loader Component
function Model({ url }: { url: string }) {
  // useGLTF pulls the file from your public folder
  const { scene } = useGLTF(url); 
  return <primitive object={scene} />;
}

// Loader UI while model is downloading
function Loader() {
  return <Html center><span className="text-primary font-bold">Loading 3D Model...</span></Html>
}

interface SceneProps {
  modelUrl: string;
}

export const AnatomyScene: React.FC<SceneProps> = ({ modelUrl }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        <Suspense fallback={<Loader />}>
          {/* Stage adds default lighting and centers the model automatically */}
          <Stage environment="city" intensity={0.6}>
            <Model url={modelUrl} />
          </Stage>
        </Suspense>
        {/* Allows user to rotate/zoom */}
        <OrbitControls autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default AnatomyScene;