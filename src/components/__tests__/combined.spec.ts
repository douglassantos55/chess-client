import { describe, it, expect } from "vitest";
import { createBoard, piece } from "@/utils";
import Combined from "@/combined";
import Straight from "@/straight";
import Diagonal from "@/diagonal";
import { Color } from "@/types";

describe("Combined", () => {
  it("moves straight up/down and diagonally upright", () => {
    const board = createBoard();
    const combined = new Combined(new Diagonal(), new Straight());

    board[2]["a"] = piece("Q", Color.White, combined);
    const result = combined.getAvailableMoves({ col: "a", row: 2 }, board);

    expect(result).toHaveLength(15);

    expect(result).toContainEqual({ col: "a", row: 3 });
    expect(result).toContainEqual({ col: "a", row: 4 });
    expect(result).toContainEqual({ col: "a", row: 5 });
    expect(result).toContainEqual({ col: "a", row: 6 });

    expect(result).toContainEqual({ col: "b", row: 3 });
    expect(result).toContainEqual({ col: "c", row: 4 });
    expect(result).toContainEqual({ col: "d", row: 5 });
    expect(result).toContainEqual({ col: "e", row: 6 });

    expect(result).toContainEqual({ col: "b", row: 2 });
    expect(result).toContainEqual({ col: "c", row: 2 });
    expect(result).toContainEqual({ col: "d", row: 2 });
    expect(result).toContainEqual({ col: "e", row: 2 });
    expect(result).toContainEqual({ col: "f", row: 2 });
    expect(result).toContainEqual({ col: "g", row: 2 });
    expect(result).toContainEqual({ col: "h", row: 2 });
  });

  it("moves straight up/down and diagonally upleft", () => {
    const board = createBoard();
    const combined = new Combined(new Diagonal(), new Straight());

    board[2]["h"] = piece("Q", Color.White, combined);
    const result = combined.getAvailableMoves({ col: "h", row: 2 }, board);

    expect(result).toHaveLength(15);

    expect(result).toContainEqual({ col: "h", row: 3 });
    expect(result).toContainEqual({ col: "h", row: 4 });
    expect(result).toContainEqual({ col: "h", row: 5 });
    expect(result).toContainEqual({ col: "h", row: 6 });

    expect(result).toContainEqual({ col: "g", row: 3 });
    expect(result).toContainEqual({ col: "f", row: 4 });
    expect(result).toContainEqual({ col: "e", row: 5 });
    expect(result).toContainEqual({ col: "d", row: 6 });

    expect(result).toContainEqual({ col: "g", row: 2 });
    expect(result).toContainEqual({ col: "f", row: 2 });
    expect(result).toContainEqual({ col: "e", row: 2 });
    expect(result).toContainEqual({ col: "d", row: 2 });
    expect(result).toContainEqual({ col: "c", row: 2 });
    expect(result).toContainEqual({ col: "b", row: 2 });
    expect(result).toContainEqual({ col: "a", row: 2 });
  });

  it("moves all around", () => {
    const board = createBoard();
    const combined = new Combined(new Diagonal(), new Straight());

    board[4]["e"] = piece("Q", Color.White, combined);
    const result = combined.getAvailableMoves({ col: "e", row: 4 }, board);

    expect(result).toHaveLength(19);

    expect(result).toContainEqual({ col: "e", row: 5 });
    expect(result).toContainEqual({ col: "e", row: 6 });
    expect(result).toContainEqual({ col: "e", row: 3 });
    expect(result).toContainEqual({ col: "e", row: 2 });

    expect(result).toContainEqual({ col: "d", row: 4 });
    expect(result).toContainEqual({ col: "c", row: 4 });
    expect(result).toContainEqual({ col: "b", row: 4 });
    expect(result).toContainEqual({ col: "a", row: 4 });

    expect(result).toContainEqual({ col: "f", row: 4 });
    expect(result).toContainEqual({ col: "g", row: 4 });
    expect(result).toContainEqual({ col: "h", row: 4 });

    expect(result).toContainEqual({ col: "d", row: 5 });
    expect(result).toContainEqual({ col: "c", row: 6 });
    expect(result).toContainEqual({ col: "f", row: 5 });
    expect(result).toContainEqual({ col: "g", row: 6 });

    expect(result).toContainEqual({ col: "d", row: 3 });
    expect(result).toContainEqual({ col: "c", row: 2 });
    expect(result).toContainEqual({ col: "f", row: 3 });
    expect(result).toContainEqual({ col: "g", row: 2 });
  });
});
