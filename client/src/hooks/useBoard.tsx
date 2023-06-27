import logic from '../board/logic'
import { useEffect, useState } from "react";
import { Player } from "../board/customTypes";

// Constants.
const ROWS_COLUMNS_SIZE : number = 4;
const cellsCount = () => Math.pow(ROWS_COLUMNS_SIZE, 2)
const emptyBoard : Array<Player> = new Array(cellsCount()).fill(Player.default)
//const emptyBoard : Array<Player | number> = Array.from(Array(cellsCount()).keys())

function useBoard () {

    const [player, setPlayer] = useState(Player.X);
    const [board, setBoard] = useState(emptyBoard);
    const [winner, setWinner] = useState<Player | null>(Player.default)

    const onClickCell = (index : number) : void => {
        if (board[index] === '' && !winner) {
            const updated = [...board]
            updated[index] = player;
            setBoard(updated);
            const gameWon = logic.checkWinner(updated, player)
            setWinner(gameWon)
            setPlayer(player === Player.X ? Player.O : Player.X)
        }
    };

    const startGame = () => {
        setPlayer(Player.X)
        setBoard(emptyBoard)
        setWinner(Player.default)
    }

    useEffect(() => {
        startGame()
    }, [])

    useEffect(() => {
        
        if (player === Player.O && !winner) {
            console.log('turn of the computer')
            const bestMove = logic.getBestMove(board, player)
            console.log(bestMove)
            // if (gameWon) {
            //     setWinner(gameWon)
            // }
        }

    }, [player])

    return {
        player,
        board,
        winner,
        onClickCell
    } 
}

export default useBoard;