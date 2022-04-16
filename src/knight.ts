import type { Board, Movement, Square } from "./types";

export default class implements Movement {
  getCaptureSquares(from: Square, board: Board): Square[][] {
    return this.getAvailableMoves(from, board);
  }

  getAvailableMoves(from: Square, board: Board): Square[][] {
    const available = [];
    const piece = board[from.row][from.col];
    const colIdx = from.col.charCodeAt(0);

    for (let i = from.row + 2; i >= from.row - 2; i -= 4) {
      if (i < 0 || i >= 8) {
        continue;
      }
      const left = String.fromCharCode(colIdx - 1);
      const right = String.fromCharCode(colIdx + 1);

      if (left >= "a") {
        const l = board[i][left];
        if (l == null || l.color != piece?.color) {
          available.push([{ col: left, row: i }]);
        }
      }

      if (right <= "h") {
        const r = board[i][right];
        if (r == null || r.color != piece?.color) {
          available.push([{ col: right, row: i }]);
        }
      }
    }

    for (let i = colIdx + 2; i >= colIdx - 2; i -= 4) {
      if (i < "a".charCodeAt(0) || i > "h".charCodeAt(0)) {
        continue;
      }
      const up = from.row + 1;
      const down = from.row - 1;

      if (up < 8) {
        const u = board[up][String.fromCharCode(i)];
        if (u == null || u.color != piece?.color) {
          available.push([{ col: String.fromCharCode(i), row: up }]);
        }
      }

      if (down >= 0) {
        const d = board[down][String.fromCharCode(i)];
        if (d == null || d.color != piece?.color) {
          available.push([{ col: String.fromCharCode(i), row: down }]);
        }
      }
    }

    return available;
  }
}
