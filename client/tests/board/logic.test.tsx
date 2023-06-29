import { Player } from "../../src/board/model"
import logic from "../../src/board/logic"
// 

describe('checkWinner', () => {

    test('Normal arguments negative case', () => {
        const board = new Array(16).fill('')
        expect(logic.checkWinner(board, Player.X)).toBe(null)
    })

    test('Normal arguments positive case', () => {
        const board = new Array(16).fill('')
        logic.WINNING_COMBINATIONS[0].forEach((cellIdx) => {
            board[cellIdx] = Player.X
        })
        expect(logic.checkWinner(board, Player.X)).toBe(Player.X)
    })

    test('Bad arguments', () => {
        expect(logic.checkWinner([], Player.X)).toBe(null)
    })

})




