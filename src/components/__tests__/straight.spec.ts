import { describe, it, expect } from 'vitest'
import Straight from '@/straight'
import { createBoard } from '@/utils'

describe('Straight', () => {
    it('moves horizontally', () => {

    })

    it('moves vertically', () => {
    })

    it('blocks at same color piece', () => {
        const straight = new Straight()
        const result = straight.getAvailableMoves({ col: 'a', row: 0 }, createBoard())

        expect(result).toHaveLength(0)
    })

    it('blocks at opposite color piece', () => {
        const straight = new Straight()

        const board = createBoard()
        board[1]['a'] = null

        const result = straight.getAvailableMoves({ col: 'a', row: 0 }, board)
        expect(result).toHaveLength(6) // from a2 to a7
    })
})
