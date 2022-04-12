import { expect, describe, it } from "vitest";
import Diagonal from "@/diagonal";
import { createBoard, piece } from "@/utils";

describe("Diagonal", () => {
  it("moves top right", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board[2]["a"] = piece("B", "white", diagonal);
    const result = diagonal.getAvailableMoves({ col: "a", row: 2 }, board);

    expect(result).toHaveLength(4);

    expect(result).toContainEqual({ col: "b", row: 3 });
    expect(result).toContainEqual({ col: "c", row: 4 });
    expect(result).toContainEqual({ col: "d", row: 5 });
    expect(result).toContainEqual({ col: "e", row: 6 });
  });

  it("moves top left", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board[2]["h"] = piece("B", "white", diagonal);
    const result = diagonal.getAvailableMoves({ col: "h", row: 2 }, board);

    expect(result).toHaveLength(4);
    expect(result).toContainEqual({ col: "g", row: 3 });
    expect(result).toContainEqual({ col: "f", row: 4 });
    expect(result).toContainEqual({ col: "e", row: 5 });
    expect(result).toContainEqual({ col: "d", row: 6 });
  });

  it("moves bottom right", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board[5]["a"] = piece("B", "black", diagonal);
    const result = diagonal.getAvailableMoves({ col: "a", row: 5 }, board);

    expect(result).toHaveLength(4);
    expect(result).toContainEqual({ col: "b", row: 4 });
    expect(result).toContainEqual({ col: "c", row: 3 });
    expect(result).toContainEqual({ col: "d", row: 2 });
    expect(result).toContainEqual({ col: "e", row: 1 });
  });

  it("moves bottom left", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board[5]["h"] = piece("B", "black", diagonal);
    const result = diagonal.getAvailableMoves({ col: "h", row: 5 }, board);

    expect(result).toHaveLength(4);
    expect(result).toContainEqual({ col: "g", row: 4 });
    expect(result).toContainEqual({ col: "f", row: 3 });
    expect(result).toContainEqual({ col: "e", row: 2 });
    expect(result).toContainEqual({ col: "d", row: 1 });
  });

  it("moves top right and top left", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board[2]["d"] = piece("B", "white", diagonal);
    const result = diagonal.getAvailableMoves({ col: "d", row: 2 }, board);

    expect(result).toHaveLength(7);
    expect(result).toContainEqual({ col: "c", row: 3 });
    expect(result).toContainEqual({ col: "b", row: 4 });
    expect(result).toContainEqual({ col: "a", row: 5 });
    expect(result).toContainEqual({ col: "e", row: 3 });
    expect(result).toContainEqual({ col: "f", row: 4 });
    expect(result).toContainEqual({ col: "g", row: 5 });
    expect(result).toContainEqual({ col: "h", row: 6 });
  });

  it("moves bottom right and bottom left", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board[5]["d"] = piece("B", "black", diagonal);
    const result = diagonal.getAvailableMoves({ col: "d", row: 5 }, board);

    expect(result).toHaveLength(7);
    expect(result).toContainEqual({ col: "c", row: 4 });
    expect(result).toContainEqual({ col: "b", row: 3 });
    expect(result).toContainEqual({ col: "a", row: 2 });
    expect(result).toContainEqual({ col: "e", row: 4 });
    expect(result).toContainEqual({ col: "f", row: 3 });
    expect(result).toContainEqual({ col: "g", row: 2 });
    expect(result).toContainEqual({ col: "h", row: 1 });
  });

  it("moves in all four directions", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board[4]["d"] = piece("B", "white", diagonal);
    const result = diagonal.getAvailableMoves({ col: "d", row: 4 }, board);

    expect(result).toHaveLength(8);
    expect(result).toContainEqual({ col: "c", row: 5 });
    expect(result).toContainEqual({ col: "b", row: 6 });
    expect(result).toContainEqual({ col: "e", row: 5 });
    expect(result).toContainEqual({ col: "f", row: 6 });
    expect(result).toContainEqual({ col: "c", row: 3 });
    expect(result).toContainEqual({ col: "b", row: 2 });
    expect(result).toContainEqual({ col: "e", row: 3 });
    expect(result).toContainEqual({ col: "f", row: 2 });
  });

  it("has no moves at the starting position", () => {
    const diagonal = new Diagonal();
    const whiteResult = diagonal.getAvailableMoves(
      { col: "c", row: 0 },
      createBoard()
    );
    const blackResult = diagonal.getAvailableMoves(
      { col: "c", row: 7 },
      createBoard()
    );

    expect(whiteResult).toHaveLength(0);
    expect(blackResult).toHaveLength(0);
  });

  it("blocks at same color pieces", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board[1]["c"] = null;
    board[1]["d"] = null;
    board[2]["c"] = piece("p", "white", diagonal);
    board[4]["d"] = piece("p", "white", diagonal);
    board[2]["b"] = piece("B", "white", diagonal);

    const result = diagonal.getAvailableMoves({ col: "b", row: 2 }, board);

    expect(result).toHaveLength(3);
    expect(result).toContainEqual({ col: "a", row: 3 });
    expect(result).toContainEqual({ col: "c", row: 1 });
    expect(result).toContainEqual({ col: "c", row: 3 });
  });

  it("blocks at opposite color pieces", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board[6]["d"] = null;
    board[4]["d"] = piece("p", "black", diagonal);
    board[2]["b"] = piece("B", "white", diagonal);
    board[2]["f"] = piece("B", "white", diagonal);

    const result1 = diagonal.getAvailableMoves({ col: "b", row: 2 }, board);
    const result2 = diagonal.getAvailableMoves({ col: "f", row: 2 }, board);

    expect(result1).toHaveLength(3);
    expect(result1).toContainEqual({ col: "c", row: 3 });
    expect(result1).toContainEqual({ col: "a", row: 3 });
    expect(result1).toContainEqual({ col: "d", row: 4 });

    expect(result2).toHaveLength(4);
    expect(result2).toContainEqual({ col: "e", row: 3 });
    expect(result2).toContainEqual({ col: "d", row: 4 });
    expect(result2).toContainEqual({ col: "g", row: 3 });
    expect(result2).toContainEqual({ col: "h", row: 4 });
  });
});
