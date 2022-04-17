import { describe, it, expect } from "vitest";
import Straight from "@/straight";
import { createBoard, piece } from "@/utils";
import { Color } from "@/types";

describe("Straight", () => {
  it("avaible moves at middle of the board", () => {
    const straight = new Straight();
    const board = createBoard();

    board[0]["a"] = null;
    board[3]["d"] = piece("R", Color.White, straight);
    const result = straight.getAvailableMoves({ col: "d", row: 3 }, board);

    expect(result).toHaveLength(4);
    expect(result.flat()).toHaveLength(11);

    expect(result).toContainEqual([{ col: "d", row: 2 }]);

    expect(result).toContainEqual([
      { col: "d", row: 4 },
      { col: "d", row: 5 },
      { col: "d", row: 6 },
    ]);

    expect(result).toContainEqual([
      { col: "c", row: 3 },
      { col: "b", row: 3 },
      { col: "a", row: 3 },
    ]);

    expect(result).toContainEqual([
      { col: "e", row: 3 },
      { col: "f", row: 3 },
      { col: "g", row: 3 },
      { col: "h", row: 3 },
    ]);
  });

  it("avaible moves at left corner of the board", () => {
    const straight = new Straight();
    const board = createBoard();

    board[0]["a"] = null;
    board[2]["a"] = piece("R", Color.White, straight);
    const result = straight.getAvailableMoves({ col: "a", row: 2 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(11);

    expect(result).toContainEqual([
      { col: "a", row: 3 },
      { col: "a", row: 4 },
      { col: "a", row: 5 },
      { col: "a", row: 6 },
    ]);

    expect(result).toContainEqual([
      { col: "b", row: 2 },
      { col: "c", row: 2 },
      { col: "d", row: 2 },
      { col: "e", row: 2 },
      { col: "f", row: 2 },
      { col: "g", row: 2 },
      { col: "h", row: 2 },
    ]);
  });

  it("avaible moves at right corner of the board", () => {
    const straight = new Straight();
    const board = createBoard();

    board[0]["a"] = null;
    board[2]["h"] = piece("R", Color.White, straight);
    const result = straight.getAvailableMoves({ col: "h", row: 2 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(11);

    expect(result).toContainEqual([
      { col: "h", row: 3 },
      { col: "h", row: 4 },
      { col: "h", row: 5 },
      { col: "h", row: 6 },
    ]);

    expect(result).toContainEqual([
      { col: "g", row: 2 },
      { col: "f", row: 2 },
      { col: "e", row: 2 },
      { col: "d", row: 2 },
      { col: "c", row: 2 },
      { col: "b", row: 2 },
      { col: "a", row: 2 },
    ]);
  });

  it("blocks at same color piece", () => {
    const straight = new Straight();
    const result = straight.getAvailableMoves(
      { col: "a", row: 0 },
      createBoard()
    );

    expect(result).toHaveLength(0);
    expect(result.flat()).toHaveLength(0);
  });

  it("blocks at opposite color piece", () => {
    const straight = new Straight();

    const board = createBoard();
    board[1]["a"] = null;

    const result = straight.getAvailableMoves({ col: "a", row: 0 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(6); // from a2 to a7

    expect(result).toContainEqual([
      { col: "a", row: 1 },
      { col: "a", row: 2 },
      { col: "a", row: 3 },
      { col: "a", row: 4 },
      { col: "a", row: 5 },
      { col: "a", row: 6 },
    ]);
  });

  it("moves only allowed number of squares", () => {
    const straight = new Straight(1);

    const board = createBoard();
    board[3]["e"] = piece("K", Color.White, straight);

    const result = straight.getAvailableMoves({ col: "e", row: 3 }, board);

    expect(result).toHaveLength(4);
    expect(result.flat()).toHaveLength(4);

    expect(result).toContainEqual([{ col: "e", row: 4 }]);
    expect(result).toContainEqual([{ col: "e", row: 2 }]);
    expect(result).toContainEqual([{ col: "d", row: 3 }]);
    expect(result).toContainEqual([{ col: "f", row: 3 }]);
  });

  it("moves only allowed number of squares", () => {
    const straight = new Straight(1);

    const board = createBoard();
    board[2]["e"] = piece("K", Color.White, straight);

    const result = straight.getAvailableMoves({ col: "e", row: 2 }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([{ col: "e", row: 3 }]);
    expect(result).toContainEqual([{ col: "d", row: 2 }]);
    expect(result).toContainEqual([{ col: "f", row: 2 }]);
  });

  it("limited squares starting at 0", () => {
    const straight = new Straight(1);
    const result = straight.getAvailableMoves(
      { col: "e", row: 0 },
      createBoard()
    );

    expect(result).toHaveLength(0);
    expect(result.flat()).toHaveLength(0);
  });

  it("limited squares starting at 0", () => {
    const straight = new Straight(1);

    const result = straight.getAvailableMoves(
      { col: "e", row: 7 },
      createBoard()
    );

    expect(result).toHaveLength(0);
    expect(result.flat()).toHaveLength(0);
  });

  it("limited squares starting at 'a'", () => {
    const straight = new Straight(1);

    const result = straight.getAvailableMoves(
      { col: "a", row: 0 },
      createBoard()
    );

    expect(result).toHaveLength(0);
    expect(result.flat()).toHaveLength(0);
  });

  it("limited squares starting at 'h'", () => {
    const straight = new Straight(1);

    const result = straight.getAvailableMoves(
      { col: "h", row: 7 },
      createBoard()
    );

    expect(result).toHaveLength(0);
    expect(result.flat()).toHaveLength(0);
  });

  it("moves only two squares", () => {
    const straight = new Straight(2);
    const board = createBoard();

    board[2]["h"] = piece("random", Color.White, straight);
    const result = straight.getAvailableMoves({ col: "h", row: 2 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(4);

    expect(result).toContainEqual([
      { col: "h", row: 3 },
      { col: "h", row: 4 },
    ]);

    expect(result).toContainEqual([
      { col: "g", row: 2 },
      { col: "f", row: 2 },
    ]);
  });

  it("resets defended", () => {
    const straight = new Straight();
    const board = createBoard();
    let result = straight.getCaptureSquares({ row: 0, col: "a" }, board);

    expect(result.flat()).toHaveLength(2);
    expect(result.flat()).toContainEqual({ row: 1, col: "a" });
    expect(result.flat()).toContainEqual({ row: 0, col: "b" });

    board[3]["a"] = board[1]["a"];
    board[1]["a"] = null;

    result = straight.getCaptureSquares({ row: 0, col: "a" }, board);

    expect(result.flat()).toHaveLength(4);
    expect(result.flat()).toContainEqual({ row: 3, col: "a" });
    expect(result.flat()).toContainEqual({ row: 2, col: "a" });
    expect(result.flat()).toContainEqual({ row: 1, col: "a" });
    expect(result.flat()).toContainEqual({ row: 0, col: "b" });
  });
});
