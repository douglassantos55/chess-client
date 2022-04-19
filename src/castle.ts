import { watch } from "vue";
import type { WatchStopHandle } from "vue";
import type { Movement, Piece, Square } from "@/types";
import { parseSquare } from "./utils";
import type Board from "./Board";

export default class implements Movement {
  private origin: Square;
  private unwatch: null | WatchStopHandle;

  constructor(origin: Square) {
    this.unwatch = null;
    this.origin = origin;
  }

  getCaptureSquares(): Square[][] {
    return [];
  }

  swapPieces(board: Board) {
    const { row } = this.origin;

    const short = board.offset(this.origin, 2, 0);
    if (short) {
      const piece = board.piece(short);
      if (piece?.notation === "K" && piece.moveCount === 1) {
        const rook = board.piece({ col: "h", row });
        if (rook && rook.notation === "R" && rook.moveCount === 0) {
          board.move(
            parseSquare({ col: "h", row }),
            parseSquare({ col: "f", row })
          );
          this.unwatch && this.unwatch();
        }
      }
    }

    const long = board.offset(this.origin, -2, 0);
    if (long) {
      const piece = board.piece(long);
      if (piece?.notation === "K" && piece.moveCount === 1) {
        const rook = board.piece({ col: "a", row });
        if (rook && rook.notation === "R" && rook.moveCount === 0) {
          board.move(
            parseSquare({ col: "a", row }),
            parseSquare({ col: "d", row })
          );
          this.unwatch && this.unwatch();
        }
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
    const piece = board.piece(from) as Piece;
    const inCheck = board.getThreatsAgainst(from, piece.color);

    if (inCheck.length === 0) {
      if (piece.moveCount === 0) {
        for (const square of board.left(this.origin)) {
          const threats = board.getThreatsAgainst(square, piece.color);
          if (threats.length > 0) {
            break;
          }

          const target = board.piece(square);
          if (target !== null) {
            if (square.col != "a") {
              break;
            }
            if (target.notation === "R" && target.moveCount === 0) {
              available.push([board.offset(this.origin, -2, 0) as Square]);
            }
          }
        }

        for (const square of board.right(this.origin)) {
          const threats = board.getThreatsAgainst(square, piece.color);
          if (threats.length > 0) {
            break;
          }

          const target = board.piece(square);
          if (target !== null) {
            if (square.col != "h") {
              break;
            }
            if (target.notation === "R" && target.moveCount === 0) {
              available.push([board.offset(this.origin, 2, 0) as Square]);
            }
          }
        }
      }
    }

    return available;
  }
}
