import { position } from "./GeneralTypes";

export function generateRandomInteger(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min + 1))
}

export const getAngle = (first: position, second: position, third: position): number => {
    const radians = Math.atan2(third.y - second.y, third.x - second.x) - Math.atan2(first.y - second.y, first.x - second.x);
    return radians * (180 / Math.PI);
}