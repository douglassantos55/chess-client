import type { Board, Movement, Square } from "./types";

export default class implements Movement {
  private squares: number | undefined = undefined;

  constructor(squares?: number) {
    this.squares = squares;
  }

  getCaptureSquares(from: Square, board: Board): Square[] {
    return this.getAvailableMoves(from, board);
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
    const upLimit = Math.max(0, this.squares ? from.row - this.squares : 0);

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
    const downLimit = Math.min(7, this.squares ? from.row + this.squares : 7);

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
    const source = from.col.charCodeAt(0);

    // left
    const a = "a".charCodeAt(0);
    const leftLimit = Math.max(a, this.squares ? source - this.squares : a);

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
    const h = "h".charCodeAt(0);
    const rightLimit = Math.min(h, this.squares ? source + this.squares : h);

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
