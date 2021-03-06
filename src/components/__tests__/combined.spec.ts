import { describe, it, expect } from "vitest";
import { createBoard } from "@/utils";
import Combined from "@/combined";
import Straight from "@/straight";
import Diagonal from "@/diagonal";

describe("Combined", () => {
  it("moves straight up/down and diagonally upright", () => {
    const board = createBoard();
    const combined = new Combined(new Diagonal(), new Straight());

    board.move("d1", "a3");
    const result = combined.getAvailableMoves({ col: "a", row: 2 }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(15);

    expect(result).toContainEqual([
      { col: "a", row: 3 },
      { col: "a", row: 4 },
      { col: "a", row: 5 },
      { col: "a", row: 6 },
    ]);

    expect(result).toContainEqual([
      { col: "b", row: 3 },
      { col: "c", row: 4 },
      { col: "d", row: 5 },
      { col: "e", row: 6 },
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

  it("moves straight up/down and diagonally upleft", () => {
    const board = createBoard();
    const combined = new Combined(new Diagonal(), new Straight());

    board.move("d1", "h3");
    const result = combined.getAvailableMoves({ col: "h", row: 2 }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(15);

    expect(result).toContainEqual([
      { col: "h", row: 3 },
      { col: "h", row: 4 },
      { col: "h", row: 5 },
      { col: "h", row: 6 },
    ]);

    expect(result).toContainEqual([
      { col: "g", row: 3 },
      { col: "f", row: 4 },
      { col: "e", row: 5 },
      { col: "d", row: 6 },
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

  it("moves all around", () => {
    const board = createBoard();
    const combined = new Combined(new Diagonal(), new Straight());

    board.move("d1", "e5");
    const result = combined.getAvailableMoves({ col: "e", row: 4 }, board);

    expect(result).toHaveLength(8);
    expect(result.flat()).toHaveLength(19);

    expect(result).toContainEqual([
      { col: "e", row: 5 },
      { col: "e", row: 6 },
    ]);

    expect(result).toContainEqual([
      { col: "e", row: 3 },
      { col: "e", row: 2 },
    ]);

    expect(result).toContainEqual([
      { col: "d", row: 4 },
      { col: "c", row: 4 },
      { col: "b", row: 4 },
      { col: "a", row: 4 },
    ]);

    expect(result).toContainEqual([
      { col: "f", row: 4 },
      { col: "g", row: 4 },
      { col: "h", row: 4 },
    ]);

    expect(result).toContainEqual([
      { col: "d", row: 5 },
      { col: "c", row: 6 },
    ]);

    expect(result).toContainEqual([
      { col: "f", row: 5 },
      { col: "g", row: 6 },
    ]);

    expect(result).toContainEqual([
      { col: "d", row: 3 },
      { col: "c", row: 2 },
    ]);

    expect(result).toContainEqual([
      { col: "f", row: 3 },
      { col: "g", row: 2 },
    ]);
  });
});
