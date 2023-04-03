import { IPosition } from '../interfaces/coordinates'

export function getDistanceBetweenTwoPoints(p1: IPosition, p2: IPosition) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}
