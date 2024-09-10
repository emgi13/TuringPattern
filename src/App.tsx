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
        />
        <TuringPattern
          runner={new ActivInhibRunner({ vars: ActivInhibParams.stripes })}
        />
      </div>
    </>
  );
}

export default App;
