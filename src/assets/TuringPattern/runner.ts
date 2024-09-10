import { getPBC, getRoot, Laplace, rngWithMinMax } from "./utils";

// INFO: Eq 1

const _spots_ai: VariableType<ActivInhibChems, ActivInhibParams> = {
  a: {
    D: 0.005,
    r: 0.01,
    u: 0.01,
    s: 0,
    k: 0,
  },
  h: {
    D: 0.2,
    r: 0.02,
    u: 0.02,
    s: 0,
    k: 0,
  },
};

const _stripes_ai = {
  ..._spots_ai,
  a: {
    ..._spots_ai.a,
    k: 0.25,
  },
};

export const ActivInhibParams = {
  spots: _spots_ai,
  stripes: _stripes_ai,
};

export class ActivInhibRunner implements ActivInhibProps {
  flucPerc: number;
  size: { width: number; height: number };
  seed: string;
  dx: number;
  dt: number;
  grids: { a: Float32Array; h: Float32Array };
  range: { a: { min: number; max: number }; h: { min: number; max: number } };
  vars: {
    a: {
      D: number;
      r: number;
      u: number;
      s: number;
      k: number;
    };
    h: {
      D: number;
      r: number;
      u: number;
      s: number;
      k: number;
    };
  };
  profile: boolean;
  constructor(params?: Partial<ActivInhibProps>) {
    this.flucPerc = params?.flucPerc || 7;
    this.size = params?.size || { width: 50, height: 50 };
    this.seed = params?.seed || `${Math.random()}`;
    this.dx = params?.dx || 1;
    this.dt = params?.dt || 1;
    this.profile = params?.profile || false;
    this.vars = params?.vars || _stripes_ai;
    this.range = {
      a: { min: Infinity, max: -Infinity },
      h: { min: Infinity, max: -Infinity },
    };
    // binds
    this.step = this.step.bind(this);
    this.prof = this.prof.bind(this);
    // profiler
    if (this.profile) this.prof();
    // make init grid
    this.grids = this.initGrid;
  }

  prof() {
    console.log(this);
    console.time("init");
    for (let i = 0; i < 1_000; i++) {
      this.grids = this.initGrid;
    }
    console.timeEnd("init");
    console.time("run");
    for (let i = 0; i < 1_000; i++) {
      this.step();
    }
    console.timeEnd("run");
  }

  get initGrid(): { a: Float32Array; h: Float32Array } {
    // Find the steady state solution
    const { a: va, h: vh } = this.vars;
    const aa_func = (a: number) => {
      return (
        (va.r * a * a * vh.u) / (1 + va.k * a * a) / (vh.r * a * a) -
        va.u * a +
        va.s
      );
    };
    const aa = getRoot(aa_func, 0.2, 1e-3, 1e-10);
    const hh = (vh.r * aa * aa) / vh.u;

    const rng = rngWithMinMax(
      this.seed,
      (100 - this.flucPerc) / 100,
      (100 + this.flucPerc) / 100,
    );

    const { width, height } = this.size;

    const a_grid: Float32Array = new Float32Array(width * height);
    const h_grid: Float32Array = new Float32Array(width * height);

    for (let i = 0; i < height * width; i++) {
      const a = aa * rng();
      const h = hh * rng();

      if (a > this.range.a.max) {
        this.range.a.max = a;
      } else if (a < this.range.a.min) {
        this.range.a.min = a;
      }

      if (h > this.range.h.max) {
        this.range.h.max = h;
      } else if (h < this.range.h.min) {
        this.range.a.min = h;
      }

      a_grid[i] = a;
      h_grid[i] = h;
    }

    return { a: a_grid, h: h_grid };
  }

  step(): void {
    let a_min = Infinity;
    let a_max = -Infinity;
    let h_min = Infinity;
    let h_max = -Infinity;

    const { width, height } = this.size;
    const a_grid = new Float32Array(width * height);
    const h_grid = new Float32Array(width * height);

    const { a: va, h: vh } = this.vars;

    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        const a = this.grids.a[i + j * width];
        const h = this.grids.h[i + j * width];

        const LapA = Laplace((x, y) => getPBC(this.grids.a, this.size, x, y));
        const LapH = Laplace((x, y) => getPBC(this.grids.h, this.size, x, y));

        const aa =
          a +
          this.dt *
            (va.D * LapA(i, j, this.dx) +
              (va.r * a * a) / (1 + va.k * a * a) / h -
              va.u * a +
              va.s);
        const hh =
          h + this.dt * (vh.D * LapH(i, j, this.dx) + vh.r * a * a - vh.u * h);

        if (aa < a_min) {
          a_min = aa;
        } else if (aa > a_max) {
          a_max = aa;
        }

        if (hh < h_min) {
          h_min = hh;
        } else if (hh > h_max) {
          h_max = hh;
        }

        a_grid[i + j * width] = aa;
        h_grid[i + j * width] = hh;
      }
    }

    this.grids = { a: a_grid, h: h_grid };
    this.range = {
      a: { min: a_min, max: a_max },
      h: { min: h_min, max: h_max },
    };
  }
}

