export type position = {
    x: number,
    y: number
}

export type ProtractorPointPosition = {
    next?: number,
    prev?: number,
    id: number,
    x: number,
    y: number
}

export type PointDictionary = {
    [id: string]: position
}