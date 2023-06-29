

// Data types.
export enum Player  {
    X = 'X',
    O = 'O',
    default='',
    tie = 'tie'
}

export type CellVal = Player.O | Player.X | Player.default | null
export type WinnablePosition = [number, number, number, number]
export type Board = Player[] | string[]


export type CellProps = {
    table: Board
    onClickCell : any,
    indexTable : number 
}

export type BoardProps = {
    table: Board
    onClickCell : any,
    player : Player | null  
}



