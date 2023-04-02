"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistanceBetweenTwoPoints = void 0;
function getDistanceBetweenTwoPoints(p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
}
exports.getDistanceBetweenTwoPoints = getDistanceBetweenTwoPoints;
