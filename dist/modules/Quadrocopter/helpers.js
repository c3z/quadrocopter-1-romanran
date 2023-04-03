// import { ITransmitter } from './QuadrocopterSolver'
import { getDistanceBetweenTwoPoints } from '../../helpers/calculations';
export function checkIfTransmittersInRange(rt1, rt2) {
    const transmittersDistance = getDistanceBetweenTwoPoints(rt1, rt2);
    const transmittersRangeSum = rt1.r + rt2.r;
    const transmittersAreInRange = transmittersDistance <= transmittersRangeSum;
    return transmittersAreInRange;
}
