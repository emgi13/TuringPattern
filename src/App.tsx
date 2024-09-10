import "./App.css";
import TuringPattern from "./assets/TuringPattern";
import {
  ActivInhibParams,
  ActivInhibRunner,
  AnimalParams,
  AnimalRunner,
} from "./assets/TuringPattern/runner";

function App() {
  return (
    <>
      <div id="main">
        <TuringPattern
          runner={new ActivInhibRunner({ vars: ActivInhibParams.spots })}
          invert
          frameRate={30}
          skipFrames={10}
        />
        <TuringPattern
          runner={new ActivInhibRunner({ vars: ActivInhibParams.stripes })}
          invert
          blurRadius={2}
        />
        <TuringPattern
          runner={new AnimalRunner({ vars: AnimalParams.giraffe })}
          invert
          blurRadius={2}
        />
        <TuringPattern
          runner={new AnimalRunner({ vars: AnimalParams.giraffe })}
          invert
          blurRadius={2}
        />
        <TuringPattern
          runner={new AnimalRunner({ vars: AnimalParams.giraffe })}
          invert
          blurRadius={2}
        />
      </div>
    </>
  );
}

export default App;
