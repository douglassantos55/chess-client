import type { Board, Movement, Square } from "@/types";

export default class implements Movement {
  getAvailableMoves(from: Square, board: Board): Square[] {
    return [
      ...this.getSquaresTop(from, board),
      ...this.getSquaresDown(from, board),
    ];
  }

  getSquaresTop(from: Square, board: Board): Square[] {
    const available = [];
    const piece = board[from.row][from.col];

    let doneLeft = false;
    let doneRight = false;

    for (let i = from.row + 1; i < 8; i++) {
      if (!doneLeft) {
        const left = String.fromCharCode(
          from.col.charCodeAt(0) - (i - from.row)
        );

        if (left >= "a") {
          const pl = board[i][left];

          if (pl == null) {
            available.push({ col: left, row: i });
          } else {
            if (pl.color != piece?.color) {
              available.push({ col: left, row: i });
            }
            doneLeft = true;
          }
        }
      }

      if (!doneRight) {
        const right = String.fromCharCode(
          from.col.charCodeAt(0) + (i - from.row)
        );

        if (right <= "h") {
          const pr = board[i][right];

          if (pr == null) {
            available.push({ col: right, row: i });
          } else {
            if (pr.color != piece?.color) {
              available.push({ col: right, row: i });
            }
            doneRight = true;
          }
        }
      }
    }

    return available;
  }

  getSquaresDown(from: Square, board: Board): Square[] {
    const available = [];
    const piece = board[from.row][from.col];

    let doneLeft = false;
    let doneRight = false;

    for (let i = from.row - 1; i >= 0; i--) {
      if (!doneLeft) {
        const left = String.fromCharCode(
          from.col.charCodeAt(0) - (from.row - i)
        );

        if (left >= "a") {
          const pl = board[i][left];

          if (pl == null) {
            available.push({ col: left, row: i });
          } else {
            if (pl.color != piece?.color) {
              available.push({ col: left, row: i });
            }
            doneLeft = true;
          }
        }
      }

      if (!doneRight) {
        const right = String.fromCharCode(
          from.col.charCodeAt(0) + (from.row - i)
        );

        if (right <= "h") {
          const pr = board[i][right];

          if (pr == null) {
            available.push({ col: right, row: i });
          } else {
            if (pr.color != piece?.color) {
              available.push({ col: right, row: i });
            }
            doneRight = true;
          }
        }
      }
    }

    return available;
  }
}
