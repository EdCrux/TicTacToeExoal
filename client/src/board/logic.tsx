import { Player, CellVal, Board } from './model';
import { prepare_printing_board } from './visualizer';

const MAX_DEPTH = 5;
const BOARD_LEN_SIZE = 4;
type Move = {
    idx? : number,
    score? : number
}

const getWinningCombos = ( boardLenSide : number ) => {

    const lines: number[][] = [];
    
    if (boardLenSide === 4) {
        // Filas
        for (let row = 0; row < 4; row++) {
            lines.push([row * 4, row * 4 + 1, row * 4 + 2, row * 4 + 3]);
        }

        // Columnas
        for (let col = 0; col < 4; col++) {
            lines.push([col, col + 4, col + 8, col + 12]);
        }

        // Diagonales
        lines.push([0, 5, 10, 15]);
        lines.push([3, 6, 9, 12]);
    }

    if (boardLenSide === 3) {
        // Filas
        for (let row = 0; row < 3; row++) {
            lines.push([row * 3, row * 3 + 1, row * 3 + 2]);
        }

        // Columnas
        for (let col = 0; col < 3; col++) {
            lines.push([col, col + 3, col + 6]);
        }

        // Diagonales
        lines.push([0, 4, 8]);
        lines.push([2, 4, 6]);

    
    }

    return lines
}

const getAvailableMoves = (board : Board) : Array<number> => {

    const moves : number[] = []
    
    board.forEach((_ : CellVal | string, idx : number) => {
        if (board[idx] === '') {
            moves.push(idx)
        }
    })

    return moves

}

const generateSuccesors = ( board : Board, player : Player)  : Array<any> => {
    const availMoves = getAvailableMoves(board)
    
    // Remember an index represents a possible move.
    const possibleMoves : Array<any> = []
    const possibleMovesRepr : Array<any> = []

    availMoves.forEach((idx : number )=> {
        const new_board = [...board]
        new_board[idx] = player
        possibleMovesRepr.push(prepare_printing_board(new_board))
        possibleMoves.push([new_board, idx])
    })



    // print_boards(possibleMovesRepr)
    return possibleMoves
}

const scoreMove = (board : Board) =>  {
    const result = checkWinner(board)
    if (result === Player.X) {
        return -1
    } else if (result === Player.O) {
        return 1
    } else if (result === Player.tie ) {
        return 0
    }
    return null
}

const checkWinner = (board : Board, board_len_size : number = BOARD_LEN_SIZE) : Player | null => {

    if (board.length === 0) return null
    const lines = getWinningCombos(board_len_size)

    for (const line of lines) {
        const [a, b, c, d] = line;
        const lineValues = [board[a], board[b], board[c], board[d]];
        const xCount = lineValues.filter(value => value === Player.X).length;
        const oCount = lineValues.filter(value => value === Player.O).length;
        if (xCount === board_len_size) {
            return Player.X 
        }

        if (oCount === board_len_size) {
            return Player.O
        }
    }

    const availableMoves = getAvailableMoves(board).length
    if (availableMoves === 0) return Player.tie

    return null;
}


function aiMove ( board : Board, player : Player) {
    
    const availMoves = getAvailableMoves(board)
    if (availMoves.length > 11) {
        // console.log('Random choice  ')
        let random = Math.floor(Math.random()*availMoves.length);
        return { idx : random, score : -1 }
    }

    return minimax(
        board, 
        player, 
        0, 
        true, 
        0,
        -Infinity,
        Infinity
    )


} 

/**
 * Punto B
 * @param board 
 * @param player 
 * @param idx 
 * @param isMax 
 * @param depth 
 * @param alpha 
 * @param beta 
 * @returns 
 */
function minimax  (
    board : Board, 
    player : Player,
    idx : number,
    isMax : boolean, 
    depth : number,
    alpha : number,
    beta : number
) : Move {

    // console.log(
    //     'board',board, 
    //     'player', player, 
    //     'idx',idx,
    //     'isMax', isMax,
    //     'depth', depth
    // )
    // console.log('currentidx', idx,'board', prepare_printing_board(board))

    const winner = checkWinner(board)

    if (
        depth === MAX_DEPTH
    ) {
        //console.log('MAX_DEPHT REACHED', winner ,'the score',scoreMove(board))
        const score = scoreMove(board)
        return { score, idx}
    }
    
    if  (winner) {
        const score = scoreMove(board)
        return { score, idx }
    }

    let bestResult : Move = {
        idx : idx,
        score : (isMax) ? -Infinity : Infinity
    }

    if (isMax) { 
        for (const [possibleBoard, idx] of generateSuccesors([...board], player)) {
            const result = minimax(possibleBoard, Player.X, idx, false,  depth + 1, alpha, beta)
            if (result.score > bestResult.score) {
                bestResult.score = result.score
                bestResult.idx = idx
            }

                alpha = Math.max(result.score, alpha)
                if (beta <= alpha) {
                    break;
                }
            
        }
        return bestResult
    } else {
        for (const [possibleBoard, idx] of generateSuccesors([...board], player)) {
            const result = minimax(possibleBoard, Player.O, idx, true, depth + 1, alpha, beta)
            if (result.score < bestResult.score) {
                bestResult.score = result.score
                bestResult.idx = idx
            }

            beta = Math.min(result.score, beta)
            if (beta <= alpha) {
                break
            }
        }
        return bestResult
    }
}

export default {
    BOARD_LEN_SIZE,
    minimax,
    checkWinner,
    getAvailableMoves,
    generateSuccesors,
    scoreMove,
    aiMove
}