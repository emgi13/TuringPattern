import React from "react";
import p5 from "p5";
import './styles.scss'
import { Fig1 } from "./runner";
import { makeImage } from "./utils";

const vars1 = {
  Da: 0.005,
  Ra: 0.01,
  Ma: 0.01,
  Sa: 0,
  Ka: 0.0,
  Dh: 0.2,
  Rh: 0.02,
  Mh: 0.02,
};
const defaultRunner = new Fig1(vars1);

// INFO: interface creation
// add specific classes for each figure,
// customize the runner,
// add interface after to modify the props
// sliders and other props for modification of values
// -- These props will be modified by an interface that will
// -- have all the values
// do not randomize on stop button press
// add seed variable for user to set the random seed for each.
// in the website add references to the three pdfs
// runner should not appear on the top of the page,
// runners for each section instead.
class TuringPattern extends React.Component<TuringPatternProps> {
  static defaultProps: TuringPatternProps = {
    size: { width: 30, height: 30 },
    frameRate: 12,
    skipFrames: 1,
    blurRadius: 0,
    frameScale: 0.9,
    runner: defaultRunner
  }
  p5ref: React.RefObject<HTMLDivElement>;
  p5: p5 | undefined;
  active: boolean;
  debounceTimeout: number | undefined;
  constructor(props: TuringPatternProps) {
    super(props);
    this.p5ref = React.createRef();
    this.active = false;

    // binds
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollDebounced = this.handleScrollDebounced.bind(this);
  }

  handleScrollDebounced() {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(this.handleScroll, 10); // Adjust the delay as needed
  }

  handleScroll() {
    const inView = this.canvasInView();
    if (this.active && !inView) {
      this.p5!.frameRate(0);
      this.active = false;
      console.log("Render paused")
    } else if (!this.active && inView) {
      this.p5!.frameRate(this.props.frameRate);
      this.active = true;
      console.log("Render resumed")
    }
  }

  canvasInView() {
    const canvas = this.p5ref.current!;
    const rect = canvas.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    return (
      rect.bottom > 0 && // Bottom edge is below the top of the viewport
      rect.top < windowHeight // Top edge is above the bottom of the viewport
    );
  }

  componentDidMount(): void {
    this.p5 = new p5(this.sketch, this.p5ref.current as HTMLElement);
    // console.log(this.p5);
  }

  componentWillUnmount(): void {
    if (this.p5) {
      this.p5.remove();
    }
  }

  calcFrame() {
    const { runner } = this.props;
    for (let i = 0; i < this.props.frameRate; i++) {
      runner.step();
    }
  }

  renderFrame() {
    // console.log("render");
    const { runner } = this.props;
    const p = this.p5!;
    const width = p.width;
    let i = 0;
    for (const layer in runner.grids) {
      // get the image
      const img = makeImage(p, runner.grids[layer], runner.size);
      // put the image on the canvas
      p.image(
        img,
        ((1 - this.props.frameScale) / 2) * width,
        i * width + ((1 - this.props.frameScale) / 2) * width,
        width * this.props.frameScale,
        width * this.props.frameScale,
      );
      i += 1;
    }
    p.filter(p.BLUR, this.props.blurRadius);
  }


  sketch = (p: p5) => {
    p.setup = () => {
      const layers = Object.keys(this.props.runner.grids).length;
      const width = this.p5ref.current?.offsetWidth || 400;
      const height = width * layers;
      p.createCanvas(width, height);
      p.background(0, 0, 0, 0);
      p.frameRate(0);
      window.addEventListener("scroll", this.handleScrollDebounced, {
        passive: true,
      });
    };

    p.draw = () => {
      p.clear();
      this.calcFrame();
      this.renderFrame();
    };
  };


  render(): React.ReactNode {
    return (
      <div className="TuringPatterns">
        <div className="canvas-cont" ref={this.p5ref}></div>
      </div>
    );

  }
}

export default TuringPattern;
