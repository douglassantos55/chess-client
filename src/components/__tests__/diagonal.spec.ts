import { expect, describe, it } from "vitest";
import Diagonal from "@/diagonal";
import { createBoard, piece } from "@/utils";
import { Color } from "@/types";

describe("Diagonal", () => {
  it("moves top right", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board.move("c1", "a3");
    const result = diagonal.getAvailableMoves({ col: "a", row: 2 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(4);

    expect(result).toContainEqual([
      { col: "b", row: 3 },
      { col: "c", row: 4 },
      { col: "d", row: 5 },
      { col: "e", row: 6 },
    ]);
  });

  it("moves top left", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board.move("f1", "h3");
    const result = diagonal.getAvailableMoves({ col: "h", row: 2 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(4);

    expect(result).toContainEqual([
      { col: "g", row: 3 },
      { col: "f", row: 4 },
      { col: "e", row: 5 },
      { col: "d", row: 6 },
    ]);
  });

  it("moves bottom right", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board.move("c8", "a6");
    const result = diagonal.getAvailableMoves({ col: "a", row: 5 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(4);

    expect(result).toContainEqual([
      { col: "b", row: 4 },
      { col: "c", row: 3 },
      { col: "d", row: 2 },
      { col: "e", row: 1 },
    ]);
  });

  it("moves bottom left", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board.move("f8", "h6");
    const result = diagonal.getAvailableMoves({ col: "h", row: 5 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(4);

    expect(result).toContainEqual([
      { col: "g", row: 4 },
      { col: "f", row: 3 },
      { col: "e", row: 2 },
      { col: "d", row: 1 },
    ]);
  });

  it("moves top right and top left", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board.move("c1", "d3");
    const result = diagonal.getAvailableMoves({ col: "d", row: 2 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(7);

    expect(result).toContainEqual([
      { col: "c", row: 3 },
      { col: "b", row: 4 },
      { col: "a", row: 5 },
    ]);

    expect(result).toContainEqual([
      { col: "e", row: 3 },
      { col: "f", row: 4 },
      { col: "g", row: 5 },
      { col: "h", row: 6 },
    ]);
  });

  it("moves bottom right and bottom left", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board.move("c8", "d6");
    const result = diagonal.getAvailableMoves({ col: "d", row: 5 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(7);

    expect(result).toContainEqual([
      { col: "c", row: 4 },
      { col: "b", row: 3 },
      { col: "a", row: 2 },
    ]);

    expect(result).toContainEqual([
      { col: "e", row: 4 },
      { col: "f", row: 3 },
      { col: "g", row: 2 },
      { col: "h", row: 1 },
    ]);
  });

  it("moves in all four directions", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board.move("c1", "d5");
    const result = diagonal.getAvailableMoves({ col: "d", row: 4 }, board);

    expect(result).toHaveLength(4);
    expect(result.flat()).toHaveLength(8);

    expect(result).toContainEqual([
      { col: "c", row: 5 },
      { col: "b", row: 6 },
    ]);

    expect(result).toContainEqual([
      { col: "e", row: 5 },
      { col: "f", row: 6 },
    ]);

    expect(result).toContainEqual([
      { col: "c", row: 3 },
      { col: "b", row: 2 },
    ]);

    expect(result).toContainEqual([
      { col: "e", row: 3 },
      { col: "f", row: 2 },
    ]);
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
    expect(whiteResult.flat()).toHaveLength(0);

    expect(blackResult).toHaveLength(0);
    expect(blackResult.flat()).toHaveLength(0);
  });

  it("blocks at same color pieces", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board.move("c2", "c3");
    board.move("d2", "d5");
    board.move("c1", "b3");

    const result = diagonal.getAvailableMoves({ col: "b", row: 2 }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([{ col: "a", row: 3 }]);
    expect(result).toContainEqual([{ col: "c", row: 1 }]);
    expect(result).toContainEqual([{ col: "c", row: 3 }]);
  });

  it("blocks at opposite color pieces", () => {
    const diagonal = new Diagonal();
    const board = createBoard();

    board.move("d7", "d5");
    board.move("c1", "b3");
    board.move("f1", "f3");

    const result1 = diagonal.getAvailableMoves({ col: "b", row: 2 }, board);
    const result2 = diagonal.getAvailableMoves({ col: "f", row: 2 }, board);

    expect(result1).toHaveLength(2);
    expect(result1.flat()).toHaveLength(3);

    expect(result1).toContainEqual([{ col: "a", row: 3 }]);
    expect(result1).toContainEqual([
      { col: "c", row: 3 },
      { col: "d", row: 4 },
    ]);

    expect(result2).toHaveLength(2);
    expect(result2.flat()).toHaveLength(4);

    expect(result2).toContainEqual([
      { col: "e", row: 3 },
      { col: "d", row: 4 },
    ]);

    expect(result2).toContainEqual([
      { col: "g", row: 3 },
      { col: "h", row: 4 },
    ]);
  });

  it("moves only allowed number of squares", () => {
    const diagonal = new Diagonal(1);
    const board = createBoard();

    board.set({ col: "e", row: 3 }, piece("K", Color.White, diagonal));
    const result = diagonal.getAvailableMoves({ col: "e", row: 3 }, board);

    expect(result).toHaveLength(4);
    expect(result.flat()).toHaveLength(4);

    expect(result).toContainEqual([{ col: "d", row: 4 }]);
    expect(result).toContainEqual([{ col: "f", row: 4 }]);
    expect(result).toContainEqual([{ col: "d", row: 2 }]);
    expect(result).toContainEqual([{ col: "f", row: 2 }]);
  });

  it("limited movement starting at 0", () => {
    const diagonal = new Diagonal(1);
    const board = createBoard();

    board.set({ col: "c", row: 0 }, piece("K", Color.White, diagonal));
    const result = diagonal.getAvailableMoves({ col: "c", row: 0 }, board);

    expect(result).toHaveLength(0);
    expect(result.flat()).toHaveLength(0);
  });

  it("limited movement starting at 8", () => {
    const diagonal = new Diagonal(1);
    const board = createBoard();

    board.set({ col: "c", row: 7 }, piece("K", Color.Black, diagonal));
    const result = diagonal.getAvailableMoves({ col: "c", row: 7 }, board);

    expect(result).toHaveLength(0);
    expect(result.flat()).toHaveLength(0);
  });

  it("limited movement starting at a", () => {
    const diagonal = new Diagonal(1);
    const board = createBoard();

    board.set({ col: "a", row: 0 }, piece("K", Color.White, diagonal));
    const result = diagonal.getAvailableMoves({ col: "a", row: 0 }, board);

    expect(result).toHaveLength(0);
    expect(result.flat()).toHaveLength(0);
  });

  it("limited movement starting at h", () => {
    const diagonal = new Diagonal(1);
    const board = createBoard();

    board.set({ col: "h", row: 7 }, piece("K", Color.Black, diagonal));
    const result = diagonal.getAvailableMoves({ col: "h", row: 7 }, board);

    expect(result).toHaveLength(0);
    expect(result.flat()).toHaveLength(0);
  });

  it("moves only two squares", () => {
    const diagonal = new Diagonal(2);
    const board = createBoard();

    board.set({ col: "h", row: 2 }, piece("random", Color.White, diagonal));
    const result = diagonal.getAvailableMoves({ col: "h", row: 2 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([
      { col: "g", row: 3 },
      { col: "f", row: 4 },
    ]);
  });

  it("resets defended", () => {
    const diagonal = new Diagonal();
    const board = createBoard();
    let result = diagonal.getCaptureSquares({ col: "c", row: 0 }, board);

    expect(result.flat()).toHaveLength(2);
    expect(result.flat()).toContainEqual({ col: "b", row: 1 });
    expect(result.flat()).toContainEqual({ col: "d", row: 1 });

    board.move("d2", "d4");
    board.move("e2", "e3");
    board.move("b2", "b3");

    result = diagonal.getCaptureSquares({ col: "c", row: 0 }, board);

    expect(result.flat()).toHaveLength(4);
    expect(result.flat()).toContainEqual({ col: "b", row: 1 });
    expect(result.flat()).toContainEqual({ col: "a", row: 2 });
    expect(result.flat()).toContainEqual({ col: "d", row: 1 });
    expect(result.flat()).toContainEqual({ col: "e", row: 2 });
  });
});
