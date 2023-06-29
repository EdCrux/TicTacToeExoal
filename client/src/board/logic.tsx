import { WinnablePosition, Player, CellVal, Board } from './model';
const print = console.log
const MAX_DEPTH = 8;
const WINNING_COMBINATIONS : WinnablePosition[] = [
    [0, 5, 10, 15],
    [0, 4, 8,  12],
    [0, 1, 2,   3],
    [1, 5, 9,  13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [3, 6, 9,  12]
]


/**
 * 
 * @param board 
 * @param player 
 * @param winning_combos 
 * @returns 
 */
function checkNWinner (
        board : Array<any>, 
            player : Player, 
                winning_combos : WinnablePosition[] = WINNING_COMBINATIONS
    ) : Player | null {
    

    if (!board || !player) return null

    const prevPlays : number[] = board.reduce((acum, cellVal, idx) => 
                    (cellVal === player) ? acum.concat(idx) : acum, [])

    const gameWon = winning_combos.some((combination : WinnablePosition) => {
        if (combination.every((index : number) => prevPlays.indexOf(index) > -1)) {
            return true
        }
    })

    if (gameWon) return player
    const availableMoves = getAvailableMoves(board).length
    if (availableMoves === 0) return Player.tie

    return null

}

/**
 * The heuristic function that handles, if the maximizing player('X') wins, 
 * @param board 
 * @param depth 
 * @returns 
 */
function checkWinner (board : Board ) : Player | null {

    if (!board) return Player.default
    const lines = [
        // Rows
        [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
        // Columns
        [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
        // Diag
        [0, 5, 10, 15], [3, 6, 9, 12]
    ];
    
    for (const line of lines) {
        const [a, b, c, d] = line;
        const lineValues = [board[a], board[b], board[c], board[d]];
        const xCount = lineValues.filter(value => value === Player.X).length;
        const oCount = lineValues.filter(value => value === Player.O).length;
    
        if (xCount === 4) {
            return Player.X 
        }
        if (oCount === 4) {
            return Player.O
        }
    }

    const availableMoves = getAvailableMoves(board).length
    if (availableMoves === 0) return Player.tie

    return null;
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
// const minimax = ( 
//     board : Board,
//     idx   : number,
//     depth : number, 
//     alpha : number, 
//     beta  : number, 
//     isMax : boolean ) => {
//     console.log(board)
//     const best = {
//         score : isMax ? -Infinity : Infinity,
//         idx   : idx
//     }

//     const player = isMax ? Player.X : Player.O;
//     if (player === Player.X && checkWinner(board, player)) {
//         console.log('Maximizin')
//         return {
//             score : 100,
//             idx : idx
//         }

//     } else if (player == Player.O && checkWinner(board, player)) {
//         console.log('HERE')
//         return {
//             score: -100, 
//             idx: idx 
//         }

//     } else if (getAvailableMoves(board).length === 0) {
//         return {
//             score: 0,
//             idx: idx
//         }
//     }
//     if (depth === 0) {
//         return best;
//     }

//     for (const idx of getAvailableMoves(board)) {
//         const val = board[idx]
//         if (val !== '') continue;
//         const newBoard = [...board] 
//         newBoard[idx] = player
//         const { score } = minimax(newBoard, idx, depth - 1, alpha, beta, !isMax)
//         newBoard[idx] = ''
//         if (isMax) {

//             best.score = Math.max(best.score, score)
//             best.idx = idx
//             alpha = Math.max(alpha, best.score)
//             if (beta <= alpha) break
//         } else {
//             best.score = Math.min(best.score, score)
//             best.idx = idx
//             beta = Math.min(beta, best.score)
//             if (beta <= alpha) break
//         }
//     }

//     return best
// }

// function makeMove(board : Board, idx : number, isComputer : boolean) : number {
//     const move = minimax(board, idx, MAX_DEPTH, -Infinity, Infinity, isComputer)
//     console.log(move)
//     return move.idx
// }


let scores = {
    [Player.X]   : -1,
    [Player.O]:  1,
    [Player.tie] :  0,
}


function minimax (board : Board, depth : number, isMax : boolean) {

    let winner : Player | null = checkWinner(board)
    if (winner !== null) {
        // print('Does someone wins',winner)
        return scores[winner]
    }

    if (isMax) {
        let bestScore = -Infinity
        for (const pmove of getAvailableMoves(board)) {
            
            board[pmove] = Player.O
            const score  = minimax(board, depth + 1, false)
            // print('the score',score )
            
            board[pmove] = Player.default
            bestScore = Math.max(score, bestScore)
            break;
        }
        return bestScore
    } else {
        let bestScore = Infinity
        for (const pmove of getAvailableMoves(board)) {
            board[pmove] = Player.X
            const score  = minimax(board, depth + 1, true)
            board[pmove] = Player.default
            bestScore = Math.min(score, bestScore)
            break;
        }
        return bestScore
    }
}

function bestMove(board : Board) {

    let bestScore = -Infinity;
    let move = 0;

    for (const [i, val] of board.entries()) {
        if (val === Player.default) {
            board[i] = Player.O
            let score = minimax(board, 0, false);
            board[i] = Player.default
            if (score > bestScore) {
                bestScore = score;
                move = i
            }
            console.log(bestScore)
        }
    }

    return move
}

export default {
    WINNING_COMBINATIONS,
    checkWinner,
    getAvailableMoves,
    minimax,
    bestMove
}