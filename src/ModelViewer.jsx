import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text, Billboard } from "@react-three/drei";
import { useState } from "react";


const Model = () => {
    const { scene } = useGLTF("/Cooler.glb");
    return <primitive object={scene} scale={3} position={[0, -1, 0]} />;
};

const GridFloor = () => {
    return <gridHelper args={[10, 10, "#999", "#444"]} position={[0, -1.01, 0]} />;
};

const UIOverlay = ({ percentage }) => {
    return (
        <>
            {/* Green Display Panel - Adjusted to match first container */}
            <mesh position={[3, 2, 0]} rotation={[0, 0, 0]}>  
                <planeGeometry args={[0.4, 0.3]} />  
                <meshStandardMaterial color="lime" />
            </mesh>

            {/* Percentage Display Box (Black background) */}
            <Billboard position={[-3, 2, 0]}>
                {/* Percentage Display Box (Black background) */}
                <mesh>
                    <planeGeometry args={[0.3, 0.2]} />
                    <meshStandardMaterial color="black" />
                </mesh>

                {/* Dynamic Percentage Text */}
                <Text
                    fontSize={0.15}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {percentage}%
                </Text>
            </Billboard>
        </>
    );
};

const ModelViewer = () => {
    const [percentage, setPercentage] = useState(0);

    return (
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
            <Canvas
                style={{
                    background: "linear-gradient(180deg, #c2c2c2, #e0e0e0)",
                    width: "100%",
                    height: "100vh"
                }}
                camera={{ position: [2, 3, 8], fov: 50 }}
                shadows
            >
                {/* Ambient Light */}
                <ambientLight intensity={1} />

                {/* Directional Light */}
                <directionalLight position={[5, 5, 5]} intensity={4} castShadow />

                {/* Spotlight for depth */}
                <spotLight position={[10, 10, 10]} angle={0.3} intensity={1.5} castShadow />

                {/* Grid Floor */}
                <GridFloor />

                {/* 3D Model */}
                <Model />

                {/* UI Overlays */}
                <UIOverlay percentage={percentage} />

                {/* Camera Controls */}
                <OrbitControls enableDamping={true} dampingFactor={0.1} />
            </Canvas>

           
        </div>
    );
};

export default ModelViewer;
