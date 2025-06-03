import { useProgress, Html } from "@react-three/drei";
const Loader = () => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div style={{ color: 'white', fontSize: '1.2em' }}>Loading {progress.toFixed(0)}%</div>
        </Html>
    );
}
export default Loader;
