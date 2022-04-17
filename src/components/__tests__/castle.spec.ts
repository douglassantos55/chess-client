import { expect, it, describe } from "vitest";
import Safe from "@/safe";
import Castle from "@/castle";
import Straight from "@/straight";
import Diagonal from "@/diagonal";
import Combined from "@/combined";
import { createBoard } from "@/utils";
import type { Piece } from "@/types";
import { ref } from "vue";
import { nextTick } from "process";

describe("Castle", () => {
  it("displays white's available squares on the right", () => {
    const board = createBoard();

    board[0]["f"] = null;
    board[0]["g"] = null;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 0 })
    );

    const result = castle.getAvailableMoves({ col: "e", row: 0 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "f", row: 0 }]);
    expect(result).toContainEqual([{ col: "g", row: 0 }]);
  });

  it("displays white's available squares on the left", () => {
    const board = createBoard();

    board[0]["c"] = null;
    board[0]["d"] = null;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 0 })
    );
    let result = castle.getAvailableMoves({ col: "e", row: 0 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(1);
    expect(result).toContainEqual([{ col: "d", row: 0 }]);

    board[0]["b"] = null;
    result = castle.getAvailableMoves({ col: "e", row: 0 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "d", row: 0 }]);
    expect(result).toContainEqual([{ col: "c", row: 0 }]);
  });

  it("displays white's available squares on both sides", () => {
    const board = createBoard();

    board[0]["b"] = null;
    board[0]["c"] = null;
    board[0]["d"] = null;

    board[0]["f"] = null;
    board[0]["g"] = null;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 0 })
    );
    const result = castle.getAvailableMoves({ col: "e", row: 0 }, board);

    expect(result).toHaveLength(4);
    expect(result.flat()).toHaveLength(4);

    expect(result).toContainEqual([{ col: "d", row: 0 }]);
    expect(result).toContainEqual([{ col: "c", row: 0 }]);

    expect(result).toContainEqual([{ col: "f", row: 0 }]);
    expect(result).toContainEqual([{ col: "g", row: 0 }]);
  });

  it("cannot castle if white's king moved", () => {
    const board = createBoard();

    board[0]["b"] = null;
    board[0]["c"] = null;
    board[0]["d"] = null;

    board[0]["f"] = null;
    board[0]["g"] = null;

    const king = board[0]["e"] as Piece;
    king.moveCount = 1;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 0 })
    );
    const result = castle.getAvailableMoves({ col: "e", row: 0 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "d", row: 0 }]);
    expect(result).toContainEqual([{ col: "f", row: 0 }]);
  });

  it("cannot castle if white's rooks moved", () => {
    const board = createBoard();

    board[0]["b"] = null;
    board[0]["c"] = null;
    board[0]["d"] = null;

    board[0]["f"] = null;
    board[0]["g"] = null;

    const aRook = board[0]["h"] as Piece;
    const hRook = board[0]["a"] as Piece;

    aRook.moveCount = 1;
    hRook.moveCount = 1;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 0 })
    );
    const result = castle.getAvailableMoves({ col: "e", row: 0 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "d", row: 0 }]);
    expect(result).toContainEqual([{ col: "f", row: 0 }]);
  });

  it("swaps white's king and rook on the right", () => {
    const board = ref(createBoard());

    board.value[0]["f"] = null;
    board.value[0]["g"] = null;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 0 })
    );

    castle.getAvailableMoves({ col: "e", row: 0 }, board.value);

    const king = board.value[0]["e"] as Piece;
    king.moveCount = 1;

    board.value[0]["g"] = king;
    board.value[0]["e"] = null;

    nextTick(() => {
      expect(board.value[0]["f"]).toContain({ notation: "R", color: "white" });
      expect(board.value[0]["h"]).toBe(null);

      expect(board.value[0]["g"]).toContain({ notation: "K", color: "white" });
      expect(board.value[0]["e"]).toBe(null);
    });
  });

  it("swaps white's king and rook on the left", () => {
    const board = ref(createBoard());

    board.value[0]["b"] = null;
    board.value[0]["c"] = null;
    board.value[0]["d"] = null;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 0 })
    );

    castle.getAvailableMoves({ col: "e", row: 0 }, board.value);

    const king = board.value[0]["e"] as Piece;
    king.moveCount = 1;

    board.value[0]["c"] = king;
    board.value[0]["e"] = null;

    nextTick(() => {
      expect(board.value[0]["d"]).toContain({ notation: "R", color: "white" });
      expect(board.value[0]["a"]).toBe(null);

      expect(board.value[0]["c"]).toContain({ notation: "K", color: "white" });
      expect(board.value[0]["e"]).toBe(null);
    });
  });

  it("displays black's available squares on the right", () => {
    const board = createBoard();

    board[7]["f"] = null;
    board[7]["g"] = null;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 7 })
    );

    const result = castle.getAvailableMoves({ col: "e", row: 7 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "f", row: 7 }]);
    expect(result).toContainEqual([{ col: "g", row: 7 }]);
  });

  it("displays black's available squares on the left", () => {
    const board = createBoard();

    board[7]["c"] = null;
    board[7]["d"] = null;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 7 })
    );
    let result = castle.getAvailableMoves({ col: "e", row: 7 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(1);
    expect(result).toContainEqual([{ col: "d", row: 7 }]);

    board[7]["b"] = null;
    result = castle.getAvailableMoves({ col: "e", row: 7 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "d", row: 7 }]);
    expect(result).toContainEqual([{ col: "c", row: 7 }]);
  });

  it("displays black's available squares on both sides", () => {
    const board = createBoard();

    board[7]["b"] = null;
    board[7]["c"] = null;
    board[7]["d"] = null;

    board[7]["f"] = null;
    board[7]["g"] = null;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 7 })
    );
    const result = castle.getAvailableMoves({ col: "e", row: 7 }, board);

    expect(result).toHaveLength(4);
    expect(result.flat()).toHaveLength(4);

    expect(result).toContainEqual([{ col: "d", row: 7 }]);
    expect(result).toContainEqual([{ col: "c", row: 7 }]);

    expect(result).toContainEqual([{ col: "f", row: 7 }]);
    expect(result).toContainEqual([{ col: "g", row: 7 }]);
  });

  it("cannot castle if black's king moved", () => {
    const board = createBoard();

    board[7]["f"] = null;
    board[7]["g"] = null;

    const king = board[7]["e"] as Piece;
    king.moveCount = 1;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 7 })
    );
    const result = castle.getAvailableMoves({ col: "e", row: 7 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(1);
    expect(result).toContainEqual([{ col: "f", row: 7 }]);
  });

  it("cannot castle if black's rooks moved", () => {
    const board = createBoard();

    board[7]["b"] = null;
    board[7]["c"] = null;
    board[7]["d"] = null;

    board[7]["f"] = null;
    board[7]["g"] = null;

    const aRook = board[7]["h"] as Piece;
    const hRook = board[7]["a"] as Piece;

    aRook.moveCount = 1;
    hRook.moveCount = 1;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 7 })
    );
    const result = castle.getAvailableMoves({ col: "e", row: 7 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "d", row: 7 }]);
    expect(result).toContainEqual([{ col: "f", row: 7 }]);
  });

  it("swaps black's king and rook on the right", () => {
    const board = ref(createBoard());

    board.value[7]["f"] = null;
    board.value[7]["g"] = null;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 7 })
    );

    castle.getAvailableMoves({ col: "e", row: 7 }, board.value);

    const king = board.value[7]["e"] as Piece;
    king.moveCount = 1;

    board.value[7]["g"] = king;
    board.value[7]["e"] = null;

    nextTick(() => {
      expect(board.value[7]["f"]).toContain({ notation: "R", color: "black" });
      expect(board.value[7]["h"]).toBe(null);

      expect(board.value[7]["g"]).toContain({ notation: "K", color: "black" });
      expect(board.value[7]["e"]).toBe(null);
    });
  });

  it("swaps black's king and rook on the left", () => {
    const board = ref(createBoard());

    board.value[7]["b"] = null;
    board.value[7]["c"] = null;
    board.value[7]["d"] = null;

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 7 })
    );

    castle.getAvailableMoves({ col: "e", row: 7 }, board.value);

    const king = board.value[7]["e"] as Piece;
    king.moveCount = 1;

    board.value[7]["c"] = king;
    board.value[7]["e"] = null;

    nextTick(() => {
      expect(board.value[7]["d"]).toContain({ notation: "R", color: "black" });
      expect(board.value[7]["a"]).toBe(null);

      expect(board.value[7]["c"]).toContain({ notation: "K", color: "black" });
      expect(board.value[7]["e"]).toBe(null);
    });
  });

  it("cannot castle if squares are threatened", () => {
    const board = createBoard();

    board[1]["e"] = null;
    board[0]["f"] = null;
    board[0]["g"] = null;
    board[3]["c"] = board[7]["c"];

    const castle = new Safe(
      new Combined(
        new Straight(1),
        new Diagonal(1),
        new Castle({ col: "e", row: 0 })
      )
    );
    const result = castle.getAvailableMoves({ col: "e", row: 0 }, board);

    expect(result).toHaveLength(0);
    expect(result.flat()).toHaveLength(0);
  });

  it("cannot castle if checked", () => {
    const board = createBoard();

    board[1]["d"] = null;
    board[1]["e"] = null;
    board[0]["f"] = null;
    board[0]["g"] = null;
    board[3]["b"] = board[7]["f"];

    const castle = new Safe(
      new Combined(
        new Straight(1),
        new Diagonal(1),
        new Castle({ col: "e", row: 0 })
      )
    );
    const result = castle.getAvailableMoves({ col: "e", row: 0 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "e", row: 1 }]);
    expect(result).toContainEqual([{ col: "f", row: 0 }]);
  });
});
