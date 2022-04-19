import { describe, it, expect } from "vitest";
import L from "@/knight";
import { createBoard } from "@/utils";

describe("L", () => {
  it("moves up", () => {
    const movement = new L();
    const result = movement.getAvailableMoves(
      { col: "b", row: 0 },
      createBoard()
    );

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "a", row: 2 }]);
    expect(result).toContainEqual([{ col: "c", row: 2 }]);
  });

  it("moves up", () => {
    const movement = new L();
    const result = movement.getAvailableMoves(
      { col: "g", row: 0 },
      createBoard()
    );

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "f", row: 2 }]);
    expect(result).toContainEqual([{ col: "h", row: 2 }]);
  });

  it("moves down", () => {
    const movement = new L();
    const result = movement.getAvailableMoves(
      { col: "b", row: 7 },
      createBoard()
    );

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "a", row: 5 }]);
    expect(result).toContainEqual([{ col: "c", row: 5 }]);
  });

  it("moves down", () => {
    const movement = new L();
    const result = movement.getAvailableMoves(
      { col: "g", row: 7 },
      createBoard()
    );

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "h", row: 5 }]);
    expect(result).toContainEqual([{ col: "f", row: 5 }]);
  });

  it("moves all around", () => {
    const movement = new L();
    const board = createBoard();

    board.move("b1", "e5");
    const result = movement.getAvailableMoves({ col: "e", row: 4 }, board);

    expect(result).toHaveLength(8);
    expect(result.flat()).toHaveLength(8);

    expect(result).toContainEqual([{ col: "d", row: 6 }]);
    expect(result).toContainEqual([{ col: "f", row: 6 }]);
    expect(result).toContainEqual([{ col: "c", row: 5 }]);
    expect(result).toContainEqual([{ col: "c", row: 3 }]);
    expect(result).toContainEqual([{ col: "g", row: 5 }]);
    expect(result).toContainEqual([{ col: "g", row: 3 }]);
    expect(result).toContainEqual([{ col: "d", row: 2 }]);
    expect(result).toContainEqual([{ col: "f", row: 2 }]);
  });

  it("moves from the left corner", () => {
    const movement = new L();
    const board = createBoard();

    board.move("b1", "a5");
    const result = movement.getAvailableMoves({ col: "a", row: 4 }, board);

    expect(result).toHaveLength(4);
    expect(result.flat()).toHaveLength(4);

    expect(result).toContainEqual([{ col: "b", row: 6 }]);
    expect(result).toContainEqual([{ col: "b", row: 2 }]);
    expect(result).toContainEqual([{ col: "c", row: 5 }]);
    expect(result).toContainEqual([{ col: "c", row: 3 }]);
  });

  it("moves from the right corner", () => {
    const movement = new L();
    const board = createBoard();

    board.move("g1", "h5");
    const result = movement.getAvailableMoves({ col: "h", row: 4 }, board);

    expect(result).toHaveLength(4);
    expect(result.flat()).toHaveLength(4);

    expect(result).toContainEqual([{ col: "g", row: 6 }]);
    expect(result).toContainEqual([{ col: "g", row: 2 }]);
    expect(result).toContainEqual([{ col: "f", row: 5 }]);
    expect(result).toContainEqual([{ col: "f", row: 3 }]);
  });

  it("does not move weird", () => {
    const movement = new L();
    const result = movement.getAvailableMoves(
      { col: "b", row: 0 },
      createBoard()
    );

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(2);

    expect(result).toContainEqual([{ col: "a", row: 2 }]);
    expect(result).toContainEqual([{ col: "c", row: 2 }]);
  });

  it("resets defended", () => {
    const movement = new L();
    const board = createBoard();

    let result = movement.getCaptureSquares({ col: "b", row: 0 }, board);

    expect(result.flat()).toHaveLength(3);
    expect(result.flat()).toContainEqual({ col: "a", row: 2 });
    expect(result.flat()).toContainEqual({ col: "c", row: 2 });
    expect(result.flat()).toContainEqual({ col: "d", row: 1 });

    board.move("b1", "c3");
    result = movement.getCaptureSquares({ col: "c", row: 2 }, board);

    expect(result.flat()).toHaveLength(8);
    expect(result.flat()).toContainEqual({ col: "a", row: 1 });
    expect(result.flat()).toContainEqual({ col: "a", row: 3 });
    expect(result.flat()).toContainEqual({ col: "b", row: 0 });
    expect(result.flat()).toContainEqual({ col: "b", row: 4 });
    expect(result.flat()).toContainEqual({ col: "d", row: 0 });
    expect(result.flat()).toContainEqual({ col: "d", row: 4 });
    expect(result.flat()).toContainEqual({ col: "e", row: 3 });
    expect(result.flat()).toContainEqual({ col: "e", row: 1 });
  });
});