// // INFO: Fig2 : Eq 8
//
// type Fig2_layers = "a" | "s" | "y";
//
// type Fig2_vars =
//   | "Da"
//   | "Ra"
//   | "Ka"
//   | "Ds"
//   | "Ss"
//   | "Ks"
//   | "Rs"
//   | "Ms"
//   | "Ry"
//   | "Ky"
//   | "My"
//   | "Sy";
//
// export type fig2_vars_type = {
//   Da: number;
//   Ra: number;
//   Ka: number;
//   Ds: number;
//   Ss: number;
//   Ks: number;
//   Rs: number;
//   Ms: number;
//   Ry: number;
//   Ky: number;
//   My: number;
//   Sy: number;
// };
//
// export class Fig2 implements Runner<Fig2_layers, Fig2_vars> {
//   size: number;
//   dt: number;
//   seed: number;
//   grids: { a: Float32Array; s: Float32Array; y: Float32Array };
//   vars: fig2_vars_type;
//   steady: { a: number; s: number; y: number };
//   fluc: number;
//   dx: number;
//   constructor(
//     vars: fig2_vars_type,
//     init_val: { a: number; aa: number; s: number; y: number },
//     size: number = 50,
//     seed: number = Math.random(),
//     fluc: number = 3,
//     dx: number = 1,
//     dt: number = 1,
//   ) {
//     this.size = size;
//     this.seed = seed;
//     this.vars = vars;
//     this.fluc = fluc;
//     this.dx = dx;
//     this.dt = dt;
//     this.steady = { a: 0, s: 0, y: 0 };
//
//     const rng = rngWithMinMax(this.seed, 0, 3000);
//
//     // INFO: make the initial grid
//     const a_grid = [];
//     const s_grid = [];
//     const y_grid = [];
//     for (let i = 0; i < this.size; i++) {
//       const a_row = [];
//       const s_row = [];
//       const y_row = [];
//       for (let j = 0; j < this.size; j++) {
//         if (rng() < 10) {
//           a_row.push(init_val.aa);
//         } else {
//           a_row.push(init_val.a);
//         }
//         s_row.push(init_val.s);
//         y_row.push(init_val.y);
//       }
//       a_grid.push(a_row);
//       s_grid.push(s_row);
//       y_grid.push(y_row);
//     }
//     this.grids = { a: a_grid, s: s_grid, y: y_grid };
//     this.step = this.step.bind(this);
//   }
//   step() {
//     const vars = this.vars;
//     const a_grid = structuredClone(this.grids.a);
//     const s_grid = structuredClone(this.grids.s);
//     const y_grid = structuredClone(this.grids.y);
//     for (let i = 0; i < this.size; i++) {
//       for (let j = 0; j < this.size; j++) {
//         const a = this.grids.a[i][j];
//         const s = this.grids.s[i][j];
//         const y = this.grids.y[i][j];
//         a_grid[i][j] +=
//           this.dt *
//           (vars.Da *
//             Laplace((x, y) => getPBC(this.grids.a, x, y), i, j, this.dx) +
//             vars.Ra * ((a * a * s) / (1 + vars.Ka * a * a) - a));
//         s_grid[i][j] +=
//           this.dt *
//           (vars.Ds *
//             Laplace((x, y) => getPBC(this.grids.s, x, y), i, j, this.dx) +
//             vars.Ss / (1 + vars.Ks * y) -
//             (vars.Rs * a * a * s) / (1 + vars.Ka * a * a) -
//             vars.Ms * s);
//         y_grid[i][j] +=
//           this.dt *
//           ((vars.Ry * y * y) / (1 + vars.Ky * y * y) -
//             vars.My * y +
//             vars.Sy * a);
//       }
//     }
//     this.grids = { a: a_grid, s: s_grid, y: y_grid };
//   }
// }
