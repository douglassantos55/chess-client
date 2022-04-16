<script setup lang="ts">
import { computed } from "vue";
import type { Piece } from "@/types";
import spritesheet from "@/assets/pieces.svg";

const props = defineProps<{
  piece: Piece;
}>();

const clips = {
  K: 0,
  Q: 1,
  B: 2,
  N: 3,
  R: 4,
  p: 5.03,
};

const styles = computed(() => {
  const idx = clips[props.piece.notation];
  return {
    "background-position-x": `-${70 * idx}px`,
    "background-image": `url(${spritesheet})`,
  };
});
</script>

<template>
  <span :class="`piece ${piece.color}`" :style="styles">{{
    piece.notation
  }}</span>
</template>

<style scoped>
.piece {
  width: 74px;
  height: 74px;
  z-index: 1;
  cursor: grab;
  text-indent: -9999px;
  background-size: 426px;
}
.piece.white {
  background-position-y: 0;
}
.piece.black {
  background-position-y: -70px;
}
</style>
