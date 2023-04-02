"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QuadrocopterSolver_1 = __importDefault(require("@/modules/Quadrocopter/QuadrocopterSolver"));
const transmitters = [
    { x: 6, y: 11, r: 4 },
    { x: 8, y: 17, r: 3 },
    { x: 19, y: 19, r: 2 },
    { x: 19, y: 11, r: 4 },
    { x: 15, y: 7, r: 6 },
    { x: 12, y: 19, r: 4 }
];
// Example usage
const solver = new QuadrocopterSolver_1.default();
const start = { x: 10, y: 19 };
const end = { x: 19, y: 14 };
solver.setStart(start.x, start.y);
solver.setEnd(end.x, end.y);
solver.setTransmitters(transmitters);
const solution = solver.solve();
console.log(solution);
