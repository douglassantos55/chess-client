import type { Board, Square, Movement } from "@/types";

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
    const piece = board[from.row][from.col];
    const multiplier = piece?.moveCount === 0 ? 2 : 1;

    const moves = [];
    for (let i = 1; i <= multiplier; i++) {
      const dest = from.row + this.direction * i;

      if (dest < 0 || dest >= 8 || board[dest][from.col] != null) {
        break;
      }
      moves.push({ col: from.col, row: dest });
    }
    available.push(moves);

    const captures = this.getCaptureSquares(from, board);
    for (const square of captures.flat()) {
      const target = board[square.row][square.col];
      if (target != null && target.color != piece?.color) {
        available.push([square]);
      }
    }

    return available;
  }

  getCaptureSquares(from: Square, board: Board): Square[][] {
    const available: Square[][] = [];

    const colIdx = from.col.charCodeAt(0);
    const leftColumn = String.fromCharCode(colIdx - 1);
    const rightColumn = String.fromCharCode(colIdx + 1);

    if (from.row > 0 && from.row < 7 && leftColumn >= "a") {
      available.push([{ col: leftColumn, row: from.row + this.direction }]);
    }

    if (from.row > 0 && from.row < 7 && rightColumn <= "h") {
      available.push([{ col: rightColumn, row: from.row + this.direction }]);
    }

    return available;
  }
}
