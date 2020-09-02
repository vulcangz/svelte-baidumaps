import {createPoint} from './factory'

export const isPoint = obj => obj.lng && obj.lat
export const checkType = val => Object.prototype.toString.call(val).slice(8, -1)

export const getPosition = (bdmap, point) => isPoint(point) ? createPoint(bdmap, point) : point
