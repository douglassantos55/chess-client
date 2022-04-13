import { describe, it, expect } from "vitest";
import Straight from "@/straight";
import { createBoard, piece } from "@/utils";

describe("Straight", () => {
  it("avaible moves at middle of the board", () => {
    const straight = new Straight();
    const board = createBoard();

    board[0]["a"] = null;
    board[3]["d"] = piece("R", "white", straight);
    const result = straight.getAvailableMoves({ col: "d", row: 3 }, board);

    expect(result).toHaveLength(11);

    expect(result).toContainEqual({ col: "d", row: 2 });
    expect(result).toContainEqual({ col: "d", row: 4 });
    expect(result).toContainEqual({ col: "d", row: 5 });
    expect(result).toContainEqual({ col: "d", row: 6 });
    expect(result).toContainEqual({ col: "a", row: 3 });
    expect(result).toContainEqual({ col: "b", row: 3 });
    expect(result).toContainEqual({ col: "c", row: 3 });
    expect(result).toContainEqual({ col: "e", row: 3 });
    expect(result).toContainEqual({ col: "f", row: 3 });
    expect(result).toContainEqual({ col: "g", row: 3 });
    expect(result).toContainEqual({ col: "h", row: 3 });
  });

  it("avaible moves at left corner of the board", () => {
    const straight = new Straight();
    const board = createBoard();

    board[0]["a"] = null;
    board[2]["a"] = piece("R", "white", straight);
    const result = straight.getAvailableMoves({ col: "a", row: 2 }, board);

    expect(result).toHaveLength(11);

    expect(result).toContainEqual({ col: "a", row: 3 });
    expect(result).toContainEqual({ col: "a", row: 4 });
    expect(result).toContainEqual({ col: "a", row: 5 });
    expect(result).toContainEqual({ col: "a", row: 6 });
    expect(result).toContainEqual({ col: "b", row: 2 });
    expect(result).toContainEqual({ col: "c", row: 2 });
    expect(result).toContainEqual({ col: "d", row: 2 });
    expect(result).toContainEqual({ col: "e", row: 2 });
    expect(result).toContainEqual({ col: "f", row: 2 });
    expect(result).toContainEqual({ col: "g", row: 2 });
    expect(result).toContainEqual({ col: "h", row: 2 });
  });

  it("avaible moves at right corner of the board", () => {
    const straight = new Straight();
    const board = createBoard();

    board[0]["a"] = null;
    board[2]["h"] = piece("R", "white", straight);
    const result = straight.getAvailableMoves({ col: "h", row: 2 }, board);

    expect(result).toHaveLength(11);

    expect(result).toContainEqual({ col: "h", row: 3 });
    expect(result).toContainEqual({ col: "h", row: 4 });
    expect(result).toContainEqual({ col: "h", row: 5 });
    expect(result).toContainEqual({ col: "h", row: 6 });
    expect(result).toContainEqual({ col: "b", row: 2 });
    expect(result).toContainEqual({ col: "c", row: 2 });
    expect(result).toContainEqual({ col: "d", row: 2 });
    expect(result).toContainEqual({ col: "e", row: 2 });
    expect(result).toContainEqual({ col: "f", row: 2 });
    expect(result).toContainEqual({ col: "g", row: 2 });
    expect(result).toContainEqual({ col: "a", row: 2 });
  });

  it("blocks at same color piece", () => {
    const straight = new Straight();
    const result = straight.getAvailableMoves(
      { col: "a", row: 0 },
      createBoard()
    );

    expect(result).toHaveLength(0);
  });

  it("blocks at opposite color piece", () => {
    const straight = new Straight();

    const board = createBoard();
    board[1]["a"] = null;

    const result = straight.getAvailableMoves({ col: "a", row: 0 }, board);
    expect(result).toHaveLength(6); // from a2 to a7
  });

  it("moves only allowed number of squares", () => {
    const straight = new Straight(1);

    const board = createBoard();
    board[3]["e"] = piece("K", "white", straight);

    const result = straight.getAvailableMoves({ col: "e", row: 3 }, board);

    expect(result).toHaveLength(4);
    expect(result).toContainEqual({ col: "e", row: 4 });
    expect(result).toContainEqual({ col: "e", row: 2 });
    expect(result).toContainEqual({ col: "d", row: 3 });
    expect(result).toContainEqual({ col: "f", row: 3 });
  });

  it("moves only allowed number of squares", () => {
    const straight = new Straight(1);

    const board = createBoard();
    board[2]["e"] = piece("K", "white", straight);

    const result = straight.getAvailableMoves({ col: "e", row: 2 }, board);

    expect(result).toHaveLength(3);
    expect(result).toContainEqual({ col: "e", row: 3 });
    expect(result).toContainEqual({ col: "d", row: 2 });
    expect(result).toContainEqual({ col: "f", row: 2 });
  });

  it("limited squares starting at 0", () => {
    const straight = new Straight(1);
    const result = straight.getAvailableMoves(
      { col: "e", row: 0 },
      createBoard()
    );

    expect(result).toHaveLength(0);
  });

  it("limited squares starting at 0", () => {
    const straight = new Straight(1);

    const result = straight.getAvailableMoves(
      { col: "e", row: 7 },
      createBoard()
    );

    expect(result).toHaveLength(0);
  });

  it("limited squares starting at 'a'", () => {
    const straight = new Straight(1);

    const result = straight.getAvailableMoves(
      { col: "a", row: 0 },
      createBoard()
    );

    expect(result).toHaveLength(0);
  });

  it("limited squares starting at 'h'", () => {
    const straight = new Straight(1);

    const result = straight.getAvailableMoves(
      { col: "h", row: 7 },
      createBoard()
    );

    expect(result).toHaveLength(0);
  });

  it("moves only two squares", () => {
    const straight = new Straight(2);
    const board = createBoard();

    board[2]["h"] = piece("random", "white", straight);
    const result = straight.getAvailableMoves({ col: "h", row: 2 }, board);

    expect(result).toHaveLength(4);
    expect(result).toContainEqual({ col: "h", row: 3 });
    expect(result).toContainEqual({ col: "h", row: 4 });
    expect(result).toContainEqual({ col: "g", row: 2 });
    expect(result).toContainEqual({ col: "f", row: 2 });
  });
});
