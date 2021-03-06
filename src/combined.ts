import type { Movement, Square } from "@/types";
import type Board from "./Board";

export default class implements Movement {
  private movements: Movement[] = [];

  constructor(...movements: Movement[]) {
    this.movements = movements;
  }

  getCaptureSquares(from: Square, board: Board): Square[][] {
    let available: Square[][] = [];

    this.movements.forEach((movement: Movement) => {
      available = available.concat(
        movement
          .getCaptureSquares(from, board)
          .filter((squares) => squares.length > 0)
      );
    });

    return available;
  }

  getAvailableMoves(from: Square, board: Board): Square[][] {
    let available: Square[][] = [];

    this.movements.forEach((movement: Movement) => {
      available = available.concat(
        movement
          .getAvailableMoves(from, board)
          .filter((squares) => squares.length > 0)
      );
    });

    return available;
  }
}
