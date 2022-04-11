import type { Board, Movement, Square } from "./types";

export default class implements Movement {
    getAvailableMoves(from: Square, board: Board): Square[] {
        const available = []
        const piece = board[from.row][from.col]

        for (let r = 0; r < 8; r++) {
            const p = board[r][from.col]

            if (p == null) {
                available.push({ col: from.col, row: r })
            } else if (r != from.row) {
                if (p.color != piece?.color) {
                    available.push({ col: from.col, row: r })
                }
                break
            }
        }

        for (let c = 'a'.charCodeAt(0); c <= 'h'.charCodeAt(0); c++) {
            const col = String.fromCharCode(c)
            const p = board[from.row][col]

            if (p == null) {
                available.push({ col, row: from.row })
            } else if (col != from.col) {
                if (p.color != piece?.color) {
                    available.push({ col, row: from.row })
                }
                break
            }
        }

        return available
    }
}
