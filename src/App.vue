<script setup lang="ts">
import Server from "@/server";
import Game from "./components/Game.vue";
import Board from "./components/Board.vue";
import Matchmaker from "./components/Matchmaker.vue";
import MatchAccept from "./components/MatchAccept.vue";

const server = new Server(new WebSocket("ws://0.0.0.0:8080"));
</script>

<template>
  <MatchAccept :server="server" />

  <Game :server="server" v-slot="{ gameId, perspective }">
    <Board :server="server" :game-id="gameId" :perspective="perspective" />
  </Game>

  <Matchmaker
    :server="server"
    :times="[
      { duration: '5m', increment: '0s', label: '5 min' },
      { duration: '10m', increment: '0s', label: '10 min' },
      { duration: '15m', increment: '0s', label: '15 min' },
    ]"
  />
</template>

<style>
body {
  margin: 0;
  height: 100%;
  min-height: 100vh;
}
#app {
  height: 100%;
  display: flex;
  background: #222;
  min-height: 100vh;
  font-family: sans-serif;
}
</style>
