"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EResult = void 0;
const calculations_1 = require("@/helpers/calculations");
const helpers_1 = require("./helpers");
var EResult;
(function (EResult) {
    EResult["NO_START_RT"] = "No transmitter in range of starting position";
    EResult["SUCCESS"] = "Quadrocopter can fly to it's destination";
    EResult["FAIL"] = "Quadrocopter can't fly to it's destination";
})(EResult = exports.EResult || (exports.EResult = {}));
class QuadrocopterSolver {
    constructor() {
        this.start = { x: 0, y: 0 };
        this.end = { x: 0, y: 0 };
        this.transmitters = [];
        this.visitedTransmitters = new Set();
    }
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
        console.log({ startingTransmitter });
        if (!startingTransmitter) {
            return EResult.NO_START_RT;
        }
        return this.flyCopter(startingTransmitter);
    }
    // recursively find transmitter in range of the qopter
    flyCopter(currentTransmitterInRange) {
        const endIsInTransmitterRange = (0, calculations_1.getDistanceBetweenTwoPoints)(currentTransmitterInRange, this.end) <= currentTransmitterInRange.r;
        if (endIsInTransmitterRange) {
            return EResult.SUCCESS;
        }
        const nextTransmitter = this.findNextTransmitter(currentTransmitterInRange);
        if (nextTransmitter) {
            this.visitedTransmitters.add(currentTransmitterInRange);
            return this.flyCopter(nextTransmitter);
        }
        else {
            return EResult.FAIL;
        }
    }
    findNextTransmitter(currentTransmitterInRange) {
        for (let transmitter of this.transmitters) {
            const copterVisitedTransmitter = this.visitedTransmitters.has(transmitter);
            if (copterVisitedTransmitter) {
                continue;
            }
            if ((0, helpers_1.checkIfTransmittersInRange)(currentTransmitterInRange, transmitter)) {
                return transmitter;
            }
        }
        return false;
    }
}
exports.default = QuadrocopterSolver;
