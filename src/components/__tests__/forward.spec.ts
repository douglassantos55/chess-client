import { expect, describe, it } from "vitest";
import Forward, { Direction } from "@/forward";
import { createBoard, piece } from "@/utils";
import { Color } from "@/types";

describe("Forward", () => {
  it("moves forward", () => {
    const forward = new Forward(Direction.Up, { col: "e", row: 1 });
    const result = forward.getAvailableMoves(
      { col: "e", row: 1 },
      createBoard()
    );

    expect(result).toEqual([
      { col: "e", row: 2 },
      { col: "e", row: 3 },
    ]);
  });

  it("moves backwards", () => {
    const forward = new Forward(Direction.Down, { col: "e", row: 6 });
    const result = forward.getAvailableMoves(
      { col: "e", row: 6 },
      createBoard()
    );

    expect(result).toEqual([
      { col: "e", row: 5 },
      { col: "e", row: 4 },
    ]);
  });

  it("moves 2 squares only on first move", () => {
    const forward = new Forward(Direction.Up, { col: "e", row: 1 });
    const result = forward.getAvailableMoves(
      { col: "e", row: 3 },
      createBoard()
    );

    expect(result).toEqual([{ col: "e", row: 4 }]);
  });

  it("captures diagonally right", () => {
    const forward = new Forward(Direction.Up, { col: "a", row: 1 });
    const board = createBoard();

    board[6]["b"] = null;
    board[2]["b"] = piece(
      "p",
      Color.Black,
      new Forward(Direction.Down, { col: "b", row: 6 })
    );

    const result = forward.getAvailableMoves({ col: "a", row: 1 }, board);

    expect(result).toHaveLength(3);
    expect(result).toContainEqual({ col: "a", row: 2 });
    expect(result).toContainEqual({ col: "a", row: 3 });
    expect(result).toContainEqual({ col: "b", row: 2 });
  });

  it("captures diagonally left", () => {
    const forward = new Forward(Direction.Up, { col: "h", row: 1 });
    const board = createBoard();

    board[6]["g"] = null;
    board[2]["g"] = piece(
      "p",
      Color.Black,
      new Forward(Direction.Down, { col: "g", row: 6 })
    );

    const result = forward.getAvailableMoves({ col: "h", row: 1 }, board);

    expect(result).toHaveLength(3);
    expect(result).toContainEqual({ col: "h", row: 2 });
    expect(result).toContainEqual({ col: "h", row: 3 });
    expect(result).toContainEqual({ col: "g", row: 2 });
  });

  it("captures diagonally on both sides", () => {
    const forward = new Forward(Direction.Up, { col: "e", row: 1 });
    const board = createBoard();

    board[6]["c"] = null;
    board[4]["c"] = piece(
      "p",
      Color.Black,
      new Forward(Direction.Down, { col: "c", row: 4 })
    );

    board[6]["a"] = null;
    board[4]["a"] = piece(
      "p",
      Color.Black,
      new Forward(Direction.Down, { col: "a", row: 4 })
    );

    const result = forward.getAvailableMoves({ col: "b", row: 3 }, board);

    expect(result).toHaveLength(3);
    expect(result).toContainEqual({ col: "b", row: 4 });
    expect(result).toContainEqual({ col: "a", row: 4 });
    expect(result).toContainEqual({ col: "c", row: 4 });
  });

  it("captures diagonally on both sides", () => {
    const forward = new Forward(Direction.Down, { col: "e", row: 6 });
    const board = createBoard();

    board[6]["e"] = null;
    board[4]["e"] = piece("p", Color.Black, forward);

    board[1]["d"] = null;
    board[3]["d"] = piece(
      "p",
      Color.White,
      new Forward(Direction.Down, { col: "d", row: 1 })
    );

    board[1]["f"] = null;
    board[3]["f"] = piece(
      "p",
      Color.White,
      new Forward(Direction.Down, { col: "f", row: 1 })
    );

    const result = forward.getAvailableMoves({ col: "e", row: 4 }, board);

    expect(result).toHaveLength(3);
    expect(result).toContainEqual({ col: "e", row: 3 });
    expect(result).toContainEqual({ col: "f", row: 3 });
    expect(result).toContainEqual({ col: "d", row: 3 });
  });
});
