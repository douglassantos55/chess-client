import { expect, it, describe } from "vitest";
import Safe from "@/safe";
import Castle from "@/castle";
import Straight from "@/straight";
import Diagonal from "@/diagonal";
import Combined from "@/combined";
import { createBoard } from "@/utils";
import type { Piece } from "@/types";
import { nextTick } from "vue";
import { ref } from "vue";

describe("Castle", () => {
  it("displays white's available squares on the right", () => {
    const board = createBoard();

    board.move("f1", "f4");
    board.move("g1", "g4");

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

    board.move("c1", "c5");
    board.move("d1", "d5");

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 0 })
    );
    let result = castle.getAvailableMoves({ col: "e", row: 0 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(1);
    expect(result).toContainEqual([{ col: "d", row: 0 }]);

    board.move("b1", "b5");
    result = castle.getAvailableMoves({ col: "e", row: 0 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "d", row: 0 }]);
    expect(result).toContainEqual([{ col: "c", row: 0 }]);
  });

  it("displays white's available squares on both sides", () => {
    const board = createBoard();

    board.move("b1", "b5");
    board.move("c1", "c5");
    board.move("d1", "d5");

    board.move("f1", "f5");
    board.move("g1", "g5");

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

    board.move("b1", "b5");
    board.move("c1", "c5");
    board.move("d1", "d5");

    board.move("f1", "f5");
    board.move("g1", "g5");

    const king = board.piece({ row: 0, col: "e" }) as Piece;
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

    board.move("b1", "b5");
    board.move("c1", "c5");
    board.move("d1", "d5");

    board.move("f1", "f5");
    board.move("g1", "g5");

    const aRook = board.piece({ col: "a", row: 0 }) as Piece;
    const hRook = board.piece({ col: "h", row: 0 }) as Piece;

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

  it("swaps white's king and rook on the right", async () => {
    const board = ref(createBoard());

    board.value.move("f1", "f5");
    board.value.move("g1", "g5");

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 0 })
    );

    castle.getAvailableMoves({ col: "e", row: 0 }, board.value);
    board.value.move("e1", "g1");

    await nextTick();

    expect(board.value.piece({ col: "f", row: 0 })).toContain({
      notation: "R",
      color: "white",
    });
    expect(board.value.piece({ col: "h", row: 0 })).toBe(null);

    expect(board.value.piece({ col: "g", row: 0 })).toContain({
      notation: "K",
      color: "white",
    });
    expect(board.value.piece({ col: "e", row: 0 })).toBe(null);
  });

  it("swaps white's king and rook on the left", async () => {
    const board = ref(createBoard());

    board.value.move("b1", "b5");
    board.value.move("c1", "c5");
    board.value.move("d1", "d5");

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 0 })
    );

    castle.getAvailableMoves({ col: "e", row: 0 }, board.value);
    board.value.move("e1", "c1");

    await nextTick();

    expect(board.value.piece({ col: "d", row: 0 })).toContain({
      notation: "R",
      color: "white",
    });
    expect(board.value.piece({ col: "a", row: 0 })).toBe(null);

    expect(board.value.piece({ col: "c", row: 0 })).toContain({
      notation: "K",
      color: "white",
    });
    expect(board.value.piece({ col: "e", row: 0 })).toBe(null);
  });

  it("displays black's available squares on the right", () => {
    const board = createBoard();

    board.move("f8", "f5");
    board.move("g8", "g5");

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

    board.move("c8", "c5");
    board.move("d8", "d5");

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 7 })
    );
    let result = castle.getAvailableMoves({ col: "e", row: 7 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(1);
    expect(result).toContainEqual([{ col: "d", row: 7 }]);

    board.move("b8", "b5");
    result = castle.getAvailableMoves({ col: "e", row: 7 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "d", row: 7 }]);
    expect(result).toContainEqual([{ col: "c", row: 7 }]);
  });

  it("displays black's available squares on both sides", () => {
    const board = createBoard();

    board.move("b8", "b5");
    board.move("c8", "c5");
    board.move("d8", "d5");

    board.move("f8", "f5");
    board.move("g8", "g5");

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

    board.move("f8", "f5");
    board.move("g8", "g5");

    const king = board.piece({ col: "e", row: 7 }) as Piece;
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

    board.move("b8", "b5");
    board.move("c8", "c5");
    board.move("d8", "d5");

    board.move("f8", "f5");
    board.move("g8", "g5");

    const aRook = board.piece({ col: "a", row: 7 }) as Piece;
    const hRook = board.piece({ col: "h", row: 7 }) as Piece;

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

  it("swaps black's king and rook on the right", async () => {
    const board = ref(createBoard());

    board.value.move("f8", "f5");
    board.value.move("g8", "g5");

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 7 })
    );

    castle.getAvailableMoves({ col: "e", row: 7 }, board.value);
    board.value.move("e8", "g8");

    await nextTick();
    expect(board.value.piece({ col: "f", row: 7 })).toContain({
      notation: "R",
      color: "black",
    });
    expect(board.value.piece({ col: "h", row: 7 })).toBe(null);

    expect(board.value.piece({ col: "g", row: 7 })).toContain({
      notation: "K",
      color: "black",
    });
    expect(board.value.piece({ col: "e", row: 7 })).toBe(null);
  });

  it("swaps black's king and rook on the left", async () => {
    const board = ref(createBoard());

    board.value.move("b8", "b5");
    board.value.move("c8", "c5");
    board.value.move("d8", "d5");

    const castle = new Combined(
      new Straight(1),
      new Diagonal(1),
      new Castle({ col: "e", row: 7 })
    );

    castle.getAvailableMoves({ col: "e", row: 7 }, board.value);
    board.value.move("e8", "c8");

    await nextTick();
    expect(board.value.piece({ col: "d", row: 7 })).toContain({
      notation: "R",
      color: "black",
    });
    expect(board.value.piece({ col: "a", row: 7 })).toBe(null);

    expect(board.value.piece({ col: "c", row: 7 })).toContain({
      notation: "K",
      color: "black",
    });
    expect(board.value.piece({ col: "e", row: 7 })).toBe(null);
  });

  it("cannot castle if squares are threatened", () => {
    const board = createBoard();

    board.move("e2", "e4");
    board.move("f1", "f5");
    board.move("g1", "g5");
    board.move("c8", "c4");

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

    board.move("d2", "d4");
    board.move("e2", "e4");
    board.move("f1", "f5");
    board.move("g1", "g5");
    board.move("f8", "b4");

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
