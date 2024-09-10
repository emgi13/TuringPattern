declare interface RunnerProps {
  // Canvas Size
  size: { width: number; height: number; };
  // Render Speeds
  frameRate: number;
  skipFrames: number;
  runner: Runner;
}

declare interface TuringPatternProps extends RunnerProps {
  // Frame post processing
  blurRadius: number;
  frameScale: number;
}
