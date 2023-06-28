import { WinnablePosition, Player, CellVal, Board } from './customTypes';
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
function checkWinner (
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

    return null

}

/**
 * The heuristic function that handles, if the maximizing player('X') wins, 
 * @param board 
 * @param depth 
 * @returns 
 */

function evaluateState2( board : Board) : number | null {
    if (checkWinner(board,Player.X)) {
        return -100
    } else if (checkWinner(board, Player.O)) {
        return 100
    } else if (getAvailableMoves(board).length === 0) {
        return 0;
    }

    return null
}

function evaluateState (board : Board ) : number {
    if (!board) return 0
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
        const xCount = lineValues.filter(value => value === 'X').length;
        const oCount = lineValues.filter(value => value === 'O').length;
    
        if (xCount === 4) {
          return 100; 
        }
        if (oCount === 4) {
          return -100;
        }
    }

    return 0;
}

const getAvailableMoves = (board : Board) : Array<number> => {

    const moves : number[] = []
    
    board.forEach((_ : CellVal | string, idx : number) => {
        if (board[idx] == '') {
            moves.push(idx)
        }
    })

    return moves

}

const minimax = ( board : Board, depth :number, alpha : number, beta: number, maximizingPlayer : boolean ) => {
    
    if (depth === 0 || evaluateState(board) !== 0) {
        return evaluateState(board)
    }

    if (maximizingPlayer) {
        let maxEval = -Infinity
        for (const move of getAvailableMoves(board)) {
            const newBoard = [...board]
            newBoard[move] = Player.X
            const evaluation = minimax(newBoard, depth - 1, alpha, beta, false)
            maxEval = Math.max(maxEval, evaluation)
            alpha = Math.max(alpha, evaluation)
            if (beta <= alpha) { 
                break
            }
        }

        return maxEval
    }

    let minEval = Infinity

    for (const move of getAvailableMoves(board)) {
        const newBoard = [...board]
        newBoard[move] = Player.O
        const evaluation = minimax(newBoard, depth - 1, alpha, beta, true)
        minEval = Math.min(minEval, evaluation)
        beta = Math.min(beta, evaluation)
        if (beta <= alpha) break

    }

    return minEval


}

function makeMove(board : Board, AIPlayer : Player) : number | null {

    let bestScore = -Infinity;
    let bestMove  : number | null = null;
    const availableMoves = getAvailableMoves(board)
    console.log(availableMoves)
    for (const move of getAvailableMoves(board)) {
        const newBoard : Board = [...board];
        newBoard[move] = AIPlayer;
        const score = minimax(newBoard, MAX_DEPTH, -Infinity, Infinity, false)
        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }
    
    return bestMove
}

export default {
    WINNING_COMBINATIONS,
    evaluateState,
    checkWinner,
    getAvailableMoves,
    minimax,
    makeMove
}