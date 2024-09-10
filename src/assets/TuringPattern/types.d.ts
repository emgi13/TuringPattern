declare type VariableType<
  Chemicals extends string,
  Parameters extends string,
> = { [CK in Chemicals]: { [PK in Parameters]: number } };

declare interface Runner<Chemicals extends string, Parameters extends string> {
  // Canvas Size
  size: { width: number; height: number };
  // Seed
  seed: string;
  // controllers
  step: () => void;
  // calc params
  dx: number;
  dt: number;
  // Grids
  grids: { [CK in Chemicals]: number[][] };
  // variables
  vars: VariableType<Chemicals, Parameters>;
  profile: boolean;
  range: { [CK in Chemicals]: { min: number; max: number } };
}

declare type ActivInhibChems = "a" | "h";
declare type ActivInhibParams = "D" | "r" | "u" | "s" | "k";

declare interface ActivInhibProps
  extends Runner<ActivInhibChems, ActivInhibParams> {
  flucPerc: number;
}

declare interface TuringPatternProps {
  // Frame post processing
  blurRadius: number;
  frameScale: number;
  // runner
  runner: Runner<any, any>;
  // Render Speeds
  frameRate: number;
  skipFrames: number;
}
