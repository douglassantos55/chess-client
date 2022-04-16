import type { Board, Movement, Square } from "@/types";

export default class implements Movement {
  private movements: Movement[] = [];

  constructor(...movements: Movement[]) {
    this.movements = movements;
  }

  getCaptureSquares(from: Square, board: Board): Square[][] {
    let available: Square[][] = [];

    this.movements.forEach((movement: Movement) => {
      available = available.concat(movement.getCaptureSquares(from, board));
    });

    return available;
  }

  getAvailableMoves(from: Square, board: Board): Square[][] {
    let available: Square[][] = [];

    this.movements.forEach((movement: Movement) => {
      available = available.concat(movement.getAvailableMoves(from, board));
    });

    return available;
  }
}
