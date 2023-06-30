import logic from './logic'
import { useEffect, useState } from "react";
import { Board, Player } from "./model";

// Constants.
const ROWS_COLUMNS_SIZE : number = logic.BOARD_LEN_SIZE;
const cellsCount = () => Math.pow(ROWS_COLUMNS_SIZE, 2)
const emptyBoard : Array<Player> = new Array(cellsCount()).fill(Player.default)
//const emptyBoard : Array<Player | number> = Array.from(Array(cellsCount()).keys())

function useBoard () {

    const [player, setPlayer] = useState(Player.X);
    const [board, setBoard] = useState<Board>(emptyBoard);
    const [winner, setWinner] = useState<Player | null>(Player.default)

    const onClickReplay = () => {
        startGame()
    }

    const onClickCell = (index : number) : void => {


        if (board[index] === '' && !winner) {
            const updated = [...board]
            updated[index] = player;
            const aWinner = logic.checkWinner(updated)
            console.log('The winner',aWinner)
            if (aWinner) {
                setWinner(aWinner)
                return 
            }
            setBoard(updated);
            const [newBoard, currentplayer] = aiMove(updated, player)
            setTimeout(() => setBoard(newBoard), 400)
            setPlayer(currentplayer === Player.X ? Player.O : Player.X)
        }
    };

    const aiMove = (
            prevBoard : Board, 
                humanPlayer : Player
        ) : [Board, Player] =>  {
        
        const aiPlayer = humanPlayer === Player.X ? Player.O : Player.X
        const { idx, score } = logic.minimax([...prevBoard], aiPlayer, 0, true)
        console.log('the next move', idx, score)
        const newBoard = [...prevBoard]
        newBoard[idx] = aiPlayer
        console.log(newBoard)
        return [newBoard, aiPlayer]
    }

    const startGame = () => {
        setPlayer(Player.X)
        setBoard(emptyBoard)
        setWinner(Player.default)
    }

    useEffect(() => {
        startGame()
    }, [])


    return {
        player,
        board,
        winner,
        onClickCell,
        onClickReplay
    } 
}

export default useBoard;