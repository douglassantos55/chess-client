import type { Square, Movement } from "@/types";
import type Board from "./Board";

export enum Direction {
  Up = 1,
  Down = -1,
}

export default class implements Movement {
  private direction: Direction;

  constructor(distance: Direction) {
    this.direction = distance;
  }

  getAvailableMoves(from: Square, board: Board): Square[][] {
    const available: Square[][] = [];
    const piece = board.piece(from);
    const multiplier = piece?.moveCount === 0 ? 2 : 1;

    const moves = [];

    const range =
      this.direction == Direction.Up
        ? board.up(from, multiplier)
        : board.down(from, multiplier);

    for (const square of range) {
      if (board.piece(square) != null) {
        break;
      }
      moves.push(square);
    }

    available.push(moves);

    const captures = this.getCaptureSquares(from, board);
    for (const square of captures.flat()) {
      const target = board.piece(square);
      if (target != null && target.color != piece?.color) {
        available.push([square]);
      }
    }

    return available;
  }

  getCaptureSquares(from: Square, board: Board): Square[][] {
    const available: Square[] = [];
    const source = board.offset(from, 0, this.direction);

    if (source) {
      const right = board.offset(source, 1, 0);
      if (right) {
        available.push(right);
      }
      const left = board.offset(source, -1, 0);
      if (left) {
        available.push(left);
      }
    }

    return [available];
  }
}
