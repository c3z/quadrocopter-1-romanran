"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfTransmittersInRange = void 0;
// import { ITransmitter } from './QuadrocopterSolver'
const calculations_1 = require("@/helpers/calculations");
function checkIfTransmittersInRange(rt1, rt2) {
    const transmittersDistance = (0, calculations_1.getDistanceBetweenTwoPoints)(rt1, rt2);
    const transmittersRangeSum = rt1.r + rt2.r;
    const transmittersAreInRange = transmittersDistance <= transmittersRangeSum;
    return transmittersAreInRange;
}
exports.checkIfTransmittersInRange = checkIfTransmittersInRange;
