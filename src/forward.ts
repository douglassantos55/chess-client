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
    const multiplier = this.isOrigin(from) ? 2 : 1;

    for (let i = 1; i <= multiplier; i++) {
      const dest = from.row + this.direction * i;

      if (board[dest][from.col] == null) {
        available.push({ col: from.col, row: dest });
      }
    }

    return [...available, ...this.getCaptureSquares(from, board)];
  }

  getCaptureSquares(from: Square, board: Board): Square[] {
    const available: Square[] = [];
    const piece = board[from.row][from.col];

    const colIdx = from.col.charCodeAt(0);
    const leftColumn = String.fromCharCode(colIdx - 1);
    const rightColumn = String.fromCharCode(colIdx + 1);

    if (leftColumn >= "a") {
      const left = board[from.row + this.direction][leftColumn];
      if (left != null && left.color != piece?.color) {
        available.push({ col: leftColumn, row: from.row + this.direction });
      }
    }

    if (rightColumn <= "h") {
      const right = board[from.row + this.direction][rightColumn];
      if (right != null && right.color != piece?.color) {
        available.push({ col: rightColumn, row: from.row + this.direction });
      }
    }

    return available;
  }
}
