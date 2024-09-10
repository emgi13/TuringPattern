import "./App.css";
import TuringPattern from "./assets/TuringPattern";
import { AnimalRunner } from "./assets/TuringPattern/runner";

function App() {
  return (
    <>
      <div id="main">
        <TuringPattern invert blurRadius={2} frameRate={12} skipFrames={5} />
      </div>
    </>
  );
}

export default App;
