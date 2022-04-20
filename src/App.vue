<script setup lang="ts">
import Board from "./components/Board.vue";
import Server from "@/server";

const server = new Server(new WebSocket("ws://0.0.0.0:8080"));
</script>

<template>
  <Board :server="server" perspective="black" />
</template>

<style>
body {
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
}
</style>
