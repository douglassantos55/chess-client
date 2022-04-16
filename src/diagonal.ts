import type { Board, Movement, Square } from "@/types";

export default class implements Movement {
  private defended: Square[];
  private squares: number | undefined;

  constructor(squares?: number) {
    this.defended = [];
    this.squares = squares;
  }

  getCaptureSquares(from: Square, board: Board): Square[][] {
    return [[...this.defended], ...this.getAvailableMoves(from, board)];
  }

  getAvailableMoves(from: Square, board: Board): Square[][] {
    return [
      ...this.getSquaresUp(from, board).filter((squares) => squares.length > 0),
      ...this.getSquaresDown(from, board).filter(
        (squares) => squares.length > 0
      ),
    ];
  }

  getSquaresUp(from: Square, board: Board): Square[][] {
    const squaresLeft = [];
    const squaresRight = [];
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
            squaresLeft.push({ col: left, row: i });
          } else {
            if (pl.color != piece?.color) {
              squaresLeft.push({ col: left, row: i });
            } else {
              this.defended.push({ col: left, row: i });
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
            squaresRight.push({ col: right, row: i });
          } else {
            if (pr.color != piece?.color) {
              squaresRight.push({ col: right, row: i });
            } else {
              this.defended.push({ col: right, row: i });
            }
            doneRight = true;
          }
        }
      }
    }

    return [squaresLeft, squaresRight];
  }

  getSquaresDown(from: Square, board: Board): Square[][] {
    const squaresLeft = [];
    const squaresRight = [];
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
            squaresLeft.push({ col: left, row: i });
          } else {
            if (pl.color != piece?.color) {
              squaresLeft.push({ col: left, row: i });
            } else {
              this.defended.push({ col: left, row: i });
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
            squaresRight.push({ col: right, row: i });
          } else {
            if (pr.color != piece?.color) {
              squaresRight.push({ col: right, row: i });
            } else {
              this.defended.push({ col: right, row: i });
            }
            doneRight = true;
          }
        }
      }
    }

    return [squaresLeft, squaresRight];
  }
}
