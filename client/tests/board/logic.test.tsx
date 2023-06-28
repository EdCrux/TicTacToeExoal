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

describe('evaluateState', ()=> {

    test('Bad arguments', () => {
        expect(logic.evaluateState([])).toBe(0)
    })

    test('Normal arguments, negative case', () => {

        const board = [
            'X', '',  '', '',  
            'X', 'O', '', '',  
            'X', '',  '', '', 
            'O', '',  '', ''
        ]
        expect(logic.evaluateState(board)).toBe(0)

    })

    test('Normal arguments, X wins. case', () => {

        const board = [
            '', '',  '', 'X',  
            '', 'O', 'X', '',  
            '', 'X',  '', '', 
            'X', '',  '', ''
        ]
        expect(logic.evaluateState(board)).toBe(100)

    })

    test('Normal arguments, tie case.', () => {

        const board = [
            'O', 'O',  'X', 'X',  
            'X', 'O',  'X', 'O',  
            'O', 'X',  'O', 'X', 
            'O', 'X',  'O', 'X'
        ]
        expect(logic.evaluateState(board)).toBe(0)

    })
})



