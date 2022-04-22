import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Game from "@/components/Game.vue";
import FakeSocket from "./FakeSocket";
import Server from "@/server";
import { nextTick } from "vue";

describe("Game", () => {
  it("starts", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const game = mount(Game, { props: { server } });

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({
          type: "start_game",
          payload: {
            color: "black",
            game_id: "uuid",
          },
        }),
      })
    );

    await nextTick();
    expect(game.vm.perspective).toBe("black");
    expect(game.vm.gameId).toBe("uuid");
  });

  it("ends", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const game = mount(Game, { props: { server } });

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({
          type: "game_over",
          payload: {
            reason: "Timeout",
            game_id: "uuid",
            winner: true,
          },
        }),
      })
    );

    await nextTick();
    expect(game.vm.gameId).toBe(null);
  });
});
