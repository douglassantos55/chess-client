import type { Board, Square, Movement } from "@/types";

export enum Direction {
  Up = 1,
  Down = -1,
}

export default class implements Movement {
  private direction: Direction;
  private initialSquare: Square;

  constructor(distance: Direction, initialSquare: Square) {
    this.direction = distance;
    this.initialSquare = initialSquare;
  }

  isOrigin(from: Square): boolean {
    const sameColumn = from.col == this.initialSquare.col;
    const sameRow = from.row == this.initialSquare.row;

    return sameColumn && sameRow;
  }

  getAvailableMoves(from: Square, board: Board): Square[] {
    const available: Square[] = [];
    const piece = board[from.row][from.col];
    const multiplier = this.isOrigin(from) ? 2 : 1;

    for (let i = 1; i <= multiplier; i++) {
      const dest = from.row + this.direction * i;

      if (board[dest][from.col] == null) {
        available.push({ col: from.col, row: dest });
      }
    }

    const captures = this.getCaptureSquares(from, board);
    for (const square of captures) {
      const target = board[square.row][square.col];
      if (target != null && target.color != piece?.color) {
        available.push(square);
      }
    }

    return available;
  }

  getCaptureSquares(from: Square, board: Board): Square[] {
    const available: Square[] = [];

    const colIdx = from.col.charCodeAt(0);
    const leftColumn = String.fromCharCode(colIdx - 1);
    const rightColumn = String.fromCharCode(colIdx + 1);

    if (leftColumn >= "a") {
      available.push({ col: leftColumn, row: from.row + this.direction });
    }

    if (rightColumn <= "h") {
      available.push({ col: rightColumn, row: from.row + this.direction });
    }

    return available;
  }
}
