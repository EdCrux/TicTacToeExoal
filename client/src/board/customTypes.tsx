

// Data types.
export enum Player  {
    X = 'X',
    O = 'O',
    default=''
}

type Point = [number, number]

export type CellVal = Player.O | Player.X | Player.default | null
export type WinnablePosition = [number, number, number, number]
export type WinningInfo = {
    winner : Player
    position?: WinnablePosition
    line? : {
        from : Point
        to: Point
    }
}

export type Board = Player[]



