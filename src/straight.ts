import type { Board, Movement, Square } from "./types";

export default class implements Movement {
  private squares: number | undefined = undefined;

  constructor(squares?: number) {
    this.squares = squares;
  }

  getAvailableMoves(from: Square, board: Board): Square[] {
    const available: Square[] = [];

    return available.concat(
      this.getVerticalMoves(from, board),
      this.getHorizontalMoves(from, board)
    );
  }

  getVerticalMoves(from: Square, board: Board) {
    const available = [];
    const piece = board[from.row][from.col];
    const upLimit = this.squares ? from.row - this.squares : 0;

    // up
    for (let i = from.row - 1; i >= upLimit; i--) {
      const p = board[i][from.col];
      if (p == null) {
        available.push({ col: from.col, row: i });
      } else {
        if (p.color != piece?.color) {
          available.push({ col: from.col, row: i });
        }
        break;
      }
    }

    // down
    const downLimit = this.squares ? from.row + this.squares : 7;

    for (let i = from.row + 1; i <= downLimit; i++) {
      const p = board[i][from.col];
      if (p == null) {
        available.push({ col: from.col, row: i });
      } else {
        if (p.color != piece?.color) {
          available.push({ col: from.col, row: i });
        }
        break;
      }
    }

    return available;
  }

  getHorizontalMoves(from: Square, board: Board): Square[] {
    const available = [];
    const piece = board[from.row][from.col];

    // left
    const leftLimit = this.squares
      ? from.col.charCodeAt(0) - this.squares
      : "a".charCodeAt(0);

    for (let c = from.col.charCodeAt(0) - 1; c >= leftLimit; c--) {
      const col = String.fromCharCode(c);
      const p = board[from.row][col];

      if (p == null) {
        available.push({ col, row: from.row });
      } else {
        if (p.color != piece?.color) {
          available.push({ col, row: from.row });
        }
        break;
      }
    }

    // right
    const rightLimit = this.squares
      ? from.col.charCodeAt(0) + this.squares
      : "h".charCodeAt(0);

    for (let c = from.col.charCodeAt(0) + 1; c <= rightLimit; c++) {
      const col = String.fromCharCode(c);
      const p = board[from.row][col];

      if (p == null) {
        available.push({ col, row: from.row });
      } else {
        if (p.color != piece?.color) {
          available.push({ col, row: from.row });
        }
        break;
      }
    }

    return available;
  }
}
