import type { Movement, Square } from "@/types";
import type Board from "./Board";

export default class implements Movement {
  private defended: Square[];
  private squares: number | undefined;

  constructor(squares?: number) {
    this.defended = [];
    this.squares = squares;
  }

  getCaptureSquares(from: Square, board: Board): Square[][] {
    return [...this.getAvailableMoves(from, board), [...this.defended]];
  }

  getAvailableMoves(from: Square, board: Board): Square[][] {
    this.defended = [];

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
    const piece = board.piece(from);

    let doneLeft = false;
    let doneRight = false;

    const limit = Math.min(7, this.squares ? from.row + this.squares : 7);

    for (let i = from.row + 1; i <= limit; i++) {
      const offset = i - from.row;

      if (!doneLeft) {
        const left = board.offset(from, -offset, offset);
        if (left) {
          const target = board.piece(left);
          if (target == null) {
            squaresLeft.push(left);
          } else {
            if (target.color != piece?.color) {
              squaresLeft.push(left);
            } else {
              this.defended.push(left);
            }
            doneLeft = true;
          }
        }
      }

      if (!doneRight) {
        const right = board.offset(from, offset, offset);
        if (right) {
          const target = board.piece(right);
          if (target == null) {
            squaresRight.push(right);
          } else {
            if (target.color != piece?.color) {
              squaresRight.push(right);
            } else {
              this.defended.push(right);
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
    const piece = board.piece(from);

    let doneLeft = false;
    let doneRight = false;

    const limit = Math.max(0, this.squares ? from.row - this.squares : 0);

    for (let i = from.row - 1; i >= limit; i--) {
      const offset = from.row - i;

      if (!doneLeft) {
        const left = board.offset(from, -offset, -offset);
        if (left) {
          const target = board.piece(left);
          if (target == null) {
            squaresLeft.push(left);
          } else {
            if (target.color != piece?.color) {
              squaresLeft.push(left);
            } else {
              this.defended.push(left);
            }

            doneLeft = true;
          }
        }
      }

      if (!doneRight) {
        const right = board.offset(from, offset, -offset);
        if (right) {
          const target = board.piece(right);
          if (target == null) {
            squaresRight.push(right);
          } else {
            if (target.color != piece?.color) {
              squaresRight.push(right);
            } else {
              this.defended.push(right);
            }
            doneRight = true;
          }
        }
      }
    }

    return [squaresLeft, squaresRight];
  }
}
