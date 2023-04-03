import { getDistanceBetweenTwoPoints } from '../../helpers/calculations';
import { checkIfTransmittersInRange } from './helpers';
export var EResult;
(function (EResult) {
    EResult[EResult["NO_START_RT"] = 0] = "NO_START_RT";
    EResult[EResult["SUCCESS"] = 1] = "SUCCESS";
    EResult[EResult["FAIL"] = 2] = "FAIL";
})(EResult || (EResult = {}));
export default class QuadrocopterSolver {
    start = { x: 0, y: 0 };
    end = { x: 0, y: 0 };
    transmitters = [];
    visitedTransmitters = new Set();
    setStart(x, y) {
        this.start = { x, y };
    }
    setEnd(x, y) {
        this.end = { x, y };
    }
    setTransmitters(transmitters) {
        this.transmitters = transmitters;
    }
    solve() {
        const startingTransmitter = this.findNextTransmitter({
            x: this.start.x,
            y: this.start.y,
            r: 0
        });
        if (!startingTransmitter) {
            return { result: EResult.NO_START_RT };
        }
        return this.flyCopter(startingTransmitter);
    }
    // recursively find transmitter in range of the qopter
    flyCopter(currentTransmitterInRange) {
        const endIsInTransmitterRange = getDistanceBetweenTwoPoints(currentTransmitterInRange, this.end) <= currentTransmitterInRange.r;
        if (endIsInTransmitterRange) {
            return { result: EResult.SUCCESS };
        }
        const nextTransmitter = this.findNextTransmitter(currentTransmitterInRange);
        if (nextTransmitter) {
            this.visitedTransmitters.add(currentTransmitterInRange);
            return this.flyCopter(nextTransmitter);
        }
        else {
            return { result: EResult.FAIL, parameter: currentTransmitterInRange };
        }
    }
    findNextTransmitter(currentTransmitterInRange) {
        for (let transmitter of this.transmitters) {
            const copterVisitedTransmitter = this.visitedTransmitters.has(transmitter);
            if (copterVisitedTransmitter) {
                continue;
            }
            if (checkIfTransmittersInRange(currentTransmitterInRange, transmitter)) {
                return transmitter;
            }
        }
        return false;
    }
}
