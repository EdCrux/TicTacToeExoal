import { WinnablePosition, Player, CellVal, Board } from './customTypes';
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
function checkWinner (
        board : Array<any>, 
            player : Player, 
                winning_combos : WinnablePosition[] = WINNING_COMBINATIONS
    ) : Player | null {
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
function calculateScore (board : Array<any>, depth: number) : number {
    if(checkWinner(board, Player.X)) {
        return 1 - depth
    } else if (checkWinner(board, Player.O)) {
        return depth - 1
    }
    return 0;
}

const getAvailableMoves = (board : Board) => {
    const moves = board.map((_ : CellVal, idx : number) => {
        if (board[idx] == '') {
            return idx
        }
    })

    return moves

}

const minimax = ( board : Board, depth :number, alpha : number, beta: number, maximizingPlayer : boolean )=> {
    if (depth ==0 || evaluate_state(board)) 
        return evaluate_state(board)
    
        if (maximizingPlayer) {
            let maxEval = -Infinity
            for (const move of getAvailableMoves(board)) {
                const newBoard = [...board]
                newBoard[move] = Player.X
                const evaluation = minimax(newBoard, depth - 1, alpha, beta, false)
                maxEval = Math.max(maxEval, evaluation)
                alpha = Math.max(alpha, evaluation)

                if (beta <= alpha) break
            }

            return maxEval
        }

        let minEval = Infinity

        for (const move of getAvailableMoves(board)) {
            const newBoard = [...board]
            newBoard[move] = Player.X
            const evaluation = minimax(newBoard, depth - 1, alpha, beta, false)
            minEval = Math.min(minEval, evaluation)
            alpha = Math.min(beta, evaluation)
            if (beta <= alpha) break

        }

        return minEval


}

function getBestMove(board :Board<CellVal>, AIPlayer : Player) : number {

    let bestScore : number = -Infinity;
    let bestMove  : number = -1;

    for (let idx = 0; idx < board.length; idx++) {
        const cellVal = board[idx];

        if (cellVal === Player.default) {
            board[idx] = AIPlayer;
            const score = aStar(board, 0, true)
            board[idx] = Player.default;
            if (score > bestScore) {
                bestScore = score;
                bestMove = idx

            }
        }
    }
    
    return bestMove
}

export default {
    checkWinner,
    getBestMove
}