import logic from './logic'
import { useCallback, useEffect, useState } from "react";
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
    const [availMoves, setAvailMoves] = useState<number[]>([])

    const onClickReplay = () => {
        startGame()
        history.go(0)
    }

    const onClickCell = useCallback((index : number) : void => {

        if (board[index] === '' && !winner) {
            const updated = [...board]
            updated[index] = player;
            const aWinner = logic.checkWinner(updated)
            if (aWinner) {
                setWinner(aWinner)
                return 
            }
            setBoard(updated);
            setAvailMoves(logic.getAvailableMoves(updated))
            setTimeout(() =>{
                const [newBoard, currentplayer] = aiMove(updated, player)
                setBoard(prev => {
                    console.log(prev.length, newBoard.length)
                    return newBoard
                })  
                const aWinner2 = logic.checkWinner(newBoard)
                if (aWinner2) {
                    setWinner(aWinner2)
                    return 
                }
                setAvailMoves(logic.getAvailableMoves(updated))
                setPlayer(currentplayer === Player.X ? Player.O : Player.X)
            } , 400)

        }
    }, [board])

    const aiMove = (
            prevBoard : Board, 
                humanPlayer : Player
        ) : [Board, Player] =>  {
        
        const aiPlayer = humanPlayer === Player.X ? Player.O : Player.X
        
        const { idx } = logic.aiMove([...prevBoard], aiPlayer)
        // console.log('the next move', idx, score)
        console.log('The idx is: ', idx)
        const newBoard = [...prevBoard]
        if (typeof idx === 'number') newBoard[idx] = aiPlayer
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
        availMoves,
        onClickCell,
        onClickReplay
    } 
}

export default useBoard;