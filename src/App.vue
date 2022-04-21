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

  <Board :server="server" :perspective="perspective" />
</template>

<style>
body {
  margin: 0;
}
aside {
  width: 20%;
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
}
#app {
  display: flex;
  height: 100vh;
  background: #222;
  font-family: sans-serif;
}
</style>
