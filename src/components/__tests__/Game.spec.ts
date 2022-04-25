import { vi, describe, it, expect } from "vitest";
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

  it("sets timers duration and increment when game starts", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const game = mount(Game, { props: { server } });

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({
          type: "start_game",
          payload: {
            color: "white",
            game_id: "uuid",
            time_control: {
              duration: "3m",
              increment: "0s",
            },
          },
        }),
      })
    );

    await nextTick();

    const timer = game.get(".timer").getCurrentComponent();
    const opponentTimer = game.get(".opponent-timer").getCurrentComponent();

    expect(timer?.props.duration).toBe("3m");
    expect(timer?.props.increment).toBe("0s");

    expect(opponentTimer?.props.duration).toBe("3m");
    expect(opponentTimer?.props.increment).toBe("0s");
  });

  it("starts player's timer when turn starts", async () => {
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
            time_control: {
              duration: "6s",
              increment: "0s",
            },
          },
        }),
      })
    );

    await nextTick();
    const spy = vi.spyOn(game.vm.timer, "start");

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({
          type: "start_turn",
          payload: {
            game_id: "uuid",
            from: "e2",
            to: "e4",
            time: 6000,
          },
        }),
      })
    );

    await nextTick();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("starts opponents's timer when turn ends", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const game = mount(Game, { props: { server } });

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({
          type: "start_game",
          payload: {
            color: "white",
            game_id: "uuid",
            time_control: {
              duration: "6s",
              increment: "0s",
            },
          },
        }),
      })
    );

    await nextTick();
    const spy = vi.spyOn(game.vm.opponentTimer, "start");

    server.send("move_piece", { from: "e2", to: "e4" });

    await nextTick();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("syncs timer when turn starts", async () => {
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
            time_control: {
              duration: "6s",
              increment: "0s",
            },
          },
        }),
      })
    );

    await nextTick();
    const spy = vi.spyOn(game.vm.timer, "start");

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({
          type: "start_turn",
          payload: {
            game_id: "uuid",
            from: "e2",
            to: "e4",
            time: 1000,
          },
        }),
      })
    );

    await nextTick();

    expect(spy).toHaveBeenCalledOnce();
    expect(game.get(".timer").html()).toContain("0:01");
  });

  it("stops timers when game is over", async () => {
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
            time_control: {
              duration: "6s",
              increment: "0s",
            },
          },
        }),
      })
    );

    await nextTick();

    const spy = vi.spyOn(game.vm.timer, "pause");
    const spyOpponent = vi.spyOn(game.vm.opponentTimer, "pause");

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

    expect(spy).toHaveBeenCalledOnce();
    expect(spyOpponent).toHaveBeenCalledOnce();
  });

  it("pauses timer when turn ends", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const game = mount(Game, { props: { server } });

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({
          type: "start_game",
          payload: {
            color: "white",
            game_id: "uuid",
            time_control: {
              duration: "6s",
              increment: "0s",
            },
          },
        }),
      })
    );

    await nextTick();
    const spy = vi.spyOn(game.vm.timer, "pause");

    server.send("move_piece", { from: "e2", to: "e4" });

    await nextTick();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("pauses opponent's timer when turn starts", async () => {
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
            time_control: {
              duration: "6s",
              increment: "0s",
            },
          },
        }),
      })
    );

    await nextTick();
    const spy = vi.spyOn(game.vm.opponentTimer, "pause");

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({
          type: "start_turn",
          payload: {
            game_id: "uuid",
            from: "e2",
            to: "e4",
            time: 1000,
          },
        }),
      })
    );

    await nextTick();
    expect(spy).toHaveBeenCalledOnce();
  });
});
