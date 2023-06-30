import { Player } from "../../src/board/model"
import logic from "../../src/board/logic"

describe('CheckWinner multiple board sizes', ()=> {

    test('Normal args X wins', () => {
        const board = [
            'X', 'X', 'O',
            'O', 'X', 'X',
            'O', 'O', 'X'
        ]
        expect(logic.checkWinner(board, 3)).toBe(Player.X)
    })

    test('Normal args inital State', () => {
        const board = [
            '', '', '',
            '', '', '',
            '', '', ''
        ]
        expect(logic.checkWinner(board, 3)).toBe(null)
    })

    test('Normal args tie', () => {
        const board = [
            'O', 'O', 'X',
            'X', 'O', 'O',
            'O', 'X', 'X'
        ]
        expect(logic.checkWinner(board, 3)).toBe(Player.tie)
    })

    test('Normal args O wins', () => {
        const board = [
            'X', 'X', 'O',
            'X', 'O', 'X',
            'O', 'O', 'X'
        ]
        expect(logic.checkWinner(board, 3)).toBe(Player.O)
    })


    test('4x4 Normal Args X wins', () => {
        const board = [
            'X', 'X', 'X', 'X',
            'O', 'O', 'X', 'O',
            'X', 'O', 'O', 'O',
            'O', 'X', 'X', 'O'
        ]

        expect(logic.checkWinner(board, 4)).toBe(Player.X)
    })


    test('4x4 Normal Args X wins', () => {
        const board = [
            'X', 'X', 'X', 'X',
            'O', 'O', 'X', 'O',
            'X', 'O', 'O', 'O',
            'O', 'X', 'X', 'O'
        ]

        expect(logic.checkWinner(board, 4)).toBe(Player.X)
    })
})

