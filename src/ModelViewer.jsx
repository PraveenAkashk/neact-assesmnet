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

const UIOverlay = ({ percentage, handleClick }) => {
    return (
        <>

            <mesh position={[3, 2, 0]} rotation={[0, 0, 0]} onClick={handleClick}
                onPointerOver={(e) => (e.stopPropagation(), document.body.style.cursor = "pointer")}
                onPointerOut={(e) => (e.stopPropagation(), document.body.style.cursor = "default")}>
                <planeGeometry args={[0.4, 0.3]} />
                <meshStandardMaterial color="lime" />
            </mesh>

            <Billboard position={[-3, 2, 0]}>
                <mesh>
                    <planeGeometry args={[0.5, 0.2]} />
                    <meshStandardMaterial color="black" />
                </mesh>


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

    const handleIncrease = () => {
        setPercentage((prev) => Math.min(prev + 10, 100));
    };

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
                <ambientLight intensity={1} />

                <directionalLight position={[5, 5, 5]} intensity={4} castShadow />

                <spotLight position={[10, 10, 10]} angle={0.3} intensity={1.5} castShadow />

                <GridFloor />

                <Model />

                <UIOverlay percentage={percentage} handleClick={handleIncrease} />

                <OrbitControls enableDamping={true} dampingFactor={0.1} />
            </Canvas>


        </div>
    );
};

export default ModelViewer;
