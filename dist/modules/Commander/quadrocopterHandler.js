import QuadrocopterSolver, { EResult } from 'src/modules/Quadrocopter/QuadrocopterSolver';
const transmitters = [
    { x: 6, y: 11, r: 4 },
    { x: 8, y: 17, r: 3 },
    { x: 19, y: 19, r: 2 },
    { x: 19, y: 11, r: 4 },
    { x: 15, y: 7, r: 6 },
    { x: 12, y: 19, r: 4 }
];
const solutionTexts = {
    [EResult.NO_START_RT]: 'No transmitter in range of starting position',
    [EResult.SUCCESS]: "Quadrocopter can fly to it's destination",
    [EResult.FAIL]: "Quadrocopter can't fly to it's destination"
};
// Example usage
const solver = new QuadrocopterSolver();
const start = { x: 10, y: 19 };
const end = { x: 19, y: 14 };
solver.setStart(start.x, start.y);
solver.setEnd(end.x, end.y);
solver.setTransmitters(transmitters);
const solution = solver.solve();
console.log(solutionTexts[solution]);
