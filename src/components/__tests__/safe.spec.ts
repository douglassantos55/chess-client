import { describe, it, expect } from "vitest";
import Safe from "@/safe";
import Straight from "@/straight";
import Diagonal from "@/diagonal";
import Combined from "@/combined";
import { createBoard, piece } from "@/utils";
import { Color } from "@/types";

describe("Safe", () => {
  it("does not loop forever", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board[3]["e"] = board[1]["e"];
    board[1]["e"] = null;

    let result = safe.getAvailableMoves({ col: "e", row: 0 }, board);
    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(1);

    board[4]["e"] = board[6]["e"];
    board[6]["e"] = null;

    result = safe.getAvailableMoves({ col: "e", row: 0 }, board);
    expect(result).toHaveLength(1);
    expect(result.flat()).toHaveLength(1);
  });

  it("removes available moves which are threated by enemy pieces", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board[0]["e"] = null;
    board[2]["e"] = piece("K", Color.White, safe);

    board[5]["c"] = piece("B", Color.Black, new Diagonal());
    board[5]["f"] = piece("B", Color.Black, new Diagonal());

    const result = safe.getAvailableMoves({ col: "e", row: 2 }, board);

    expect(result).toContainEqual([{ col: "f", row: 3 }]);
    expect(result).toContainEqual([{ col: "d", row: 2 }]);
  });

  it("removes available moves which are threated by enemy pieces", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board[0]["e"] = null;
    board[2]["e"] = piece("K", Color.White, safe);

    board[5]["c"] = piece("B", Color.Black, new Diagonal());
    board[5]["f"] = piece("B", Color.Black, new Diagonal());
    board[4]["f"] = piece(
      "Q",
      Color.Black,
      new Combined(new Straight(), new Diagonal())
    );

    const result = safe.getAvailableMoves({ col: "e", row: 2 }, board);
    expect(result).toHaveLength(0);
    expect(result.flat()).toHaveLength(0);
  });

  it("ignores same color pieces", () => {
    const safe = new Safe(new Combined(new Diagonal(1), new Straight(1)));
    const board = createBoard();

    board[0]["e"] = null;
    board[2]["e"] = piece("K", Color.White, safe);

    board[5]["c"] = piece("B", Color.White, new Diagonal());
    board[5]["f"] = piece("B", Color.White, new Diagonal());
    board[4]["f"] = piece(
      "Q",
      Color.White,
      new Combined(new Straight(), new Diagonal())
    );

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

    board[0]["e"] = null;
    board[4]["e"] = piece("K", Color.White, safe);

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

    board[3]["e"] = board[1]["e"];
    board[1]["e"] = null;

    board[4]["e"] = board[6]["e"];
    board[6]["e"] = null;

    board[2]["g"] = board[1]["g"];
    board[1]["g"] = null;

    board[2]["f"] = board[0]["e"];
    board[0]["e"] = null;

    board[4]["g"] = board[7]["e"];
    board[7]["e"] = null;

    board[2]["d"] = board[1]["d"];
    board[1]["d"] = null;

    const result = safe.getAvailableMoves({ col: "g", row: 4 }, board);

    expect(result).toHaveLength(3);
    expect(result.flat()).toHaveLength(3);

    expect(result).toContainEqual([{ col: "h", row: 4 }]);
    expect(result).toContainEqual([{ col: "g", row: 5 }]);
    expect(result).toContainEqual([{ col: "f", row: 5 }]);
  });
});
