import { getDistanceBetweenTwoPoints } from '../../helpers/calculations'
import { IPosition } from '../../interfaces/coordinates'
import { checkIfTransmittersInRange } from './helpers'

export interface ITransmitter {
    x: number
    y: number
    r: number
}

export enum EResult {
    NO_START_RT,
    SUCCESS,
    FAIL
}
export interface IResult {
    result: EResult
    parameter?: object | string | number | undefined
}

export default class QuadrocopterSolver {
    start: IPosition = { x: 0, y: 0 }
    end: IPosition = { x: 0, y: 0 }
    transmitters: ITransmitter[] = []
    visitedTransmitters: Set<ITransmitter> = new Set()

    public setStart(x: number, y: number) {
        this.start = { x, y }
    }
    public setEnd(x: number, y: number) {
        this.end = { x, y }
    }
    public setTransmitters(transmitters: ITransmitter[]) {
        this.transmitters = transmitters
    }
    public solve(): IResult {
        const startingTransmitter = this.findNextTransmitter({
            x: this.start.x,
            y: this.start.y,
            r: 0
        })

        if (!startingTransmitter) {
            return { result: EResult.NO_START_RT }
        }
        return this.flyCopter(startingTransmitter)
    }

    // recursively find transmitter in range of the qopter
    private flyCopter(currentTransmitterInRange: ITransmitter): IResult {
        const endIsInTransmitterRange = getDistanceBetweenTwoPoints(currentTransmitterInRange, this.end) <= currentTransmitterInRange.r
        if (endIsInTransmitterRange) {
            return { result: EResult.SUCCESS }
        }

        const nextTransmitter = this.findNextTransmitter(currentTransmitterInRange)

        if (nextTransmitter) {
            this.visitedTransmitters.add(currentTransmitterInRange)
            return this.flyCopter(nextTransmitter)
        } else {
            return { result: EResult.FAIL, parameter: currentTransmitterInRange }
        }
    }

    private findNextTransmitter(currentTransmitterInRange: ITransmitter): ITransmitter | false {
        for (let transmitter of this.transmitters) {
            const copterVisitedTransmitter = this.visitedTransmitters.has(transmitter)

            if (copterVisitedTransmitter) {
                continue
            }
            if (checkIfTransmittersInRange(currentTransmitterInRange, transmitter)) {
                return transmitter
            }
        }
        return false
    }
}
