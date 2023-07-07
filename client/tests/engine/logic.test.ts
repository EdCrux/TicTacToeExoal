import { Player } from "../../src/engine/model"
import logic from "../../src/engine/logic"

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


describe('Check getAvailableMoves', () => {
    test('normal arguments', () => {
        const board = [
            '', '',  '',  'X',
            'O', 'O', 'X', 'O',
            'X', 'O', 'O', 'O',
            'O', 'X', 'X', 'O'
        ]
        expect(logic.getAvailableMoves(board)).toStrictEqual([0,1,2])
    })
    test('bad arguments', () => {
        expect(logic.getAvailableMoves([])).toStrictEqual([])
    })
})

describe('Check generateSuccesors', () => {
    test('special arguments', () => {
        expect(logic.generateSuccesors([], Player.O)).toStrictEqual([])
    })
    test('normal arguments', () => {
        expect(logic.generateSuccesors(
            [
                '', '',  '',  'X',
                'O', 'O', 'X', 'O',
                'X', 'O', 'O', 'O',
                'O', 'X', 'X', 'O'
            ], Player.X
        )).toStrictEqual([
            [[
                'X', '',  '',  'X',
                'O', 'O', 'X', 'O',
                'X', 'O', 'O', 'O',
                'O', 'X', 'X', 'O'
            ], 0], 
            [[ 
                '',  'X', '',  'X',
                'O', 'O', 'X', 'O',
                'X', 'O', 'O', 'O',
                'O', 'X', 'X', 'O'
            ], 1], 
            [[
                '',  '',  'X', 'X',
                'O', 'O', 'X', 'O',
                'X', 'O', 'O', 'O',
                'O', 'X', 'X', 'O'
            ], 2]
        ])
    })
})


describe('Check aiMove', () => {
    test('Normal arguments, blocks the posible winner', () => {
        const board = [
            'X', 'O', 'O', '',
            '',  'X', '',  '',
            '',  '',  'X', '',
            '',  '',  '',  ''
        ]
        const { idx } = logic.aiMove(board, Player.O)
        expect(idx).toBe(15)
    })
    test('Normal arguments, blocks the posible winner', () => {
        const board = [
            'X', 'O', 'O', '',
            'X',  '', '',  '',
            'X',  '',  '', '',
            '',  '',  '',  ''
        ]
        const { idx } = logic.aiMove(board, Player.O)
        expect(idx).toBe(12)
    })
})

