import type { Color, Piece, Row, Square } from "./types";
import { parseNotation, validateSquare } from "./utils";

export default class {
  private matrix: Row[];

  constructor(matrix: Row[]) {
    this.matrix = matrix;
  }

  squares(): Row[] {
    return this.matrix;
  }

  piece(square: Square): Piece | null {
    return this.matrix[square.row][square.col];
  }

  set(square: Square, piece: Piece) {
    this.matrix[square.row][square.col] = piece;
  }

  offset(source: Square, x: number, y: number): Square | null {
    const col = source.col.charCodeAt(0);
    const square = { col: String.fromCharCode(col + x), row: source.row + y };

    if (!validateSquare(square)) {
      return null;
    }
    return square;
  }

  up(source: Square, squares?: number): Square[] {
    const result = [];
    for (let i = 1; i <= (squares || 7); i++) {
      const square = this.offset(source, 0, i);
      square && result.push(square);
    }
    return result;
  }

  down(source: Square, squares?: number): Square[] {
    const result = [];
    for (let i = 1; i <= (squares || 7); i++) {
      const square = this.offset(source, 0, -i);
      square && result.push(square);
    }
    return result;
  }

  left(source: Square, squares?: number): Square[] {
    const result = [];
    for (let i = 1; i <= (squares || 7); i++) {
      const square = this.offset(source, -i, 0);
      square && result.push(square);
    }
    return result;
  }

  right(source: Square, squares?: number): Square[] {
    const result = [];
    for (let i = 1; i <= (squares || 7); i++) {
      const square = this.offset(source, i, 0);
      square && result.push(square);
    }
    return result;
  }

  move(from: string, to: string): Piece | null {
    const fromSqr = parseNotation(from);
    const toSqr = parseNotation(to);

    if (fromSqr && toSqr) {
      const piece = this.matrix[fromSqr.row][fromSqr.col];
      const captured = this.matrix[toSqr.row][toSqr.col];

      if (piece) {
        piece.moveCount++;

        this.matrix[toSqr.row][toSqr.col] = piece;
        this.matrix[fromSqr.row][fromSqr.col] = null;

        return captured;
      }
    }

    return null;
  }

  find(notation: string, color: Color): Square | null {
    for (const r in this.matrix) {
      const row = parseInt(r);
      for (const col in this.matrix[row]) {
        const piece = this.matrix[row][col];
        if (piece && piece.notation === notation && piece.color === color) {
          return { col, row };
        }
      }
    }
    return null;
  }

  getThreatsAgainst(target: Square, color: Color, through: Square[] = []) {
    const threats: Square[] = [];
    const original: Row[] = [];

    for (const square of through) {
      if (!original[square.row]) {
        original[square.row] = {};
      }
      original[square.row][square.col] = this.matrix[square.row][square.col];
      this.matrix[square.row][square.col] = null;
    }

    for (const r in this.matrix) {
      const row = parseInt(r);
      for (const col in this.matrix[row]) {
        const piece = this.matrix[row][col];
        if (!piece || piece.color === color) {
          continue;
        }

        const captures = piece.movement.getCaptureSquares({ row, col }, this);
        captures.forEach((squares: Square[]) => {
          const found = squares.find((square: Square) => {
            return square.col === target.col && square.row === target.row;
          });

          if (found) {
            threats.push({ col, row }, ...squares);
          }
        });
      }
    }

    for (const square of through) {
      this.matrix[square.row][square.col] = original[square.row][square.col];
    }

    return threats;
  }
}
