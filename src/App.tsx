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
        {/* <TuringPattern */}
        {/*   makeRunner={() => */}
        {/*     new ActivInhibRunner({ vars: ActivInhibParams.spots }) */}
        {/*   } */}
        {/*   invert */}
        {/*   frameRate={30} */}
        {/*   skipFrames={10} */}
        {/* /> */}
        {/* <TuringPattern */}
        {/*   makeRunner={() => */}
        {/*     new ActivInhibRunner({ */}
        {/*       vars: ActivInhibParams.stripes, */}
        {/*       stopAfter: 20000, */}
        {/*     }) */}
        {/*   } */}
        {/*   blurRadius={2} */}
        {/*   frameRate={30} */}
        {/*   skipFrames={25} */}
        {/* /> */}
        {/* <TuringPattern */}
        {/*   makeRunner={() => */}
        {/*     new AnimalRunner({ vars: AnimalParams.giraffe, stopAfter: 3000 }) */}
        {/*   } */}
        {/*   invert */}
        {/*   blurRadius={2} */}
        {/*   frameRate={30} */}
        {/*   skipFrames={10} */}
        {/* /> */}
        {/* <TuringPattern */}
        {/*   makeRunner={() => */}
        {/*     new AnimalRunner({ */}
        {/*       vars: AnimalParams.leopard, */}
        {/*       stopAfter: 6000, */}
        {/*       randProb: 0.004, */}
        {/*       randA: 2, */}
        {/*       initConc: { a: 0, s: 2.5, y: 0 }, */}
        {/*     }) */}
        {/*   } */}
        {/*   invert */}
        {/*   blurRadius={3} */}
        {/*   frameRate={30} */}
        {/*   skipFrames={10} */}
        {/* /> */}
        {/* <TuringPattern */}
        {/*   makeRunner={() => */}
        {/*     new AnimalRunner({ */}
        {/*       vars: AnimalParams.cheetah, */}
        {/*       stopAfter: 2000, */}
        {/*       randProb: 0.048, */}
        {/*       randA: 2.0, */}
        {/*       initConc: { a: 0, s: 2.5, y: 0 }, */}
        {/*     }) */}
        {/*   } */}
        {/*   invert */}
        {/*   blurRadius={2} */}
        {/*   frameRate={30} */}
        {/*   skipFrames={15} */}
        {/* /> */}
        <TuringPattern
          makeRunner={() => new DragonflyRunner()}
          invert
          blurRadius={2}
          frameRate={30}
          skipFrames={100}
        />
      </div>
    </>
  );
}

export default App;
