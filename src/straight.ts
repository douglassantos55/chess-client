import type { Board, Movement, Square } from "./types";

export default class implements Movement {
    getAvailableMoves(from: Square, board: Board): Square[] {
        let available: Square[] = []

        available = [...available, ...this.getVerticalMoves(from, board)]
        available = [...available, ...this.getHorizontalMoves(from, board)]

        return available
    }

    getVerticalMoves(from: Square, board: Board) {
        const available = []
        const piece = board[from.row][from.col]

        // up
        for (let i = from.row - 1; i >= 0; i--) {
            const p = board[i][from.col]
            if (p == null) {
                available.push({ col: from.col, row: i })
            } else {
                if (p.color != piece?.color) {
                    available.push({ col: from.col, row: i })
                }
                break
            }
        }

        // down
        for (let i = from.row + 1; i < 8; i++) {
            const p = board[i][from.col]
            if (p == null) {
                available.push({ col: from.col, row: i })
            } else {
                if (p.color != piece?.color) {
                    available.push({ col: from.col, row: i })
                }
                break
            }
        }

        return available
    }

    getHorizontalMoves(from: Square, board: Board): Square[] {
        const available = []
        const piece = board[from.row][from.col]

        // left
        for (let c = from.col.charCodeAt(0) - 1; c >= 'a'.charCodeAt(0); c--) {
            const col = String.fromCharCode(c)
            const p = board[from.row][col]

            if (p == null) {
                available.push({ col, row: from.row })
            } else {
                if (p.color != piece?.color) {
                    available.push({ col, row: from.row })
                }
                break
            }
        }

        // right
        for (let c = from.col.charCodeAt(0) + 1; c <= 'h'.charCodeAt(0); c++) {
            const col = String.fromCharCode(c)
            const p = board[from.row][col]

            if (p == null) {
                available.push({ col, row: from.row })
            } else {
                if (p.color != piece?.color) {
                    available.push({ col, row: from.row })
                }
                break
            }
        }

        return available
    }
}
