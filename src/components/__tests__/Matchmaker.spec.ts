import { vi, expect, it, describe } from "vitest";
import { mount } from "@vue/test-utils";
import Matchmaker from "@/components/Matchmaker.vue";
import FakeSocket from "./FakeSocket";
import Server from "@/server";
import { nextTick } from "vue";

describe("Matchmaker", () => {
  it("selects times", async () => {
    const matchmaker = mount(Matchmaker, {
      props: {
        server: new Server(new FakeSocket()),
        times: [
          { duration: "5m", increment: "0s", label: "5 min" },
          { duration: "10m", increment: "0s", label: "10 min" },
        ],
      },
    });

    await matchmaker.get('[data-test="5m"]').trigger("click");
    expect(matchmaker.get('[data-test="5m"]').classes()).toContain("selected");
    expect(matchmaker.get('[data-test="10m"]').classes()).not.toContain(
      "selected"
    );

    await matchmaker.get('[data-test="10m"]').trigger("click");
    expect(matchmaker.get('[data-test="5m"]').classes()).not.toContain(
      "selected"
    );
    expect(matchmaker.get('[data-test="10m"]').classes()).toContain("selected");
  });

  it("does not send to server if no time selected", async () => {
    const server = new Server(new FakeSocket());
    const spy = vi.spyOn(server, "send");

    const matchmaker = mount(Matchmaker, {
      props: {
        server,
        times: [
          { duration: "5m", increment: "0s", label: "5 min" },
          { duration: "10m", increment: "0s", label: "10 min" },
        ],
      },
    });

    await matchmaker.get('[data-test="play"]').trigger("click");
    expect(spy).not.toHaveBeenCalled();
  });

  it("sends queue up to server", async () => {
    const server = new Server(new FakeSocket());
    const spy = vi.spyOn(server, "send");

    const matchmaker = mount(Matchmaker, {
      props: {
        server,
        times: [
          { duration: "5m", increment: "0s", label: "5 min" },
          { duration: "10m", increment: "0s", label: "10 min" },
        ],
      },
    });

    await matchmaker.get('[data-test="10m"]').trigger("click");
    await matchmaker.get('[data-test="play"]').trigger("click");

    expect(spy).toHaveBeenCalledWith("queue_up", {
      duration: "10m",
      increment: "0s",
    });
  });

  it("receives wait for match", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const matchmaker = mount(Matchmaker, {
      props: {
        server,
        times: [
          { duration: "5m", increment: "0s", label: "5 min" },
          { duration: "10m", increment: "0s", label: "10 min" },
        ],
      },
    });

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({ type: "wait_for_match", payload: {} }),
      })
    );

    await matchmaker.get('[data-test="5m"]').trigger("click");
    await matchmaker.get('[data-test="play"]').trigger("click");

    await nextTick();

    expect(matchmaker.get('[data-test="5m"]').attributes()).toHaveProperty(
      "disabled"
    );
    expect(matchmaker.get('[data-test="10m"]').attributes()).toHaveProperty(
      "disabled"
    );
    expect(matchmaker.get('[data-test="play"]').attributes()).toHaveProperty(
      "disabled"
    );
  });

  it("enables buttons after cancelling match", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const matchmaker = mount(Matchmaker, {
      props: {
        server,
        times: [
          { duration: "5m", increment: "0s", label: "5 min" },
          { duration: "10m", increment: "0s", label: "10 min" },
        ],
      },
    });

    matchmaker.vm.waiting = true;

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({ type: "match_canceled", payload: {} }),
      })
    );

    await nextTick();

    expect(matchmaker.get('[data-test="5m"]').attributes()).not.toHaveProperty(
      "disabled"
    );
    expect(matchmaker.get('[data-test="10m"]').attributes()).not.toHaveProperty(
      "disabled"
    );
    // there's still a time selected
    expect(matchmaker.get('[data-test="play"]').attributes()).toHaveProperty(
      "disabled"
    );
  });

  it("enables buttons when game starts", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const matchmaker = mount(Matchmaker, {
      props: {
        server,
        times: [
          { duration: "5m", increment: "0s", label: "5 min" },
          { duration: "10m", increment: "0s", label: "10 min" },
        ],
      },
    });

    matchmaker.vm.waiting = true;

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({ type: "start_game" }),
      })
    );

    await nextTick();
    expect(matchmaker.vm.waiting).toBe(false)
  });


  it("hides when game starts", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const matchmaker = mount(Matchmaker, {
      props: {
        server,
        times: [
          { duration: "5m", increment: "0s", label: "5 min" },
          { duration: "10m", increment: "0s", label: "10 min" },
        ],
      },
    });

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({ type: "start_game" }),
      })
    );

    await nextTick();
    expect(matchmaker.isVisible()).toBe(false);
  });

  it("shows when game ends", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const matchmaker = mount(Matchmaker, {
      props: {
        server,
        times: [
          { duration: "5m", increment: "0s", label: "5 min" },
          { duration: "10m", increment: "0s", label: "10 min" },
        ],
      },
    });

    // force it to hide
    matchmaker.vm.visible = false;

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({ type: "game_over" }),
      })
    );

    await nextTick();
    expect(matchmaker.isVisible()).toBe(true);
  });
});
