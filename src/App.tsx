import "./App.css";
import {
  TuringCheetah,
  TuringDragonfly,
  TuringGiraffe,
  TuringLeopard,
  TuringSpots,
  TuringStripes,
} from "./assets/TuringPattern/defaults";

function App() {
  return (
    <>
      <div id="main">
        <TuringSpots />
        <TuringStripes />
        <TuringGiraffe />
        <TuringLeopard />
        <TuringCheetah />
        <TuringDragonfly />
      </div>
    </>
  );
}

export default App;
