import logic from './logic'
import { useEffect, useState } from "react";
import { Board, Player } from "./model";

// Constants.
const ROWS_COLUMNS_SIZE : number = 4;
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
                prevPlayer : Player
        ) : [Board, Player] =>  {
        
            const currentplayer = prevPlayer === Player.X ? Player.O : Player.X
        const newIdx = logic.bestMove(prevBoard)
        const newBoard = [...prevBoard]
        newBoard[newIdx] = currentplayer
        return [newBoard, currentplayer]
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