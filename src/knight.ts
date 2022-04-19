import type Board from "./Board";
import type { Movement, Square } from "./types";

export default class implements Movement {
  private defended: Square[] = [];

  getCaptureSquares(from: Square, board: Board): Square[][] {
    return [...this.getAvailableMoves(from, board), [...this.defended]];
  }

  getAvailableMoves(from: Square, board: Board): Square[][] {
    this.defended = [];

    const available = [];
    const piece = board.piece(from);

    for (let i = 2; i >= -2; i -= 4) {
      const squares = [
        board.offset(from, -1, i),
        board.offset(from, 1, i),
        board.offset(from, i, 1),
        board.offset(from, i, -1),
      ];

      for (const square of squares) {
        if (square) {
          const l = board.piece(square);
          if (l == null || l.color != piece?.color) {
            available.push([square]);
          } else if (l.color === piece?.color) {
            this.defended.push(square);
          }
        }
      }
    }

    return available;
  }
}
