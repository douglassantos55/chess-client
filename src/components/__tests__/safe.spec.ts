import { describe, it, expect } from "vitest";
import Safe from "@/safe";
import Straight from "@/straight";
import Diagonal from "@/diagonal";
import Combined from "@/combined";
import { createBoard } from "@/utils";

describe("Safe", () => {
  it("does not loop forever", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board.move("e2", "e4");
    let result = safe.getAvailableMoves({ col: "e", row: 0 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(1);

    board.move("e7", "e5");
    result = safe.getAvailableMoves({ col: "e", row: 0 }, board);

    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(1);
  });

  it("removes available moves which are threated by enemy pieces", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board.move("e1", "e3");
    board.move("c8", "c6");
    board.move("f8", "f6");

    const result = safe.getAvailableMoves({ col: "e", row: 2 }, board);

    expect(result).toContainEqual([{ col: "f", row: 3 }]);
    expect(result).toContainEqual([{ col: "d", row: 2 }]);
  });

  it("removes available moves which are threated by enemy pieces", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board.move("e1", "e3");
    board.move("c8", "c6");
    board.move("f8", "f6");
    board.move("d8", "f5");

    const result = safe.getAvailableMoves({ col: "e", row: 2 }, board);
    expect(result).toHaveLength(0);
    expect(result.flat()).toHaveLength(0);
  });

  it("ignores same color pieces", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board.move("e1", "e3");
    board.move("c1", "c6");
    board.move("f1", "f6");
    board.move("d1", "f5");

    const result = safe.getAvailableMoves({ col: "e", row: 2 }, board);

    expect(result).toHaveLength(5);
    expect(result.flat()).toHaveLength(5);

    expect(result).toContainEqual([{ col: "d", row: 2 }]);
    expect(result).toContainEqual([{ col: "f", row: 2 }]);
    expect(result).toContainEqual([{ col: "d", row: 3 }]);
    expect(result).toContainEqual([{ col: "e", row: 3 }]);
    expect(result).toContainEqual([{ col: "f", row: 3 }]);
  });

  it("considers pawns", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board.move("e1", "e5");

    const result = safe.getAvailableMoves({ col: "e", row: 4 }, board);

    expect(result).toHaveLength(5);
    expect(result.flat()).toHaveLength(5);

    expect(result).toContainEqual([{ col: "d", row: 4 }]);
    expect(result).toContainEqual([{ col: "f", row: 4 }]);
    expect(result).toContainEqual([{ col: "d", row: 3 }]);
    expect(result).toContainEqual([{ col: "e", row: 3 }]);
    expect(result).toContainEqual([{ col: "f", row: 3 }]);
  });

  it("cannot move to threatened squares behind itself", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board.move("e2", "e4");
    board.move("e7", "e5");
    board.move("g2", "g3");
    board.move("e1", "f3");
    board.move("e8", "g5");
    board.move("d2", "d3");

    const result = safe.getAvailableMoves({ col: "g", row: 4 }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([{ col: "h", row: 4 }]);
    expect(result).toContainEqual([{ col: "g", row: 5 }]);
    expect(result).toContainEqual([{ col: "f", row: 5 }]);
  });

  it("cannot capture defended pieces diagonally", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board.move("e8", "e5");
    board.move("a1", "d4");
    board.move("c1", "c3");

    const result = safe.getAvailableMoves({ row: 4, col: "e" }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([{ col: "f", row: 4 }]);
    expect(result).toContainEqual([{ col: "f", row: 5 }]);
    expect(result).toContainEqual([{ col: "e", row: 5 }]);
  });

  it("cannot capture defended pieces horizontally", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board.move("e8", "e5");
    board.move("a1", "d4");
    board.move("h1", "h4");

    const result = safe.getAvailableMoves({ row: 4, col: "e" }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([{ col: "f", row: 4 }]);
    expect(result).toContainEqual([{ col: "f", row: 5 }]);
    expect(result).toContainEqual([{ col: "e", row: 5 }]);
  });

  it("cannot capture defended pieces vertically", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board.move("e8", "e5");
    board.move("a1", "d4");
    board.move("h1", "d3");

    const result = safe.getAvailableMoves({ row: 4, col: "e" }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([{ col: "f", row: 4 }]);
    expect(result).toContainEqual([{ col: "f", row: 5 }]);
    expect(result).toContainEqual([{ col: "e", row: 5 }]);
  });

  it("cannot capture defended pieces by knight", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board.move("e8", "e5");
    board.move("a1", "d4");
    board.move("b1", "b5");

    const result = safe.getAvailableMoves({ row: 4, col: "e" }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([{ col: "f", row: 4 }]);
    expect(result).toContainEqual([{ col: "f", row: 5 }]);
    expect(result).toContainEqual([{ col: "e", row: 5 }]);
  });

  it("cannot capture defended pieces by pawn", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board.move("e8", "e5");
    board.move("a1", "d4");
    board.move("e2", "e3");

    const result = safe.getAvailableMoves({ row: 4, col: "e" }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([{ col: "f", row: 4 }]);
    expect(result).toContainEqual([{ col: "f", row: 5 }]);
    expect(result).toContainEqual([{ col: "e", row: 5 }]);
  });

  it("cannot capture defended pieces by pawn", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board.move("e8", "e5");
    board.move("a1", "d4");
    board.move("c2", "c3");

    const result = safe.getAvailableMoves({ row: 4, col: "e" }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([{ col: "f", row: 4 }]);
    expect(result).toContainEqual([{ col: "f", row: 5 }]);
    expect(result).toContainEqual([{ col: "e", row: 5 }]);
  });
});
