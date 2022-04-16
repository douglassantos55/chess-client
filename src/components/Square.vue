<script setup lang="ts">
import { computed } from "vue";
import type { Square, Piece as PieceType } from "@/types";
import Piece from "@/components/Piece.vue";

const props = defineProps<{
  col: string;
  row: number;
  piece?: PieceType;
  availableMoves?: Square[];
}>();

type SelectedEvent = {
  piece?: PieceType;
  square: Square;
};

const emit = defineEmits<{
  (e: "selected", evt: SelectedEvent): void;
}>();

const notation = computed(() => props.col + (props.row + 1));

const isAvailable = computed(() => {
  if (!props.availableMoves) {
    return false;
  }

  return !!props.availableMoves.find(
    (square: Square) => square.col == props.col && square.row == props.row
  );
});

function select() {
  const square = { col: props.col, row: props.row };
  emit("selected", { square, piece: props.piece });
}
</script>

<template>
  <div
    class="square"
    :data-square="col"
    :class="[notation, { available: isAvailable }]"
    @click.self="select"
  >
    <Piece :piece="piece" v-if="piece" @click.self="select" />
  </div>
</template>

<style scoped>
.square {
  width: 82px;
  height: 82px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
}
.available:before {
  content: "";
  width: 15px;
  height: 15px;
  display: block;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.15);
}
.available:not(:empty):before {
  content: "";
  width: 100%;
  height: 100%;
  display: block;
  background: none;
  position: absolute;
  border-radius: 100%;
  box-sizing: border-box;
  border: 10px solid rgba(0, 0, 0, 0.15);
}
</style>
