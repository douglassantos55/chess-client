import { describe, it, expect } from "vitest";
import L from "@/knight";
import { createBoard, piece } from "@/utils";
import { Color } from "@/types";

describe("L", () => {
  it("moves up", () => {
    const movement = new L();
    const result = movement.getAvailableMoves(
      { col: "b", row: 0 },
      createBoard()
    );

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({ col: "a", row: 2 });
    expect(result).toContainEqual({ col: "c", row: 2 });
  });

  it("moves up", () => {
    const movement = new L();
    const result = movement.getAvailableMoves(
      { col: "g", row: 0 },
      createBoard()
    );

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({ col: "f", row: 2 });
    expect(result).toContainEqual({ col: "h", row: 2 });
  });

  it("moves down", () => {
    const movement = new L();
    const result = movement.getAvailableMoves(
      { col: "b", row: 7 },
      createBoard()
    );

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({ col: "a", row: 5 });
    expect(result).toContainEqual({ col: "c", row: 5 });
  });

  it("moves down", () => {
    const movement = new L();
    const result = movement.getAvailableMoves(
      { col: "g", row: 7 },
      createBoard()
    );

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({ col: "h", row: 5 });
    expect(result).toContainEqual({ col: "f", row: 5 });
  });

  it("moves all around", () => {
    const movement = new L();
    const board = createBoard();

    board[4]["e"] = piece("N", Color.White, movement);
    const result = movement.getAvailableMoves({ col: "e", row: 4 }, board);

    expect(result).toHaveLength(8);
    expect(result).toContainEqual({ col: "d", row: 6 });
    expect(result).toContainEqual({ col: "f", row: 6 });
    expect(result).toContainEqual({ col: "c", row: 5 });
    expect(result).toContainEqual({ col: "c", row: 3 });
    expect(result).toContainEqual({ col: "g", row: 5 });
    expect(result).toContainEqual({ col: "g", row: 3 });
    expect(result).toContainEqual({ col: "d", row: 2 });
    expect(result).toContainEqual({ col: "f", row: 2 });
  });

  it("moves from the left corner", () => {
    const movement = new L();
    const board = createBoard();

    board[4]["a"] = piece("N", Color.White, movement);
    const result = movement.getAvailableMoves({ col: "a", row: 4 }, board);

    expect(result).toHaveLength(4);
    expect(result).toContainEqual({ col: "b", row: 6 });
    expect(result).toContainEqual({ col: "b", row: 2 });
    expect(result).toContainEqual({ col: "c", row: 5 });
    expect(result).toContainEqual({ col: "c", row: 3 });
  });

  it("moves from the right corner", () => {
    const movement = new L();
    const board = createBoard();

    board[4]["h"] = piece("N", Color.White, movement);
    const result = movement.getAvailableMoves({ col: "h", row: 4 }, board);

    expect(result).toHaveLength(4);
    expect(result).toContainEqual({ col: "g", row: 6 });
    expect(result).toContainEqual({ col: "g", row: 2 });
    expect(result).toContainEqual({ col: "f", row: 5 });
    expect(result).toContainEqual({ col: "f", row: 3 });
  });

  it("does not move weird", () => {
    const movement = new L();
    const result = movement.getAvailableMoves(
      { col: "b", row: 0 },
      createBoard()
    );

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({ col: "a", row: 2 });
    expect(result).toContainEqual({ col: "c", row: 2 });
  });
});
