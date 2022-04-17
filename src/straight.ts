import type { Board, Movement, Square } from "./types";

export default class implements Movement {
  public defended: Square[];
  private squares: number | undefined;

  constructor(squares?: number) {
    this.defended = [];
    this.squares = squares;
  }

  getCaptureSquares(from: Square, board: Board): Square[][] {
    return [...this.getAvailableMoves(from, board), [...this.defended]];
  }

  getAvailableMoves(from: Square, board: Board): Square[][] {
    this.defended = [];

    return [
      ...this.getVerticalMoves(from, board).filter(
        (squares) => squares.length > 0
      ),
      ...this.getHorizontalMoves(from, board).filter(
        (squares) => squares.length > 0
      ),
    ];
  }

  getVerticalMoves(from: Square, board: Board): Square[][] {
    const up = [];
    const down = [];
    const piece = board[from.row][from.col];
    const upLimit = Math.max(0, this.squares ? from.row - this.squares : 0);

    // up
    for (let i = from.row - 1; i >= upLimit; i--) {
      const p = board[i][from.col];
      if (p == null) {
        up.push({ col: from.col, row: i });
      } else {
        if (p.color != piece?.color) {
          up.push({ col: from.col, row: i });
        } else {
          this.defended.push({ col: from.col, row: i });
        }
        break;
      }
    }

    // down
    const downLimit = Math.min(7, this.squares ? from.row + this.squares : 7);

    for (let i = from.row + 1; i <= downLimit; i++) {
      const p = board[i][from.col];
      if (p == null) {
        down.push({ col: from.col, row: i });
      } else {
        if (p.color != piece?.color) {
          down.push({ col: from.col, row: i });
        } else {
          this.defended.push({ col: from.col, row: i });
        }
        break;
      }
    }

    return [up, down];
  }

  getHorizontalMoves(from: Square, board: Board): Square[][] {
    const left = [];
    const right = [];
    const piece = board[from.row][from.col];
    const source = from.col.charCodeAt(0);

    // left
    const a = "a".charCodeAt(0);
    const leftLimit = Math.max(a, this.squares ? source - this.squares : a);

    for (let c = from.col.charCodeAt(0) - 1; c >= leftLimit; c--) {
      const col = String.fromCharCode(c);
      const p = board[from.row][col];

      if (p == null) {
        left.push({ col, row: from.row });
      } else {
        if (p.color != piece?.color) {
          left.push({ col, row: from.row });
        } else {
          this.defended.push({ col, row: from.row });
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
        right.push({ col, row: from.row });
      } else {
        if (p.color != piece?.color) {
          right.push({ col, row: from.row });
        } else {
          this.defended.push({ col, row: from.row });
        }
        break;
      }
    }

    return [left, right];
  }
}
