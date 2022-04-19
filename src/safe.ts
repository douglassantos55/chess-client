import type { Movement, Square } from "@/types";
import type Board from "./Board";

export default class implements Movement {
  private movement: Movement;

  constructor(movement: Movement) {
    this.movement = movement;
  }

  getCaptureSquares(from: Square, board: Board): Square[][] {
    return this.movement.getCaptureSquares(from, board);
  }

  getAvailableMoves(from: Square, board: Board): Square[][] {
    let available = this.movement.getAvailableMoves(from, board);
    const piece = board.piece(from);

    if (piece) {
      available = available.filter((squares: Square[]) => {
        for (const square of squares) {
          const threats = board.getThreatsAgainst(square, piece.color, [from]);
          return threats.length === 0;
        }
      });
    }

    return available;
  }
}
