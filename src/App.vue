<script setup lang="ts">
import { ref } from "vue";
import Server from "@/server";
import Board from "./components/Board.vue";
import Matchmaker from "./components/Matchmaker.vue";

const server = new Server(new WebSocket("ws://0.0.0.0:8080"));

const status = ref("");
const perspective = ref("");

server.on("start_game", (payload) => {
  gameId.value = payload.game_id;
  perspective.value = payload.color;
});

server.on("game_over", (payload) => {
  gameId.value = "";
  console.log(payload);
});
</script>

<template>
  <Board :server="server" :perspective="perspective" />

  <aside>
    <Matchmaker
      :server="server"
      :times="[
        { duration: '5m', increment: '0s', label: '5 min' },
        { duration: '10m', increment: '0s', label: '10 min' },
        { duration: '15m', increment: '0s', label: '15 min' },
      ]"
    />
  </aside>
</template>

<style>
body {
  margin: 0;
}
aside {
  flex-shrink: 0;
  min-height: 100vh;
  background: #2e2e2e;
  padding: 20px 40px 0;
  box-sizing: border-box;
  border-left: 2px solid #3c3c3c;
}
#app {
  display: flex;
  height: 100vh;
  background: #222;
  font-family: sans-serif;
}
</style>
