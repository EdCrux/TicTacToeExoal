

// Data types.
export enum Player  {
    X = 'X',
    O = 'O',
    default=''
}
export type CellVal = Player.O | Player.X | Player.default | null
export type WinnablePosition = [number, number, number, number]
export type Board = Player[] | string[]


export type CellProps = {
    table: Array<Player | null>
    onClickCell : any,
    indexTable : number 
}

export type BoardProps = {
    table: Array<Player | null>
    onClickCell : any,
    player : Player | null  
}



