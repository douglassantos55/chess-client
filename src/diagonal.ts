import type { Board, Movement, Square } from "@/types";

export default class implements Movement {
  private squares: number | undefined;

  constructor(squares?: number) {
    this.squares = squares;
  }

  getAvailableMoves(from: Square, board: Board): Square[] {
    return [
      ...this.getSquaresUp(from, board),
      ...this.getSquaresDown(from, board),
    ];
  }

  getSquaresUp(from: Square, board: Board): Square[] {
    const available = [];
    const piece = board[from.row][from.col];

    let doneLeft = false;
    let doneRight = false;

    const limit = Math.min(7, this.squares ? from.row + this.squares : 7);

    for (let i = from.row + 1; i <= limit; i++) {
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

    const limit = Math.max(0, this.squares ? from.row - this.squares : 0);

    for (let i = from.row - 1; i >= limit; i--) {
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
