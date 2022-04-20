import { describe, it, expect } from "vitest";
import Server from "../../server";
import FakeSocket from "./FakeSocket";

describe("Server", () => {
  it("sends message to socket", () => {
    const socket = new FakeSocket();
    const server = new Server(socket);

    server.send("move_piece", { from: "a1", to: "a4" });
    expect(socket.sent).toContainEqual({
      type: "move_piece",
      payload: { from: "a1", to: "a4" },
    });
  });

  it("receives message from socket", async () => {
    expect.assertions(1);

    const socket = new FakeSocket();
    const server = new Server(socket);

    server.on("move_piece", (payload) =>
      expect(payload).toEqual({ from: "e2", to: "e4" })
    );

    await new Promise((resolve) => {
      const event = new MessageEvent("message", {
        data: { type: "move_piece", payload: { from: "e2", to: "e4" } },
      });

      socket.onmessage(event);
      setTimeout(resolve, 100);
    });
  });

  it("ignores events without listeners", () => {
    const socket = new FakeSocket();
    const data = { type: "move_piece", payload: { from: "e2", to: "e4" } };
    const event = new MessageEvent("message", { data });

    const receive = function () {
      socket.onmessage(event);
    };

    expect(receive).not.toThrow();
  });
});
