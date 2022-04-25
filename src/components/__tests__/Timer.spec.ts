import { expect, it, describe } from "vitest";
import { mount } from "@vue/test-utils";
import Timer from "../Timer.vue";
import { nextTick } from "vue";

function sleep(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

describe("Timer", () => {
  it("counts down", async () => {
    const timer = mount(Timer, {
      props: { duration: "5m", increment: "0s" },
    });

    timer.vm.start();
    await sleep(1000);

    timer.vm.pause();
    await nextTick();

    expect(timer.html()).toContain("4:59");
  });

  it("increments", async () => {
    const timer = mount(Timer, {
      props: { duration: "1m", increment: "1m" },
    });

    timer.vm.start();
    await sleep(1000);

    timer.vm.pause();
    await nextTick();

    expect(timer.html()).toContain("1:59");
  });

  it("parses durations", () => {
    const timer = mount(Timer, {
      props: { duration: "3m", increment: "1s" },
    });

    expect(timer.vm.parseDuration("1ms")).toEqual(1);
    expect(timer.vm.parseDuration("100ms")).toEqual(100);

    expect(timer.vm.parseDuration("1s")).toEqual(1000);
    expect(timer.vm.parseDuration("2s")).toEqual(2000);
    expect(timer.vm.parseDuration("10s")).toEqual(10000);
    expect(timer.vm.parseDuration("59s")).toEqual(59000);

    expect(timer.vm.parseDuration("1m")).toEqual(60000);
    expect(timer.vm.parseDuration("5m")).toEqual(300000);
    expect(timer.vm.parseDuration("10m")).toEqual(600000);
    expect(timer.vm.parseDuration("59m")).toEqual(3540000);
  });

  it("syncs", async () => {
    const timer = mount(Timer, {
      props: { duration: "5s", increment: "0s" },
    });

    timer.vm.start();
    await sleep(1000);

    timer.vm.pause();
    await nextTick();

    expect(timer.html()).toContain("0:04");

    timer.vm.sync(60000);
    await nextTick();

    expect(timer.html()).toContain("1:00");
  });

  it("pauses", async () => {
    const timer = mount(Timer, {
      props: { duration: "5s", increment: "2s" },
    });

    timer.vm.start();
    timer.vm.pause();

    await sleep(1000);
    await nextTick();

    expect(timer.html()).toContain("0:07");
  });
});
