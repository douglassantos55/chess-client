import { vi, describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FakeSocket from "./FakeSocket";
import Server from "@/server";
import MatchAccept from "@/components/MatchAccept.vue";
import { nextTick } from "vue";

describe("MatchAccept", () => {
  it("shows up when event is received", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const matchAccept = mount(MatchAccept, { props: { server } });

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({ type: "confirm_match", payload: "uuid" }),
      })
    );

    await nextTick();
    expect(matchAccept.isVisible()).toBe(true);
  });

  it("confirms match", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);

    const spy = vi.spyOn(server, "send");
    const matchAccept = mount(MatchAccept, { props: { server } });

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({ type: "confirm_match", payload: "uuid" }),
      })
    );

    await nextTick();
    await matchAccept.get('[data-test="confirm"]').trigger("click");

    expect(spy).toHaveBeenCalledWith("match_confirmed", "uuid");
    expect(matchAccept.isVisible()).toBe(true);
  });

  it("refuses match", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);

    const spy = vi.spyOn(server, "send");
    const matchAccept = mount(MatchAccept, { props: { server } });

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({ type: "confirm_match", payload: "uuid" }),
      })
    );

    await nextTick();
    await matchAccept.get('[data-test="decline"]').trigger("click");

    expect(spy).toHaveBeenCalledWith("match_declined", "uuid");
  });

  it("disables buttons on wait for other players", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const matchAccept = mount(MatchAccept, { props: { server } });

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({ type: "wait_other_players" }),
      })
    );

    await nextTick();

    expect(
      matchAccept.get('[data-test="confirm"]').attributes()
    ).toHaveProperty("disabled");
    expect(
      matchAccept.get('[data-test="decline"]').attributes()
    ).toHaveProperty("disabled");
  });

  it("resets state when match is canceled", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const matchAccept = mount(MatchAccept, { props: { server } });

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({ type: "match_canceled", payload: "uuid" }),
      })
    );

    await nextTick();
    expect(matchAccept.vm.waiting).toBe(false);
    expect(matchAccept.isVisible()).toBe(false);
  });

  it("resets state when game starts", async () => {
    const socket = new FakeSocket();
    const server = new Server(socket);
    const matchAccept = mount(MatchAccept, { props: { server } });

    socket.onmessage(
      new MessageEvent("message", {
        data: JSON.stringify({ type: "start_game" }),
      })
    );

    await nextTick();

    expect(matchAccept.vm.waiting).toBe(false);
    expect(matchAccept.isVisible()).toBe(false);
  });
});
