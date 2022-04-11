import { expect, describe, it } from 'vitest'
import Forward, { Direction } from '@/forward'
import { createBoard } from '@/utils'

describe('Forward', () => {
    it('moves forward', () => {
        const forward = new Forward(Direction.Up)
        const result = forward.getAvailableMoves({ col: 'e', row: 1 }, createBoard())

        expect(result).toEqual([ { col: 'e', row: 2 }, { col: 'e', row: 3 } ])
    })

    it('moves backwards', () => {
        const forward = new Forward(Direction.Down)
        const result = forward.getAvailableMoves({ col: 'e', row: 6 }, createBoard())

        expect(result).toEqual([ { col: 'e', row: 5 }, { col: 'e', row: 4 } ])
    })
})