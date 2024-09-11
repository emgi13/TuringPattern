import "./App.css";
import TuringPattern from "./assets/TuringPattern";
import {
  ActivInhibParams,
  ActivInhibRunner,
  AnimalParams,
  AnimalRunner,
  DragonflyRunner,
} from "./assets/TuringPattern/runner";

function App() {
  return (
    <>
      <div id="main">
        <TuringPattern
          makeRunner={() =>
            new ActivInhibRunner({
              vars: ActivInhibParams.spots,
              size: { width: 40, height: 50 },
            })
          }
          invert
          frameRate={30}
          skipFrames={10}
          perRow={2}
        />
        <TuringPattern
          makeRunner={() =>
            new ActivInhibRunner({
              vars: ActivInhibParams.stripes,
              stopAfter: 20000,
              size: { width: 40, height: 50 },
            })
          }
          blurRadius={2}
          frameRate={30}
          skipFrames={25}
          perRow={2}
        />
        <TuringPattern
          makeRunner={() =>
            new AnimalRunner({
              vars: AnimalParams.giraffe,
              stopAfter: 3000,
              size: { width: 60, height: 120 },
            })
          }
          invert
          blurRadius={2}
          frameRate={30}
          skipFrames={10}
          perRow={3}
        />
        <TuringPattern
          makeRunner={() =>
            new AnimalRunner({
              vars: AnimalParams.leopard,
              stopAfter: 6000,
              randProb: 0.004,
              randA: 2,
              initConc: { a: 0, s: 2.5, y: 0 },
              size: { width: 60, height: 120 },
            })
          }
          invert
          blurRadius={3}
          frameRate={30}
          skipFrames={10}
          perRow={3}
        />
        <TuringPattern
          makeRunner={() =>
            new AnimalRunner({
              vars: AnimalParams.cheetah,
              stopAfter: 2000,
              randProb: 0.06,
              randA: 2.0,
              initConc: { a: 0, s: 2.5, y: 0 },
              size: { width: 60, height: 100 },
            })
          }
          invert
          blurRadius={2}
          frameRate={30}
          skipFrames={15}
          perRow={3}
        />
        <TuringPattern
          makeRunner={() =>
            new DragonflyRunner({ size: { width: 50, height: 30 } })
          }
          invert
          blurRadius={2}
          frameRate={30}
          skipFrames={50}
          perRow={2}
        />
      </div>
    </>
  );
}

export default App;
