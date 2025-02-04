import ButtonGroup from "../components/ButtonGroup.jsx";
import FastWriting from "../components/journal/FastWriting.jsx";

export default function HomePage() {

    return (
        <div className = {"items-center justify-center min-h-screen bg-gray-100 p-6"}>
            <FastWriting/>
            <ButtonGroup/>
        </div>
    );
}