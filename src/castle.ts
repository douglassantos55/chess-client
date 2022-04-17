import { watch } from "vue";
import type { WatchStopHandle } from "vue";
import type { Board, Color, Movement, Piece, Row, Square } from "@/types";

export default class implements Movement {
  private origin: Square;
  private unwatch: null | WatchStopHandle;

  constructor(origin: Square) {
    this.unwatch = null;
    this.origin = origin;
  }

  getCaptureSquares(_from: Square, _board: Board): Square[][] {
    return [];
  }

  swapPieces(board: Board) {
    const { row, col } = this.origin;
    const colIdx = col.charCodeAt(0);

    const short = board[row][String.fromCharCode(colIdx + 2)];
    if (short?.notation === "K" && short.moveCount === 1) {
      if (
        board[row]["h"]?.notation === "R" &&
        board[row]["h"]?.moveCount === 0
      ) {
        board[row]["f"] = board[row]["h"];
        board[row]["h"] = null;

        this.unwatch && this.unwatch();
      }
    }

    const long = board[row][String.fromCharCode(colIdx - 2)];
    if (long?.notation === "K" && long?.moveCount === 1) {
      if (
        board[row]["a"]?.notation === "R" &&
        board[row]["a"]?.moveCount === 0
      ) {
        board[row]["d"] = board[row]["a"];
        board[row]["a"] = null;

        this.unwatch && this.unwatch();
      }
    }
  }

  getAvailableMoves(from: Square, board: Board): Square[][] {
    if (this.unwatch === null) {
      this.unwatch = watch(() => board, this.swapPieces.bind(this), {
        deep: true,
      });
    }

    const available: Square[][] = [];
    const piece = board[from.row][from.col] as Piece;
    const enemies = this.findEnemies(piece.color, board);
    const colIdx = this.origin.col.charCodeAt(0);

    let isThreatenedLong = false;
    let isThreatenedShort = false;

    for (const enemy of enemies) {
      const moves = enemy.movement.getCaptureSquares(
        enemy.position as Square,
        board
      );

      for (const sqr of moves.flat()) {
        if (sqr.col == this.origin.col && sqr.row == this.origin.row) {
          return available;
        }

        if (
          (sqr.col == String.fromCharCode(colIdx - 1) &&
            sqr.row == this.origin.row) ||
          (sqr.col == String.fromCharCode(colIdx - 2) &&
            sqr.row == this.origin.row)
        ) {
          isThreatenedLong = true;
        }
        if (
          (sqr.col == String.fromCharCode(colIdx + 1) &&
            sqr.row == this.origin.row) ||
          (sqr.col == String.fromCharCode(colIdx + 1) &&
            sqr.row == this.origin.row)
        ) {
          isThreatenedShort = true;
        }
      }
    }

    if (piece.moveCount === 0) {
      if (!isThreatenedLong) {
        for (let i = colIdx - 1; i >= "a".charCodeAt(0); i--) {
          const target = board[this.origin.row][String.fromCharCode(i)];

          if (target != null) {
            if (i != "a".charCodeAt(0)) {
              break;
            }

            if (target?.moveCount === 0) {
              available.push([
                { row: this.origin.row, col: String.fromCharCode(i + 2) },
              ]);
            }
          }
        }
      }

      if (!isThreatenedShort) {
        for (let i = colIdx + 1; i <= "h".charCodeAt(0); i++) {
          const target = board[this.origin.row][String.fromCharCode(i)];

          if (target != null) {
            if (i != "h".charCodeAt(0)) {
              break;
            }

            if (target?.moveCount === 0) {
              available.push([
                { row: this.origin.row, col: String.fromCharCode(i - 1) },
              ]);
            }
          }
        }
      }
    }

    return available;
  }

  findEnemies(color: Color, board: Board): Piece[] {
    const enemies: Piece[] = [];

    board.forEach((row: Row, i: number) => {
      for (const col in row) {
        const target = row[col];
        if (target && target.color != color) {
          enemies.push({ ...target, position: { col, row: i } });
        }
      }
    });

    return enemies;
  }
}
