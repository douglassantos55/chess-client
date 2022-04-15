import type { Movement, Board, Square, Row, Piece, Color } from "@/types";

export default class implements Movement {
  private movement: Movement;

  constructor(movement: Movement) {
    this.movement = movement;
  }

  getCaptureSquares(from: Square, board: Board): Square[] {
    return this.movement.getCaptureSquares(from, board);
  }

  getAvailableMoves(from: Square, board: Board): Square[] {
    const available = this.movement.getAvailableMoves(from, board);
    const piece = board[from.row][from.col] as Piece;
    const enemies = this.findEnemies(piece.color, board);

    return available.filter((square: Square) => {
      for (const enemy of enemies) {
        const moves = enemy.movement.getCaptureSquares(
          enemy.position as Square,
          board
        );
        const isThreatened = moves.find((sqr: Square) => {
          return sqr.col == square.col && sqr.row == square.row;
        });

        if (isThreatened) {
          return false;
        }
      }
      return true;
    });
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
