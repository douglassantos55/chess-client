import type Board from "./Board";
import type { Movement, Square } from "./types";

export default class implements Movement {
  public defended: Square[];
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
      ...this.getVerticalMoves(from, board).filter(
        (squares) => squares.length > 0
      ),
      ...this.getHorizontalMoves(from, board).filter(
        (squares) => squares.length > 0
      ),
    ];
  }

  getVerticalMoves(from: Square, board: Board): Square[][] {
    const up = [];
    const down = [];
    const piece = board.piece(from);

    // up
    for (const square of board.up(from, this.squares)) {
      const target = board.piece(square);
      if (target == null) {
        up.push(square);
      } else {
        if (target.color != piece?.color) {
          up.push(square);
        } else {
          this.defended.push(square);
        }
        break;
      }
    }

    // down
    for (const square of board.down(from, this.squares)) {
      const target = board.piece(square);
      if (target == null) {
        down.push(square);
      } else {
        if (target.color != piece?.color) {
          down.push(square);
        } else {
          this.defended.push(square);
        }
        break;
      }
    }

    return [up, down];
  }

  getHorizontalMoves(from: Square, board: Board): Square[][] {
    const left = [];
    const right = [];
    const piece = board.piece(from);

    // left
    for (const square of board.left(from, this.squares)) {
      const target = board.piece(square);

      if (target == null) {
        left.push(square);
      } else {
        if (target.color != piece?.color) {
          left.push(square);
        } else {
          this.defended.push(square);
        }
        break;
      }
    }

    // right
    for (const square of board.right(from, this.squares)) {
      const target = board.piece(square);

      if (target == null) {
        right.push(square);
      } else {
        if (target.color != piece?.color) {
          right.push(square);
        } else {
          this.defended.push(square);
        }
        break;
      }
    }

    return [left, right];
  }
}
