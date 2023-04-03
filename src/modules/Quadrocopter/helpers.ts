// import { ITransmitter } from './QuadrocopterSolver'
import { getDistanceBetweenTwoPoints } from 'src/helpers/calculations'
import { ITransmitter } from 'src/modules/Quadrocopter/QuadrocopterSolver'

export function checkIfTransmittersInRange(rt1: ITransmitter, rt2: ITransmitter) {
    const transmittersDistance = getDistanceBetweenTwoPoints(rt1, rt2)
    const transmittersRangeSum = rt1.r + rt2.r
    const transmittersAreInRange = transmittersDistance <= transmittersRangeSum
    return transmittersAreInRange
}
