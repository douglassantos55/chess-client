import { expect, describe, it } from "vitest";
import Forward, { Direction } from "@/forward";
import { createBoard } from "@/utils";

describe("Forward", () => {
  it("moves forward", () => {
    const forward = new Forward(Direction.Up);
    const result = forward.getAvailableMoves(
      { col: "e", row: 1 },
      createBoard()
    );

    expect(result).toContainEqual([
      { col: "e", row: 2 },
      { col: "e", row: 3 },
    ]);
  });

  it("moves backwards", () => {
    const forward = new Forward(Direction.Down);
    const result = forward.getAvailableMoves(
      { col: "e", row: 6 },
      createBoard()
    );

    expect(result).toContainEqual([
      { col: "e", row: 5 },
      { col: "e", row: 4 },
    ]);
  });

  it("moves 2 squares only on first move", () => {
    const forward = new Forward(Direction.Up);
    const result = forward.getAvailableMoves(
      { col: "e", row: 3 },
      createBoard()
    );

    expect(result).toContainEqual([{ col: "e", row: 4 }]);
  });

  it("captures diagonally right", () => {
    const forward = new Forward(Direction.Up);
    const board = createBoard();

    board.move("b7", "b3");

    const result = forward.getAvailableMoves({ col: "a", row: 1 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([
      { col: "a", row: 2 },
      { col: "a", row: 3 },
    ]);
    expect(result).toContainEqual([{ col: "b", row: 2 }]);
  });

  it("captures diagonally left", () => {
    const forward = new Forward(Direction.Up);
    const board = createBoard();

    board.move("g7", "g3");

    const result = forward.getAvailableMoves({ col: "h", row: 1 }, board);

    expect(result).toHaveLength(2);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([{ col: "g", row: 2 }]);
    expect(result).toContainEqual([
      { col: "h", row: 2 },
      { col: "h", row: 3 },
    ]);
  });

  it("captures diagonally on both sides", () => {
    const forward = new Forward(Direction.Up);
    const board = createBoard();

    board.move("c7", "c5");
    board.move("a7", "a5");

    const result = forward.getAvailableMoves({ col: "b", row: 3 }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([{ col: "b", row: 4 }]);
    expect(result).toContainEqual([{ col: "a", row: 4 }]);
    expect(result).toContainEqual([{ col: "c", row: 4 }]);
  });

  it("captures diagonally on both sides", () => {
    const forward = new Forward(Direction.Down);
    const board = createBoard();

    board.move("e7", "e5");
    board.move("d2", "d4");
    board.move("f2", "f4");

    const result = forward.getAvailableMoves({ col: "e", row: 4 }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([{ col: "e", row: 3 }]);
    expect(result).toContainEqual([{ col: "f", row: 3 }]);
    expect(result).toContainEqual([{ col: "d", row: 3 }]);
  });

  it("cannot jump over pieces", () => {
    const forward = new Forward(Direction.Up);
    const board = createBoard();

    board.move("e7", "e3");

    let result = forward.getAvailableMoves({ col: "e", row: 1 }, board);
    expect(result.flat()).toHaveLength(0);

    board.move("e3", "e4");
    result = forward.getAvailableMoves({ col: "e", row: 1 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(1);
    expect(result).toContainEqual([{ col: "e", row: 2 }]);
  });

  it("cannot jump over pieces", () => {
    const forward = new Forward(Direction.Down);
    const board = createBoard();

    board.move("e2", "e6");
    let result = forward.getAvailableMoves({ col: "e", row: 6 }, board);

    expect(result.flat()).toHaveLength(0);

    board.move("e6", "e5");
    result = forward.getAvailableMoves({ col: "e", row: 6 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(1);
    expect(result).toContainEqual([{ col: "e", row: 5 }]);
  });
});
