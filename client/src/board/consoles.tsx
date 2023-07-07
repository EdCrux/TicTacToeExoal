import { Board } from "../engine/model"


export const print_boards = (boards : Array<string>) => {
    boards.forEach(board => {
        console.log(board)
    })
}

export const prepare_printing_board = ( board : Board, _: number=0) : any =>{

    if (board.length === 9) {
        const a = `
            ${board[0] || ' '} | ${board[1] || ' '} | ${board[2] || ' '}
            ----------
            ${board[3] || ' '} | ${board[4] || ' '} | ${board[5] || ' '}
            ----------
            ${board[6] || ' '} | ${board[7] || ' '} | ${board[8] || ' '}
            `
        return a
    } 


    if (board.length === 16) {
        const a = `
            ${board[0] || ' '} | ${board[1] || ' '} | ${board[2] || ' '} | ${board[3] || ' '}
            -------------
            ${board[4] || ' '} | ${board[5] || ' '} | ${board[6] || ' '} | ${board[7] || ' '}
            -------------
            ${board[8] || ' '} | ${board[9] || ' '} | ${board[10] || ' '} | ${board[11] || ' '}
            -------------
            ${board[12] || ' '} | ${board[13] || ' '} | ${board[14] || ' '} | ${board[15] || ' '}
        `
        return a
    }

}