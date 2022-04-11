import type { Board, Square, Movement } from "@/types";

export enum Direction {
    Up = 1,
    Down = -1,
}

export default class implements Movement {
    private direction: Direction
    private firstMove: boolean

    constructor(distance: Direction) {
        this.firstMove = true
        this.direction = distance
    }

    getAvailableMoves(from: Square, board: Board): Square[] {
        const available: Square[] = []
        const multiplier = (this.firstMove ? 2 : 1)

        for (let i = 1; i <= multiplier; i++) {
            const dest = from.row + this.direction * i

            if (board[dest][from.col] == null) {
                available.push({ col: from.col, row: dest })
            }
        }

        return available
    }
}
